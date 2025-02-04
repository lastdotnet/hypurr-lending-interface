import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

export function useAccount(): Address | undefined {
  const { primaryWallet } = useDynamicContext()
  return primaryWallet?.address ? (primaryWallet.address as Address) : undefined
}
