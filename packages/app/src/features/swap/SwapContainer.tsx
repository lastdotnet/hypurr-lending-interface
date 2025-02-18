import { useChainId } from 'wagmi'

import { withSuspense } from '@/ui/utils/withSuspense'

import { SwapSkeleton } from './components/skeleton/SwapSkeleton'
import { SuccessView } from './views/SuccessView'
import { SwapView } from './views/SwapView'
const pageStatus = {
  state: 'form',
}

function SwapContainer() {
  if (pageStatus.state === 'success') {
    return <SuccessView />
  }

  return <SwapView />
}

// @note: forces form to reset when network changes
function SwapContainerWithKey() {
  const chainId = useChainId()
  return <SwapContainer key={chainId} />
}

const SwapContainerWithSuspense = withSuspense(SwapContainerWithKey, SwapSkeleton)

export { SwapContainerWithSuspense as SwapContainer }
