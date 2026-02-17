import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { TopNavbar } from '../components/layout/top-navbar'
import '../App.css'

export const Route = createRootRoute({
  component: RootComponent,
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
