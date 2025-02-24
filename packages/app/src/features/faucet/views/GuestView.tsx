import { Button } from '@/ui/atoms/button/Button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Trans } from '@lingui/react/macro'

export function GuestView() {
  const { setShowAuthFlow } = useDynamicContext()

  return (
    <Button onClick={() => setShowAuthFlow(true)} rounded="full">
      <Trans>Connect wallet</Trans>
    </Button>
  )
}
