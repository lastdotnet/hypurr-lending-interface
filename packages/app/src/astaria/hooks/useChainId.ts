// eslint-disable-next-line no-restricted-imports
import { useChainId as useChainIdWagmi } from 'wagmi'

import { DEFAULT_CHAIN } from '@/astaria/constants/chains'
import { isSupportedChain } from '@/astaria/utils/isSupportedChain'

export const useChainId = () => {
  const chainId = useChainIdWagmi()

  if (!isSupportedChain(chainId)) {
    return DEFAULT_CHAIN.id
  }

  return chainId
}
