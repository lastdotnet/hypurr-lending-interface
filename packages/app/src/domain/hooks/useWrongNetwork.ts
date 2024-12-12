import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { hyperTestnet } from '@/config/chain/constants'

export function useWrongNetwork(): boolean {
  const { primaryWallet, network } = useDynamicContext()

  const isWrongNetwork = primaryWallet?.connector.supportsNetworkSwitching() && network && network !== hyperTestnet.id

  return Boolean(isWrongNetwork)
}
