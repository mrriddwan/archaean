import type { User } from '../user/user'
import type { Product } from '../product/product'

export interface Shop {
  id: string
  name: string
  description: string | null
  created_at: Date | string
  updated_at: Date | string | null
  owner_id: string
  owner?: User
  products?: Product[]
}

