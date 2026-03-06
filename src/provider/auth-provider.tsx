import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useCurrentUser } from '../query/auth'
import { useGetCart } from '../query/cart'
import { store } from '../store'
import { clearAuth } from '../store/features/auth/authSlice'
import { setCart } from '../store/features/cart/cartSlice'

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()

  const { mutateAsync: getCart } = useGetCart()

  useEffect(() => {
    const fetchCart = async () => {
      const response = await getCart()
      store.dispatch(setCart(response))
    }
    fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useCurrentUser()

  useEffect(() => {
    const handleAuthExpired = () => {
      store.dispatch(clearAuth())
      queryClient.setQueryData(['auth', 'user'], null)
      queryClient.removeQueries({ queryKey: ['auth', 'user'] })
    }
    window.addEventListener('marketplace:auth:expired', handleAuthExpired)
    return () => window.removeEventListener('marketplace:auth:expired', handleAuthExpired)
  }, [queryClient])

  return <>{children}</>
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthBootstrap>{children}</AuthBootstrap>
}