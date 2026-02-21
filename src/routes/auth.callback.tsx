import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useGetGoogleTokens } from '../query/auth'
import { z } from 'zod'

const authCallbackSearchSchema = z.object({
  code: z.string().optional(),
  expires_in: z.union([z.string(), z.number()]).optional(),
})

export const Route = createFileRoute('/auth/callback')({
  validateSearch: authCallbackSearchSchema,
  component: AuthCallback,
})

function AuthCallback() {
  const navigate = useNavigate()
  const { code } = Route.useSearch()
  const getTokenMutation = useGetGoogleTokens()
  const hasExchanged = useRef(false)

  useEffect(() => {
    if (!code) {
      navigate({ to: '/marketplace' })
      return
    }
    if (hasExchanged.current) return
    hasExchanged.current = true

    const handleCallback = async () => {
      try {
        await getTokenMutation.mutateAsync(code)
        navigate({ to: '/marketplace' })
      } catch (error) {
        console.error('OAuth callback error:', error)
        navigate({ to: '/marketplace' })
      }
    }

    handleCallback()
  }, [code, navigate, getTokenMutation])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {getTokenMutation.isPending ? (
          <>
            <div className="mb-4 text-lg font-medium">Completing login...</div>
            <div className="text-sm text-muted-foreground">Please wait</div>
          </>
        ) : getTokenMutation.isError ? (
          <>
            <div className="mb-4 text-lg font-medium text-destructive">
              Login failed
            </div>
            <div className="text-sm text-muted-foreground">
              Redirecting to home...
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 text-lg font-medium">Login successful!</div>
            <div className="text-sm text-muted-foreground">
              Redirecting...
            </div>
          </>
        )}
      </div>
    </div>
  )
}

