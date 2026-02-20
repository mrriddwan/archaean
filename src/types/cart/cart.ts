import type { User } from '../user/user'
import type { ProductOnCarts } from '../product/product'

export interface Cart {
  id: string
  created_at: Date | string
  updated_at: Date | string | null
  user_id: string
  user?: User
  products?: ProductOnCarts[]
}

