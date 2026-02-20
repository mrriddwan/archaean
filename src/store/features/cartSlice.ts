import { createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../../types/cart/cart";
import type { ProductOnCarts } from "../../types/product/product";

interface CartState extends Cart {
 products: ProductOnCarts[]
}

const initialState: CartState = {
 id: '',
 created_at: '',
 updated_at: '',
 user_id: '',
 user: undefined,
 products: [],
}

export const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  addProductToCart: (state, action) => {
   state?.products?.push(action.payload)
  },
 },
})

export const { addProductToCart } = cartSlice.actions

export default cartSlice.reducer