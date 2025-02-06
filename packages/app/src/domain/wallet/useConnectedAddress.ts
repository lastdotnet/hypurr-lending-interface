import { useChainId } from 'wagmi'

import { NotConnectedError } from '@/domain/errors/not-connected'
import { useAccount } from '@/domain/hooks/useAccount'
import { CheckedAddress } from '../types/CheckedAddress'

export interface ConnectedInfo {
  chainId: number
  account: CheckedAddress
}

export function useConnectedAddress(): ConnectedInfo {
  const account = useAccount()
  const chainId = useChainId()

  if (!account) throw new NotConnectedError()

  return {
    chainId,
    account: CheckedAddress(account),
  }
}
