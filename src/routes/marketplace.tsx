import { createFileRoute } from '@tanstack/react-router'
import { Marketplace } from '../features/marketplace/marketplace'

export const Route = createFileRoute('/marketplace')({
  component: Marketplace,
})
