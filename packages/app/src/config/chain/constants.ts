import { AssetsGroup } from '@/domain/farms/types'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { base, mainnet } from 'viem/chains'

import { type Chain } from 'viem'
import { isTestnet } from '../consts'

export const hyperTestnet = {
  id: 998,
  name: 'Hyperliquid EVM Testnet',
  nativeCurrency: { name: 'Hype', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] },
  },
  blockExplorers: {
    default: { name: 'Purrsec', url: 'https://testnet.purrsec.com' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
} as const satisfies Chain

export const hyperTestnetDynamic = {
  blockExplorerUrls: [hyperTestnet.blockExplorers.default.url],
  chainId: hyperTestnet.id,
  networkId: hyperTestnet.id,
  chainName: 'HyperEVM Testnet',
  name: hyperTestnet.name,
  vanityName: hyperTestnet.name,
  iconUrls: ['/hyper-evm-logo.png'],
  nativeCurrency: {
    ...hyperTestnet.nativeCurrency,
    iconUrl: '/hyper-evm-logo.png',
  },
  rpcUrls: [hyperTestnet.rpcUrls.default.http[0]],
}

export const hyperEVM = {
  id: 999,
  name: 'HyperEVM',
  nativeCurrency: { name: 'Hype', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid.xyz/evm'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://hyperliquid.cloud.blockscout.com' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
} as const satisfies Chain

export const hyperEVMDynamic = {
  blockExplorerUrls: [hyperEVM.blockExplorers.default.url],
  chainId: hyperEVM.id,
  networkId: hyperEVM.id,
  chainName: hyperEVM.name,
  name: hyperEVM.name,
  vanityName: hyperEVM.name,
  iconUrls: ['/hyper-evm-logo.png'],
  nativeCurrency: {
    ...hyperEVM.nativeCurrency,
    iconUrl: '/hyper-evm-logo.png',
  },
  rpcUrls: [hyperEVM.rpcUrls.default.http[0]],
}

export const SUPPORTED_CHAINS = isTestnet ? [hyperTestnet] : [hyperEVM]
export const SUPPORTED_CHAINS_DYNAMIC = isTestnet ? [hyperTestnetDynamic] : [hyperEVMDynamic]
export const SUPPORTED_CHAIN_IDS = SUPPORTED_CHAINS.map((chain) => chain.id)

export const farmStablecoinsEntryGroup: Record<1 | 8453, AssetsGroup> = {
  [mainnet.id]: {
    type: 'stablecoins',
    name: 'Stablecoins',
    assets: [TokenSymbol('DAI'), TokenSymbol('USDC'), TokenSymbol('USDS'), TokenSymbol('sDAI'), TokenSymbol('sUSDS')],
  },
  [base.id]: {
    type: 'stablecoins',
    name: 'Stablecoins',
    assets: [TokenSymbol('USDS'), TokenSymbol('sUSDS'), TokenSymbol('USDC')],
  },
}

export const farmAddresses = {
  [mainnet.id]: {
    chroniclePoints: CheckedAddress('0x10ab606B067C9C461d8893c47C7512472E19e2Ce'),
    skyUsds: CheckedAddress('0x0650CAF159C5A49f711e8169D4336ECB9b950275'),
  },
  [base.id]: {
    skyUsds: CheckedAddress('0x711b139b1f20DFc4416bFf875402015aeB05B4F2'),
  },
} as const

export const susdsAddresses = {
  [mainnet.id]: CheckedAddress('0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD'),
} as const
