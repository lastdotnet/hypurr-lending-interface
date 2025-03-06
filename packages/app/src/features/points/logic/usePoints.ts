import { useAccount } from '@/domain/hooks/useAccount'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export interface UsePointsResults {
  guestMode: boolean
  openConnectModal: () => void
}

export function usePoints(): UsePointsResults {
  const account = useAccount()
  const { setShowAuthFlow } = useDynamicContext()

  return {
    guestMode: !account,
    openConnectModal: () => setShowAuthFlow(true),
  }
}
