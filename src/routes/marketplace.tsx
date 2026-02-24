import { createFileRoute } from '@tanstack/react-router'
import { Marketplace } from '../features/marketplace/marketplace.tsx'

export const Route = createFileRoute('/marketplace')({
  component: Marketplace,
})
