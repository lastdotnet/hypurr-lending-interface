import { DEFAULT_CHAIN } from '@/astaria/constants/chains'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useBlockExplorerLink } from '@/domain/hooks/useBlockExplorerLink'

export const useBlockExplorer = () => {
  const chainId = useChainId()

  const blockExplorerLink = useBlockExplorerLink(chainId)

  if (typeof blockExplorerLink === 'undefined') {
    return DEFAULT_CHAIN.blockExplorers.default
  }

  if (!blockExplorerLink) {
    return 'no-block-explorer'
  }

  return blockExplorerLink
}
