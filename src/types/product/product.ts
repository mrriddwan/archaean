import type { Shop } from '../shop/shop'
import type { Cart } from '../cart/cart'
import type { Order } from '../order/order'

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  created_at: Date | string
  updated_at: Date | string | null
  shop_id: string
  shop?: Shop
  orders?: ProductOnOrders[]
  product_on_carts?: ProductOnCarts[]
}

export interface ProductOnCarts {
  product_id: string
  cart_id: string
  product?: Product
  cart?: Cart
}

export interface ProductOnOrders {
  product_id: string
  order_id: string
  product?: Product
  order?: Order
}
