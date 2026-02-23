import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authService from '../../service/auth.service'
import { tokenManager } from '../../lib/axios'
import { store } from '../../store'
import { setUser, clearAuth } from '../../store/features/auth/authSlice'
import type {
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
} from '../../store/features/auth/types'

function normalizeExpiresAt(expiresAt: string | number): number {
  if (typeof expiresAt === 'number') return expiresAt
  return Math.floor(new Date(expiresAt).getTime() / 1000)
}

function setTokensFromLoginData(data: LoginResponseData) {
  const accessToken = data.access_token ?? (data as unknown as { accessToken?: string }).accessToken
  const refreshToken = data.refresh_token ?? (data as unknown as { refreshToken?: string }).refreshToken
  const expiresAt = data.expires_at ?? (data as unknown as { expires_at?: string | number; expiresAt?: string | number }).expiresAt
  const userId = data.user_id ?? (data as unknown as { user_id?: string; userId?: string }).userId
  if (!accessToken || !refreshToken) return
  tokenManager.setTokens(
    accessToken,
    refreshToken,
    normalizeExpiresAt(expiresAt as string | number),
    userId ?? null
  )
}

function getTokenDataFromResponse(response: unknown): LoginResponseData | null {
  if (response && typeof response === 'object') {
    const r = response as Record<string, unknown>
    if (r.data && typeof r.data === 'object') {
      const data = r.data as Record<string, unknown>
      if ((data.access_token || data.accessToken) && (data.refresh_token || data.refreshToken))
        return data as unknown as LoginResponseData
    }
    if ((r.access_token || r.accessToken) && (r.refresh_token || r.refreshToken))
      return r as unknown as LoginResponseData
  }
  return null
}

async function setTokensAndFetchUser(response: unknown) {
  const data = getTokenDataFromResponse(response)
  if (data) {
    setTokensFromLoginData(data)
    const user = await authService.fetchCurrentUser()
    store.dispatch(setUser(user))
  }
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginPayload) => authService.login(credentials),
    onSuccess: async (response) => {
      await setTokensAndFetchUser(response)
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  })
}

export const useGetGoogleTokens = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (code: string) => authService.getGoogleTokens(code),
    onSuccess: async (response) => {
      await setTokensAndFetchUser(response)
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      store.dispatch(clearAuth())
      queryClient.setQueryData(['auth', 'user'], null)
      queryClient.removeQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useCurrentUser = () => {
  const hasToken = !!tokenManager.getAccessToken()

  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const user = await authService.fetchCurrentUser()
      store.dispatch(setUser(user))
      return user
    },
    enabled: hasToken,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}

