import type { User } from '../user/user'
import type { ProductOnOrders } from '../product/product'

export interface Order {
  id: string
  quantity: number
  total: number
  created_at: Date | string
  product_id: string
  updated_at: Date | string | null
  user_id: string
  products?: ProductOnOrders[]
  user?: User
  payments?: Payment[]
}

export interface Payment {
  id: string
  amount: number
  status: string
  order_id: string
  order?: Order
}
