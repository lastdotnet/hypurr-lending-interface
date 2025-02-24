import { extractChain } from 'viem'

import { type ChainId } from 'chains'

import { SUPPORTED_CHAINS } from './isSupportedChain'

export const getChain = ({ chainId }: { chainId: ChainId }) =>
  extractChain({
    chains: SUPPORTED_CHAINS,
    id: chainId,
  })
