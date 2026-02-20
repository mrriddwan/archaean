import type { Token } from '../token/token'
import type { Order } from '../order/order'
import type { Role } from '../role/role'
import type { Shop } from '../shop/shop'
import type { Cart } from '../cart/cart'

export interface User {
  id: string
  email: string
  name: string | null
  password: string | null
  created_at: Date | string
  updated_at: Date | string | null
}

export interface UserWithRelations extends User {
  access_tokens?: Token[]
  orders?: Order[]
  user_on_roles?: UserOnRoles[]
  oauth_accounts?: OAuthAccount[]
  shop?: Shop
  cart?: Cart
}

export interface OAuthAccount {
  id: string
  provider: string
  user_provider_id: string
  user_id: string
  created_at: Date | string
  updated_at: Date | string | null
  user?: User
}

export interface UserOnRoles {
  user_id: string
  role_id: string
  user?: User
  role?: Role
}
