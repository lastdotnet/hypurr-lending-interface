import { PageLayout } from '@/ui/layouts/PageLayout'
import { SwapPanel } from '../components/SwapPanel'
import { UseSwapResults } from '@/features/swap/logic/useSwap'
import { UseSendResults } from '@/features/swap/logic/useSend'

interface SwapViewProps {
  swap: UseSwapResults
  send: UseSendResults
}

export function SwapView(props: SwapViewProps) {
  const { send, swap } = props

  return (
    <PageLayout>
      <div className="mt-8 flex justify-center">
        <SwapPanel send={send} swap={swap} />
      </div>
    </PageLayout>
  )
}
