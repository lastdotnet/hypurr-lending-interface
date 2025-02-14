import { useAccount } from 'wagmi'

import { DEFAULT_CHAIN } from '@/astaria/constants/chains'

export const useBlockExplorer = () => {
  const { chain } = useAccount()

  if (typeof chain === 'undefined') {
    return DEFAULT_CHAIN.blockExplorers.default
  }

  if (chain && !chain.blockExplorers) {
    return 'no-block-explorer'
  }

  return chain.blockExplorers?.default
}
