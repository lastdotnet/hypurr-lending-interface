import { createPublicClient } from 'viem'
import { type Chain, type PublicClient } from 'viem'

import { type ChainId } from 'chains'

import { transports } from '@/astaria/constants/transports'
import { getChain } from '@/astaria/utils/getChain'

const publicClientCache = new Map<ChainId, PublicClient>()

export const getPublicClient = ({ chainId }: { chainId: ChainId }) => {
  let publicClient = publicClientCache.get(chainId)

  if (typeof publicClient !== 'undefined') {
    return publicClient
  }

  publicClient = createPublicClient({
    batch: {
      multicall: {
        batchSize: 512,
      },
    },
    chain: getChain({ chainId }) as Chain,
    transport: transports[chainId],
  })

  publicClientCache.set(chainId, publicClient)

  return publicClient
}
