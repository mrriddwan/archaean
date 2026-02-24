import { createFileRoute } from '@tanstack/react-router'
import { Home } from '../features/home/home.tsx'


export const Route = createFileRoute('/')({
 component: Home,
})
