import { base, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

export const SIMPLE_HASH_NETWORK_MAP: Partial<Record<ChainId, 'base' | 'ethereum' | 'ethereum-sepolia' | 'mode'>> = {
  [base.id]: 'base',
  [mainnet.id]: 'ethereum',
  [mode.id]: 'mode',
  [sepolia.id]: 'ethereum-sepolia',
}
