import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { TopNavbar } from '../components/layout/top-navbar'
import '../App.css'

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'issues' in error) {
    return 'This link or page address is invalid. Please try again from the start.'
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong. Please try again.'
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        {getErrorMessage(error)}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Try again
        </button>
        <Link
          to="/"
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Go home
        </Link>
      </div>
    </div>
  ),
})

function RootComponent() {
  return (
    <React.Fragment>
      <TopNavbar />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
