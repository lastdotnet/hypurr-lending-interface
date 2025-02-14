import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'

import { APP_DATA, BASE_URL, DESCRIPTION } from '@/astaria/config/config'
import { SUPPORTED_CHAINS } from '@/astaria/constants/chains'
import { ENV } from '@/astaria/constants/environment'
import { transports } from '@/astaria/constants/transports'

export const wagmiConfig = defaultWagmiConfig({
  chains: SUPPORTED_CHAINS,
  enableCoinbase: true,
  enableEIP6963: true,
  enableInjected: true,
  enableWalletConnect: true,
  metadata: {
    description: DESCRIPTION,
    icons: ['https://astaria.xyz/favicon.ico'],
    name: APP_DATA.NAME,
    url: BASE_URL,
  },
  projectId: ENV.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports,
})
