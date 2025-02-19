'use client'

import { useAccount } from '@/domain/hooks/useAccount'
import { type ReactNode } from 'react'

export const Connected = ({
  connectedComponent,
  notConnectedComponent,
}: {
  connectedComponent: ReactNode
  notConnectedComponent?: ReactNode
}) => {
  const isConnected = useAccount()

  if (isConnected) {
    return connectedComponent
  }

  return notConnectedComponent || undefined
}
