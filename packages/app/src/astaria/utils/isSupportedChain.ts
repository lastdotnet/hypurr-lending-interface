import { type ChainId } from 'chains'

import { SUPPORTED_CHAINS } from '@/astaria/constants/chains'

export const isSupportedChain = (chainId: number): chainId is ChainId =>
  SUPPORTED_CHAINS.some((chain) => chain.id === chainId)
