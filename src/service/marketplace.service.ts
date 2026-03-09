import { BASE_URL, api } from "../lib/axios"
import type { Product } from "../types/product/product"

const marketplaceService = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>(`${BASE_URL}/products`, undefined, false)
    return response.data
  },

  async getProductById(id: string): Promise<Product> {
    const response = await api.get<Product>(`${BASE_URL}/products/${id}`, undefined, false)
    return response.data
  },
}

export default marketplaceService