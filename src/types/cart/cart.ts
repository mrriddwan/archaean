import type { User } from '../user/user'
import type { CartItems } from '../product/product'

export interface Cart {
  id: string
  created_at: Date | string
  updated_at: Date | string | null
  user_id: string
  user?: User
  cart_items?: CartItems[]
}

