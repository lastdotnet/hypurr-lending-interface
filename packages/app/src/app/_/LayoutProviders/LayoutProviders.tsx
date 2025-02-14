'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'

import { wagmiConfig } from '@/astaria/config/wagmi'
import { type State, WagmiProvider } from 'wagmi'

import '@/app/_/LayoutProviders/walletConnectInit'
import { Toaster } from '@/astaria/components/Toast/Toaster'

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // retry once, for a total of 2 tries
        staleTime: 15000, // 15 seconds
      },
    },
  })

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}

export const LayoutProviders = ({
  children,
  initialState,
}: {
  children: ReactNode
  initialState: State | undefined
}) => {
  const queryClient = getQueryClient()

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
