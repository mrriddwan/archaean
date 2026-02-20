import type { Token } from '../token/token'
import type { UserOnRoles } from '../user/user'

export interface Role {
  id: string
  name: string
  code: string
  created_at: Date | string
  updated_at: Date | string | null
  tokens?: Token[]
  user_on_roles?: UserOnRoles[]
}

export interface Permission {
  id: string
  name: string
  code: string
  created_at: Date | string
  updated_at: Date | string | null
}
