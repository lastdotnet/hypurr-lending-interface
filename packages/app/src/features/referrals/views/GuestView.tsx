import { Button } from '@/ui/atoms/button/Button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export function GuestView() {
  const { setShowAuthFlow } = useDynamicContext()

  return (
    <Button onClick={() => setShowAuthFlow(true)} rounded="full">
      Connect wallet
    </Button>
  )
}
