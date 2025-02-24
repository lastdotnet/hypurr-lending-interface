import { hyperEVM, hyperTestnet } from '@/config/chain/constants'
import { base } from 'viem/chains'
import { getOriginChainId } from '../hooks/useOriginChainId'
import { useStore } from '../state'

const MAKER_INFO_SUPPORTED_CHAIN_IDS = [hyperTestnet, hyperEVM, base].map((chain) => chain.id)

export function getIsChainSupported(chainId: number): boolean {
  const sandbox = useStore.getState().sandbox.network
  const originChainId = getOriginChainId(chainId, sandbox)

  return MAKER_INFO_SUPPORTED_CHAIN_IDS.includes(originChainId)
}
