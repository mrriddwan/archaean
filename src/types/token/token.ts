import type { User } from '../user/user'
import type { Role } from '../role/role'

export interface Token {
  id: string
  token: string
  type: string
  permissions: string[]
  user_id: string
  role_id: string
  expires_at: Date | string
  created_at: Date | string
  updated_at: Date | string | null
  role?: Role
  user?: User
}

