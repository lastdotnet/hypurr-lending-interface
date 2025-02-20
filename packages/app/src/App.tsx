'use client'

import '@/app/_/LayoutProviders/walletConnectInit'

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { WagmiProvider } from 'wagmi'

import { getConfig } from '@/config/wagmi/index'

import { queryClient } from './config/query-client'
import { TooltipProvider } from './ui/atoms/tooltip/Tooltip'
import { SUPPORTED_CHAINS_DYNAMIC } from './config/chain/constants'
import { ConfettiProvider } from './ui/molecules/confetti/Confetti'

const cssOverrides = `
.active-wallet-information-container .alert--warning {
  display: none;
}
`
const config = getConfig()

function App({ children }: React.PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        cssOverrides,
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
        walletConnectors: [EthereumWalletConnectors],
        initialAuthenticationMode: 'connect-only',
        mobileExperience: 'redirect',
        overrides: {
          evmNetworks: SUPPORTED_CHAINS_DYNAMIC,
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <ConfettiProvider>
              <Toaster position="top-right" containerClassName="toast-notifications" />
              <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
            </ConfettiProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}

export default App
