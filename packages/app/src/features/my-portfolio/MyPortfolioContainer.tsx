import { useOpenDialog } from '@/domain/state/dialogs'
import { withSuspense } from '@/ui/utils/withSuspense'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { MyPortfolioSkeleton } from './components/skeleton/MyPortfolioSkeleton'
import { useMyPortfolio } from './logic/useMyPortfolio'
import { GuestView } from './views/GuestView'
import { PositionView } from './views/PositionView'

function MyPortfolioContainer() {
  const {
    positionSummary,
    deposits,
    borrows,
    netApyDetails,
    walletComposition,
    eModeCategoryId,
    guestMode,
    liquidationDetails,
  } = useMyPortfolio()
  const { setShowAuthFlow } = useDynamicContext()
  const openDialog = useOpenDialog()

  if (guestMode) {
    return <GuestView openConnectModal={() => setShowAuthFlow(true)} />
  }

  return (
    <PositionView
      positionSummary={positionSummary}
      deposits={deposits}
      borrows={borrows}
      walletComposition={walletComposition}
      eModeCategoryId={eModeCategoryId}
      openDialog={openDialog}
      liquidationDetails={liquidationDetails}
      netApyDetails={netApyDetails}
    />
  )
}

const MyPortfolioContainerWithSuspense = withSuspense(MyPortfolioContainer, MyPortfolioSkeleton)
export { MyPortfolioContainerWithSuspense as MyPortfolioContainer }
