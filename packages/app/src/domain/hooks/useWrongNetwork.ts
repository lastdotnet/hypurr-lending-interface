import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { hyperTestnet, hyperEVM } from '@/config/chain/constants'

export function useWrongNetwork(): boolean {
  const { primaryWallet, network } = useDynamicContext()

  const isWrongNetwork =
    primaryWallet?.connector.supportsNetworkSwitching() &&
    network &&
    !([hyperTestnet.id, hyperEVM.id] as Number[]).includes(Number(network))

  return Boolean(isWrongNetwork)
}
