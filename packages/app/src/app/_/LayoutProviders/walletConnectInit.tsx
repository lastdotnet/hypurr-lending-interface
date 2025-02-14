import { initWeb3InboxClient } from '@/astaria/web3inbox/react'
import { createWeb3Modal } from '@/astaria/web3modal/wagmi/react'

import { wagmiConfig } from '@/astaria/config/wagmi'

import { BASE_URL } from '@/astaria/config/config'
import { DEFAULT_CHAIN } from '@/astaria/constants/chains'
import { ENV } from '@/astaria/constants/environment'

createWeb3Modal({
  defaultChain: DEFAULT_CHAIN,
  featuredWalletIds: [
    // https://walletconnect.com/explorer?type=wallet
    // use an id from the URL to feature more
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709', // OKX
  ],
  privacyPolicyUrl: `${BASE_URL}/privacy`,
  projectId: ENV.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  termsConditionsUrl: `${BASE_URL}/terms`,
  themeVariables: {
    '--w3m-accent': '#9C9C9C',
    '--w3m-border-radius-master': '0',
    '--w3m-font-family': 'var(--font-inter)',
  },
  wagmiConfig,
})

initWeb3InboxClient({
  domain: ENV.NEXT_PUBLIC_APP_DOMAIN,
  projectId: ENV.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
})
