import cartService from "../../service/cart.service"
import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import type { Cart } from "../../types/cart/cart"

export const useGetCart = (): UseMutationResult<Cart, Error, void> => {
  return useMutation({
    mutationFn: cartService.getCart,
  })
}

export const useAddProductToCart = (): UseMutationResult<Cart, Error, string> => {
  return useMutation({
    mutationFn: cartService.addProductToCart,
  })
}
  
export const useRemoveProductFromCart = (): UseMutationResult<Cart, Error, string> => {
  return useMutation({
    mutationFn: cartService.removeProductFromCart,
  })
}

export const useClearCart = (): UseMutationResult<Cart, Error, void> => {
  return useMutation({
    mutationFn: cartService.clearCart,
  })
}