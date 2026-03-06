import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../../components/ui/menubar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog'
import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'
import { useCurrentUser, useLogout } from '../../query/auth'
import type { AppDispatch, RootState } from '../../store'
import { Button } from '../../components/ui/button'
import { setAuthOpen } from '../../store/features/auth/authSlice'
import { toast } from 'sonner'


export const AuthButton = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)
  const isAuthOpen = useSelector((state: RootState) => state.user.isAuthOpen)

  const { isLoading: isLoadingUser } = useCurrentUser()
  const logoutMutation = useLogout()

  const handleLoginSuccess = () => {
    dispatch(setAuthOpen(false))
    toast.success('Login successful')
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      dispatch(setAuthOpen(false))
      toast.success('Logout successful')
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

  if (confirmLogout) {
    return (
      <AlertDialog open={confirmLogout} onOpenChange={setConfirmLogout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button onClick={() => setConfirmLogout(false)}>Cancel</Button>
            <Button onClick={() => void handleLogout()} variant="destructive">Logout</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (user) {
    return (
      <Menubar className="border-0 p-0 bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <button
              type="button"
              className="p-2 rounded-md transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <FaUser className="size-5 text-black dark:text-white" />
            </button>
          </MenubarTrigger>
          <MenubarContent align="end" className="w-56">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <MenubarSeparator />
            <MenubarItem
              variant="destructive"
              onSelect={() => setConfirmLogout(true)}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }



  return (
    <Dialog open={isAuthOpen} onOpenChange={(open) => dispatch(setAuthOpen(open))}>
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
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'login'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'register'
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
