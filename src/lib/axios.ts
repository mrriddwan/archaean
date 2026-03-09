
import axios, {
 AxiosError,
 type AxiosInstance,
 type AxiosRequestConfig,
 type AxiosResponse,
 type InternalAxiosRequestConfig,
} from "axios";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ApiError {
 message: string;
 code: string;
 statusCode: number;
 details?: Record<string, unknown>;
 requestId?: string;
}

export interface ApiResponse<T = unknown> {
 data: T;
 meta?: {
   page?: number;
   perPage?: number;
   total?: number;
   totalPages?: number;
 };
 requestId?: string;
}

export interface RefreshTokenResponse {
 accessToken: string;
 refreshToken: string;
 expiresIn: number;
}

// ─────────────────────────────────────────────
// Token Management
// ─────────────────────────────────────────────

const TOKEN_KEY = "marketplace_access_token";
const REFRESH_TOKEN_KEY = "marketplace_refresh_token";
const EXPIRES_IN_KEY = "marketplace_expires_in";
const USER_ID_KEY = "marketplace_user_id";

export const tokenManager = {
 getAccessToken: (): string | null => localStorage.getItem(TOKEN_KEY),
 getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),
 getExpiresIn: (): number | null => localStorage.getItem(EXPIRES_IN_KEY) ? parseInt(localStorage.getItem(EXPIRES_IN_KEY)!) : null,
 getUserId: (): string | null => localStorage.getItem(USER_ID_KEY),

 setTokens: (accessToken: string, refreshToken: string, expiresIn: number, userId?: string | null): void => {
   localStorage.setItem(TOKEN_KEY, accessToken);
   localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
   localStorage.setItem(EXPIRES_IN_KEY, expiresIn.toString());
   if (userId) {
     localStorage.setItem(USER_ID_KEY, userId);
   }
 },

 clearTokens: (): void => {
   localStorage.removeItem(TOKEN_KEY);
   localStorage.removeItem(REFRESH_TOKEN_KEY);
 },
};

// ─────────────────────────────────────────────
// Refresh Token Queue
// Prevents multiple simultaneous refresh requests
// ─────────────────────────────────────────────

type QueueItem = {
 resolve: (value: string) => void;
 reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null = null): void {
 failedQueue.forEach(({ resolve, reject }) => {
   if (error) {
     reject(error);
   } else {
     resolve(token!);
   }
 });
 failedQueue = [];
}

// ─────────────────────────────────────────────
// Axios Instance
// ─────────────────────────────────────────────

export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";
const TIMEOUT = 15_000; // 15s

export const apiClient: AxiosInstance = axios.create({
 baseURL: BASE_URL,
 timeout: TIMEOUT,
 headers: {
   "Content-Type": "application/json",
   Accept: "application/json",
 },
 withCredentials: true, // for httpOnly cookie support if used alongside Bearer tokens
});

// ─────────────────────────────────────────────
// Request Interceptor
// ─────────────────────────────────────────────

apiClient.interceptors.request.use(
 (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
   const token = tokenManager.getAccessToken();

   if (token && config.headers) {
     config.headers.Authorization = `Bearer ${token}`;
   }

   // Attach a unique request ID for traceability
   const requestId = crypto.randomUUID();
   config.headers["X-Request-ID"] = requestId;

   // Marketplace-specific headers
   config.headers["X-Client"] = "marketplace-web";
   config.headers["X-Client-Version"] = import.meta.env.VITE_APP_VERSION ?? "1.0.0";

   return config;
 },
 (error: AxiosError) => Promise.reject(error)
);

// ─────────────────────────────────────────────
// Response Interceptor
// ─────────────────────────────────────────────

