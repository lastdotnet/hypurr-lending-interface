import { sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

export const sendSafaryClubEvent = ({
  chainId,
  eventName,
  eventType,
}: {
  chainId?: ChainId
  eventName: string
  eventType: string
}) => {
  if (chainId !== sepolia.id && typeof window !== 'undefined' && window.safary !== undefined) {
    const safary = window.safary
    safary.track({
      eventName,
      eventType,
    })
  }
}
