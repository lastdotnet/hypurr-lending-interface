import { EModeCategoryId } from '@/domain/e-mode/types'
import { LiquidationDetails } from '@/domain/market-info/getLiquidationDetails'
import { OpenDialogFunction } from '@/domain/state/dialogs'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { HealthFactorPanel } from '@/ui/organisms/health-factor-panel/HealthFactorPanel'

import { BorrowTable } from '../components/borrow-table/BorrowTable'
import { DepositTable } from '../components/deposit-table/DepositTable'
import { CreatePositionPanel } from '../components/create-position-panel/CreatePositionPanel'
import { MyDepositsTable } from '../components/my-deposit-table/MyDepositsTable'
import { Position } from '../components/position/Position'
import { Borrow, Deposit } from '../logic/assets'
import { PositionSummary } from '../logic/types'
import { WalletCompositionInfo } from '../logic/wallet-composition'
import { MyBorrowsTable } from '../components/my-borrows-table/MyBorrowsTable'

export interface PositionViewProps {
  positionSummary: PositionSummary
  deposits: Deposit[]
  borrows: Borrow[]
  eModeCategoryId: EModeCategoryId
  walletComposition: WalletCompositionInfo
  openDialog: OpenDialogFunction
  liquidationDetails: LiquidationDetails | undefined
}

export function PositionView({
  positionSummary,
  deposits,
  borrows,
  eModeCategoryId,
  openDialog,
  liquidationDetails,
}: PositionViewProps) {
  const myDeposits = deposits.filter((reserve) => reserve.deposit.gt(0))
  const myBorrows = borrows.filter((reserve) => reserve.debt.gt(0))

  return (
    <PageLayout className="max-w-6xl px-3 lg:px-3">
      <div className="flex flex-col flex-wrap gap-4 md:flex-row">
        <HealthFactorPanel
          hf={positionSummary.healthFactor}
          className="order-1 flex-grow md:max-w-md"
          variant="with-liquidation-price"
          liquidationDetails={liquidationDetails}
        />
        <Position className="order-3 flex-grow md:order-2" positionSummary={positionSummary} />
        {!positionSummary.hasDeposits && <CreatePositionPanel className="order-2 flex-grow md:order-3" />}
      </div>

      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex-1">
          <MyDepositsTable assets={myDeposits} openDialog={openDialog} />
        </div>
        <div className="flex-1">
          <MyBorrowsTable assets={myBorrows} openDialog={openDialog} />
        </div>
      </div>

      <DepositTable assets={deposits} openDialog={openDialog} />
      <BorrowTable assets={borrows} eModeCategoryId={eModeCategoryId} openDialog={openDialog} />
    </PageLayout>
  )
}
