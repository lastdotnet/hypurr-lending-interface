import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export function ConnectButton({ className }: { className?: string }) {
  const { setShowAuthFlow } = useDynamicContext()

  return (
    <button className={className} onClick={() => setShowAuthFlow(true)}>
      Connect
    </button>
  )
}
