import { BASE_URL } from "../lib/axios"
import type { Product } from "../types/product/product"


const marketplaceService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    
    return response.json()
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    
    return response.json()
  },
}

export default marketplaceService