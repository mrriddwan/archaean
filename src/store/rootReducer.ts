import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/auth/authSlice";

const rootReducer = combineReducers({
 cart: cartReducer,
 user: userReducer,
})

export default rootReducer