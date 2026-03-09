import { api } from "../lib/axios"
import type { Cart } from "../types/cart/cart"

const cartBaseUrl = '/carts';

const cartService = {
  async getCart(): Promise<Cart> {
    const response = await api.get<Cart>(`${cartBaseUrl}/user`)
    return response.data
  },
  async addProductToCart(productId: string): Promise<Cart> {
    const response = await api.post<Cart>(`${cartBaseUrl}/add-product`, { product_id: productId })
    return response.data
  },
  async removeProductFromCart(productId: string): Promise<Cart> {
    const response = await api.delete<Cart>(`${cartBaseUrl}/remove-product`, { data: { product_id: productId } })
    return response.data
  },
  async clearCart(): Promise<Cart> {
    const response = await api.delete<Cart>(`${cartBaseUrl}/clear`)
    return response.data
  },
}

export default cartService