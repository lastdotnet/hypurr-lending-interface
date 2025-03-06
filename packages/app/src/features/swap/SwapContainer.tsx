import { useChainId } from 'wagmi'

import { withSuspense } from '@/ui/utils/withSuspense'

import { SwapSkeleton } from './components/skeleton/SwapSkeleton'
import { SwapSuccessView } from './views/SwapSuccessView'
import { SendSuccessView } from './views/SendSuccessView'
import { SwapView } from './views/SwapView'
import { useSwap } from './logic/useSwap'
import { useSend } from './logic/useSend'

function SwapContainer() {
  const swap = useSwap()
  const send = useSend()

  if (swap.pageStatus === 'success') {
    return (
      <SwapSuccessView
        sold={swap.mockAssetsWithValue}
        bought={swap.mockAssetsWithValue}
        runConfetti={true}
        resetForm={() => {}}
      />
    )
  }

  if (send.pageStatus === 'success') {
    return (
      <SendSuccessView sent={send.mockAssetsWithValue} toAddress={'0x123'} runConfetti={true} resetForm={() => {}} />
    )
  }

  return <SwapView swap={swap} send={send} />
}

// @note: forces form to reset when network changes
function SwapContainerWithKey() {
  const chainId = useChainId()
  return <SwapContainer key={chainId} />
}

const SwapContainerWithSuspense = withSuspense(SwapContainerWithKey, SwapSkeleton)

export { SwapContainerWithSuspense as SwapContainer }
