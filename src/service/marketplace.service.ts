import { BASE_URL } from "../lib/axios"
import type { Product } from "../features/marketplace/types"


const marketplaceService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add authentication token when auth is implemented
        // 'Authorization': `Bearer ${token}`
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