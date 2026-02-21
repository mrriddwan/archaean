import { api } from '../lib/axios'
import { tokenManager } from '../lib/axios'
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from '../store/features/auth/types'

const noCredentials = { withCredentials: false } as const

const authService = {

  async login(credentials: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials, noCredentials)
    return response.data
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', payload, noCredentials)
    return response.data
  },

  async getGoogleTokens(code: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/google/tokens', { code }, noCredentials)
    return response.data
  },

  async fetchCurrentUser(): Promise<User> {
    const token = tokenManager.getAccessToken()
    if (!token) {
      throw new Error('No access token available')
    }

    try {
      const userId = tokenManager.getUserId()
      
      const response = await api.get<User>(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw new Error('Failed to decode token or fetch user')
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } finally {
      tokenManager.clearTokens()
    }
  },
}

export default authService

