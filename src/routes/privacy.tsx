import { createFileRoute } from '@tanstack/react-router'
import { Privacy } from '../features/terms/privacy'

export const Route = createFileRoute('/privacy')({
  component: Privacy,
})