apiClient.interceptors.response.use(
 (response: AxiosResponse): AxiosResponse => response,
 async (error: AxiosError<ApiError>) => {
   const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

   // ── 401: Attempt token refresh ──────────────
   if (
     error.response?.status === 401 &&
     !originalRequest._retry &&
     tokenManager.getRefreshToken()
   ) {
     if (isRefreshing) {
       // Queue this request until refresh completes
       return new Promise<string>((resolve, reject) => {
         failedQueue.push({ resolve, reject });
       })
         .then((newToken) => {
           if (originalRequest.headers) {
             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
           }
           return apiClient(originalRequest);
         })
         .catch((err) => Promise.reject(err));
     }

     originalRequest._retry = true;
     isRefreshing = true;

     try {
       const refreshToken = tokenManager.getRefreshToken()!;

       const { data } = await axios.post<RefreshTokenResponse>(
         `${BASE_URL}/auth/refresh`,
         { refresh_token: refreshToken },
         { headers: { "Content-Type": "application/json" } }
       );

       tokenManager.setTokens(data.accessToken, data.refreshToken, data.expiresIn);
       processQueue(null, data.accessToken);

       if (originalRequest.headers) {
         originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
       }

       return apiClient(originalRequest);
     } catch (refreshError) {
       processQueue(refreshError, null);
       tokenManager.clearTokens();

       // Redirect to login via TanStack Router navigation event
       window.dispatchEvent(new CustomEvent("marketplace:auth:expired"));

       return Promise.reject(refreshError);
     } finally {
       isRefreshing = false;
     }
   }

   // ── 403: Forbidden ──────────────────────────
   if (error.response?.status === 403) {
     window.dispatchEvent(
       new CustomEvent("marketplace:auth:forbidden", {
         detail: { path: window.location.pathname },
       })
     );
   }

   // ── 429: Rate limit ─────────────────────────
   if (error.response?.status === 429) {
     const retryAfter = error.response.headers["retry-after"];
     console.warn(`[Marketplace API] Rate limited. Retry after: ${retryAfter}s`);
   }

   // ── 503: Service unavailable ────────────────
   if (error.response?.status === 503) {
     window.dispatchEvent(new CustomEvent("marketplace:api:maintenance"));
   }

   // ── Normalize error ─────────────────────────
   const normalizedError: ApiError = {
     message:
       error.response?.data?.message ??
       error.message ??
       "An unexpected error occurred.",
     code: error.response?.data?.code ?? error.code ?? "UNKNOWN_ERROR",
     statusCode: error.response?.status ?? 0,
     details: error.response?.data?.details,
     requestId: error.response?.headers?.["x-request-id"],
   };

   return Promise.reject(normalizedError);
 }
);

// ─────────────────────────────────────────────
// Typed Convenience Methods
// ─────────────────────────────────────────────

const headers = (config?: AxiosRequestConfig, isAuth: boolean = true) => {
  return {
    ...config?.headers,
    Authorization: isAuth ? `Bearer ${tokenManager.getAccessToken()}` : undefined,
  }
}

export const api = {
 get: <T>(url: string, config?: AxiosRequestConfig, isAuth: boolean = true): Promise<ApiResponse<T>> =>
   apiClient.get<ApiResponse<T>>(url, {
     ...config,
     headers: headers(config, isAuth),
   }).then((r) => r.data),

 post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig, isAuth: boolean = true): Promise<ApiResponse<T>> =>
   apiClient.post<ApiResponse<T>>(url, data, {
     ...config,
     headers: headers(config, isAuth),
   }).then((r) => r.data),

 put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig, isAuth: boolean = true): Promise<ApiResponse<T>> =>
   apiClient.put<ApiResponse<T>>(url, data, {
     ...config,
     headers: headers(config, isAuth),
   }).then((r) => r.data),

 patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig, isAuth: boolean = true): Promise<ApiResponse<T>> =>
   apiClient.patch<ApiResponse<T>>(url, data, {
     ...config,
     headers: headers(config, isAuth),
   }).then((r) => r.data),

 delete: <T>(url: string, config?: AxiosRequestConfig, isAuth: boolean = true): Promise<ApiResponse<T>> =>
   apiClient.delete<ApiResponse<T>>(url, {
     ...config,
     headers: headers(config, isAuth),
   }).then((r) => r.data),

 /** Multipart upload — e.g. product images, seller documents */
 upload: <T>(url: string, formData: FormData, config?: AxiosRequestConfig, isAuth: boolean = true): Promise<ApiResponse<T>> =>
   apiClient
     .post<ApiResponse<T>>(url, formData, {
       ...config,
       headers: headers(config, isAuth),
     })
     .then((r) => r.data),
};

// ─────────────────────────────────────────────
// Marketplace Domain Helpers
// ─────────────────────────────────────────────

/** Attach marketplace-specific seller context to any request */
export function withSellerContext(
 shopId: string,
 config?: AxiosRequestConfig
): AxiosRequestConfig {
 return {
   ...config,
   headers: {
     ...config?.headers,
     "X-Shop-ID": shopId,
   },
 };
}

/** Build paginated query params consistently across list endpoints */
export function paginationParams(
 page: number,
 perPage = 20,
 extra?: Record<string, unknown>
): AxiosRequestConfig {
 return {
   params: { page, per_page: perPage, ...extra },
 };
}

export default apiClient;