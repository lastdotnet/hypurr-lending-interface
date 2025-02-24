import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Trans } from '@lingui/react/macro'
export function ConnectButton({ className }: { className?: string }) {
  const { setShowAuthFlow } = useDynamicContext()

  return (
    <button className={className} onClick={() => setShowAuthFlow(true)}>
      <Trans>Connect</Trans>
    </button>
  )
}
