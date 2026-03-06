import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "../../../types/cart/cart";
import type { CartItems } from "../../../types/product/product";

interface CartState extends Cart {
 cart_items: CartItems[]
}

const initialState: CartState = {
 id: '',
 created_at: '',
 updated_at: '',
 user_id: '',
 user: undefined,
 cart_items: [],
}

export const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  setCart: (state, action: PayloadAction<Cart>) => {
   state.id = action.payload.id
   state.created_at = action.payload.created_at
   state.updated_at = action.payload.updated_at
   state.user_id = action.payload.user_id
   state.user = action.payload.user
   state.cart_items = action.payload.cart_items ?? []
  },
 },
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer