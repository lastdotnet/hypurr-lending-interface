import { ChainLogo } from '@/astaria/components/ChainLogo'
import { useChainId } from '@/astaria/hooks/useChainId'

export const ConnectedChainLogo = () => {
  const chainId = useChainId()

  return <ChainLogo chainId={chainId} height="20" width="20" />
}
