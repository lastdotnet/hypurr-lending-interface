import { useChainId } from 'wagmi'

import { withSuspense } from '@/ui/utils/withSuspense'

import { SwapSkeleton } from './components/skeleton/SwapSkeleton'
import { SuccessView } from './views/SuccessView'
import { SwapView } from './views/SwapView'
import { useSwap } from './logic/useSwap'

function SwapContainer() {
  const { form, pageStatus } = useSwap()

  if (pageStatus === 'success') {
    return <SuccessView />
  }

  return <SwapView form={form} />
}

// @note: forces form to reset when network changes
function SwapContainerWithKey() {
  const chainId = useChainId()
  return <SwapContainer key={chainId} />
}

const SwapContainerWithSuspense = withSuspense(SwapContainerWithKey, SwapSkeleton)

export { SwapContainerWithSuspense as SwapContainer }
