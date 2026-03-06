export type UserRole = "buyer" | "seller" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  expires_at: string | number;
  user_id: string;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  data: LoginResponseData;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
}

export interface GoogleLoginPayload {
  code: string;
}