import { withSuspense } from '@/ui/utils/withSuspense'

import { PointsSkeleton } from './components/skeleton/PointsSkeleton'
import { usePoints } from './logic/usePoints'
import { GuestView } from './views/GuestView'
import { PointsView } from './views/PointsView'

function PointsContainer() {
  const { guestMode, openConnectModal } = usePoints()

  if (guestMode) {
    return <GuestView openConnectModal={openConnectModal} />
  }

  return <PointsView />
}

const PointsContainerWithSuspense = withSuspense(PointsContainer, PointsSkeleton)
export { PointsContainerWithSuspense as PointsContainer }
