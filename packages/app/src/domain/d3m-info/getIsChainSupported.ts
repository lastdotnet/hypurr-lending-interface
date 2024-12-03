import { getOriginChainId } from '../hooks/useOriginChainId'
import { useStore } from '../state'
import { hyperTestnet } from '@/config/chain/constants'

const MAKER_INFO_SUPPORTED_CHAIN_IDS = [hyperTestnet].map((chain) => chain.id)

export function getIsChainSupported(chainId: number): boolean {
  const sandbox = useStore.getState().sandbox.network
  const originChainId = getOriginChainId(chainId, sandbox)

  return MAKER_INFO_SUPPORTED_CHAIN_IDS.includes(originChainId)
}
