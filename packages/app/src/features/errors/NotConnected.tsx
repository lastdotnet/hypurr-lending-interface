import { useAccountEffect } from 'wagmi'
import { Button } from '@/ui/atoms/button/Button'
import { Typography } from '@/ui/atoms/typography/Typography'
import { ErrorLayout } from '@/ui/layouts/ErrorLayout'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/navigation'

export function NotConnected({ fullScreen }: { fullScreen?: boolean }) {
  const { setShowAuthFlow } = useDynamicContext()
  const router = useRouter()

  useAccountEffect({
    onConnect: () => {
      router.refresh()
    },
  })

  return (
    <ErrorLayout fullScreen={fullScreen}>
      <Typography variant="h3">This page is available only for connected users</Typography>
      <Button onClick={() => setShowAuthFlow(true)}>Connect wallet</Button>
    </ErrorLayout>
  )
}
