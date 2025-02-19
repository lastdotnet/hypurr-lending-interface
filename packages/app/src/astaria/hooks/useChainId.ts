import { usePageChainId } from '@/domain/hooks/usePageChainId'
import { ChainId } from 'chains'

export const useChainId = () => {
  const { chainId } = usePageChainId()

  return chainId as ChainId
}
