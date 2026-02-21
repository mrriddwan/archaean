import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authService from '../../service/auth.service'
import { tokenManager } from '../../lib/axios'
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from '../../store/features/auth/types'

function setTokensFromLoginData(data: LoginResponse['data']) {
  tokenManager.setTokens(
    data.access_token,
    data.refresh_token,
    new Date(data.expires_at).getTime() / 1000,
    data.user_id
  )
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginPayload) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.success) {
        setTokensFromLoginData(response.data)
      }
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
    onSuccess: (response) => {
      if (response.success && response.data) {
        setTokensFromLoginData(response.data)
      }
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'user'], null)
      queryClient.removeQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useCurrentUser = () => {
  const hasToken = !!tokenManager.getAccessToken()

  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => authService.fetchCurrentUser(),
    enabled: hasToken,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}

