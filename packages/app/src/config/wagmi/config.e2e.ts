import { http, Chain, Transport, createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base, gnosis, mainnet } from 'viem/chains'
import { Config, createConfig } from 'wagmi'
import { z } from 'zod'

import { SandboxNetwork } from '@/domain/state/sandbox'
import { createMockConnector } from '@/domain/wallet/createMockConnector'

import { viemAddressSchema } from '@/domain/common/validation'
import { getConfig } from './config.default'
import { hyperEVM, hyperTestnet } from '../chain/constants'
import { VIEM_TIMEOUT_ON_FORKS } from '../consts'

export const PLAYWRIGHT_CHAIN_ID = '__PLAYWRIGHT_CHAIN_ID' as const
export const PLAYWRIGHT_WALLET_ADDRESS_KEY = '__PLAYWRIGHT_WALLET_ADDRESS' as const
export const PLAYWRIGHT_WALLET_PRIVATE_KEY_KEY = '__PLAYWRIGHT_WALLET_PRIVATE_KEY' as const
export const PLAYWRIGHT_WALLET_FORK_URL_KEY = '__PLAYWRIGHT_WALLET_FORK_URL_KEY' as const
export const PLAYWRIGHT_USDS_CONTRACTS_NOT_AVAILABLE_KEY = '__PLAYWRIGHT_USDS_CONTRACTS_NOT_AVAILABLE' as const

type PrivateKey = `0x${string}`
const privateKeySchema = z.custom<PrivateKey>((privateKey) => {
  const privateKeyRegex = /^0x[a-fA-F0-9]{64}$/

  return privateKeyRegex.test(privateKey as string)
})

export function getInjectedTransport(): Transport {
  if (typeof window !== 'undefined' && (window as any)[PLAYWRIGHT_WALLET_FORK_URL_KEY]) {
    return http((window as any)[PLAYWRIGHT_WALLET_FORK_URL_KEY], { timeout: VIEM_TIMEOUT_ON_FORKS })
  }

  throw new Error('PLAYWRIGHT_WALLET_FORK_URL_KEY is not available in this environment.')
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getMockConnectors(chain: Chain) {
  // Injects a mock connector if a wallet address or private key are injected into window object.
  // Private key takes precedence over address.
  const savedAddressSafeParse = viemAddressSchema.safeParse((window as any)[PLAYWRIGHT_WALLET_ADDRESS_KEY])
  const savedAddress = savedAddressSafeParse.success ? savedAddressSafeParse.data : undefined
  const savedPrivateKeySafeParse = privateKeySchema.safeParse((window as any)[PLAYWRIGHT_WALLET_PRIVATE_KEY_KEY])
  const savedPrivateKey = savedPrivateKeySafeParse.success ? savedPrivateKeySafeParse.data : undefined
  const account = savedPrivateKey ? privateKeyToAccount(savedPrivateKey) : savedAddress

  if (!account) {
    return []
  }

  const walletClient = createWalletClient({
    transport: getInjectedTransport(),
    chain,
    pollingInterval: 100,
    account,
  })

  const mockConnector = createMockConnector(walletClient)

  return [mockConnector]
}

export function getMockConfig(sandboxNetwork?: SandboxNetwork): Config {
  // Ensure this code only runs in the browser
  if (typeof window === 'undefined' || !(window as any)[PLAYWRIGHT_WALLET_FORK_URL_KEY]) {
    console.warn('Mock config not found. Loading default config.')
    return getConfig(sandboxNetwork)
  }

  const chain = chainIdToChain[(window as any)[PLAYWRIGHT_CHAIN_ID] as number]!
  const connectors = getMockConnectors(chain)

  const config = createConfig({
    chains: [chain],
    transports: { [chain.id]: getInjectedTransport() },
    connectors,
  })

  return config
}

const chainIdToChain: Record<number, Chain> = {
  [hyperTestnet.id]: hyperTestnet,
  [hyperEVM.id]: hyperEVM,
  [gnosis.id]: gnosis,
  [mainnet.id]: mainnet,
  [base.id]: {
    ...base,
    name: 'Base DevNet',
  },
}
