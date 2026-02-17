import { createFileRoute } from '@tanstack/react-router'
import { Marketplace } from '../features/marketplace/Marketplace'

export const Route = createFileRoute('/marketplace')({
  component: Marketplace,
})
