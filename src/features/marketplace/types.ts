export type Product = {
 id: string
 name: string
 description: string | null
 price: number
 createdAt: string
 updatedAt: string | null
 shop: {
   id: string
   name: string
 }
}
