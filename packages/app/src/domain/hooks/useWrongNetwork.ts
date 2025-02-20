import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { SUPPORTED_CHAIN_IDS } from '@/config/chain/constants'

export function useWrongNetwork(): boolean {
  const { primaryWallet, network } = useDynamicContext()

  const isWrongNetwork =
    primaryWallet?.connector.supportsNetworkSwitching() &&
    network &&
    !(SUPPORTED_CHAIN_IDS as Number[]).includes(Number(network))

  return Boolean(isWrongNetwork)
}
