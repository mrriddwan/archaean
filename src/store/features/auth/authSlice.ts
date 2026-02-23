import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth(state) {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setUser, clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;