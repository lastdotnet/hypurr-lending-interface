import { ConnectButton } from '@/astaria/components/ConnectButton'
import { ErrorSection } from '@/astaria/components/ErrorSection'

export const NotConnected = () => (
  <ErrorSection
    actions={<ConnectButton />}
    message="Please connect your wallet to use this feature."
    title="Not connected"
  />
)
