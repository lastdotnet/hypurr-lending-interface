'use client'

import * as Sentry from '@/astaria/sentry/nextjs'
import { IconCheck } from '@/astaria/tabler/icons-react'

import { useAccountEffect } from 'wagmi'

import { useToast } from '@/astaria/components/Toast/useToast'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'

export const GlobalTrackers = () => {
  const { toast } = useToast()

  // Wallet connect/disconnect events
  useAccountEffect({
    onConnect({ address, connector, isReconnected }) {
      if (!isReconnected) {
        toast({
          description: `You are now connected via ${connector?.name}`,
          icon: <IconCheck />,
          title: 'Connected',
        })
      }

      Sentry.setUser({ id: address?.toString() })
      Sentry.setContext('connector', {
        id: connector?.id,
        name: connector?.name,
      })
      sendSafaryClubEvent({
        eventName: 'Connect a wallet',
        eventType: 'offchain',
      })
    },
    onDisconnect() {
      toast({
        description: `You have disconnected your wallet connection.`,
        icon: <IconCheck />,
        title: 'Disconnected',
      })

      Sentry.setUser(null)
      Sentry.setContext('connector', null)
    },
  })

  return null
}
