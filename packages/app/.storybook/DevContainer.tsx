import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { WagmiProvider } from 'wagmi'

import { queryClient } from '@/config/query-client'
import { getConfig } from '@/config/wagmi'
import { I18nAppProvider } from '@/domain/i18n/I18nAppProvider'
import { TooltipProvider } from '@/ui/atoms/tooltip/Tooltip'

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { StorybookErrorBoundary } from './ErrorBoundary'

interface DevContainerProps {
  children: React.ReactNode
}
/**
 * Helpful for developing connected components using Storybook.
 */
export function DevContainer({ children }: DevContainerProps) {
  const config = getConfig()

  return (
    <DynamicContextProvider
      settings={{
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID || '',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <StorybookErrorBoundary>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <I18nAppProvider>
              <TooltipProvider delayDuration={0}>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </TooltipProvider>
            </I18nAppProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </StorybookErrorBoundary>
    </DynamicContextProvider>
  )
}

function Loading() {
  return <div>Loading...</div>
}
