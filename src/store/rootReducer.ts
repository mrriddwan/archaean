import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
 cart: cartReducer,
})

export default rootReducer