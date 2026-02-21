import { useState } from 'react'
import { useRegister } from '../../../query/auth'
import { Button } from '../../../components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export const registerFormSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
})

export const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const { register, handleSubmit } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema as any),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const registerMutation = useRegister()

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      await registerMutation.mutateAsync(data)
      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      const errorMessage = (err as { message?: string })?.message || 'Registration failed'
      setError(errorMessage)
    }
  }

  if (success) {
    return (
      <div className="space-y-4">
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-800 dark:text-green-200">
          Registration successful! Please login to continue.
        </div>
        {onSwitchToLogin && (
          <Button onClick={onSwitchToLogin} className="w-full" variant="outline">
            Go to Login
          </Button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="register-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          {...register('email')}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="register-password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          {...register('password')}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="register-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="register-name"
          type="text"
          {...register('name')}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="John Doe"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? 'Registering...' : 'Register'}
      </Button>

      {onSwitchToLogin && (
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline"
          >
            Login
          </button>
        </div>
      )}
    </form>
  )
}

