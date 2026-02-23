import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'
import { useCurrentUser, useLogout } from '../../query/auth'
import { Button } from '../../components/ui/button'
import type { RootState } from '../../store'

export const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  const user = useSelector((state: RootState) => state.user.user)
  const { isLoading: isLoadingUser } = useCurrentUser()
  const logoutMutation = useLogout()

  const handleLoginSuccess = () => {
    setActiveTab('login')
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setIsOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoadingUser) {
    return (
      <button className="p-2 rounded-md transition-colors">
        <FaUser className="size-5 text-black dark:text-white" />
      </button>
    )
  }

  if (user) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="p-2 rounded-md transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
            <FaUser className="size-5 text-black dark:text-white" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>
              Logged in as {user.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Name:</span> {user.displayName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Role:</span> {user.role}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="w-full"
            >
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-md transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
          <FaUser className="size-5 text-black dark:text-white" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activeTab === 'login' ? 'Login' : 'Register'}
          </DialogTitle>
          <DialogDescription>
            {activeTab === 'login'
              ? 'Enter your credentials to access your account'
              : 'Create a new account to get started'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'login'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'register'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Register
            </button>
          </div>

          {activeTab === 'login' ? (
            <LoginForm onSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm
              onSuccess={handleLoginSuccess}
              onSwitchToLogin={() => setActiveTab('login')}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
