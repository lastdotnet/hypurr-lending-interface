import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import BigNumber from 'bignumber.js'
import { HealthFactorChange } from '../../common/components/transaction-overview/HealthFactorChange'
import { Percentage } from '@/domain/types/NumericValues'
import { formatPercentage } from '@/domain/common/format'
import { TransactionOverviewDetailsItem } from '@/features/farm-details/dialogs/common/components/TransactionOverviewDetailsItem'
import { LoanToValueSlider } from '@/features/easy-borrow/components/form/LoanToValueSlider'
import { LoanToValue } from '@/features/easy-borrow/components/form/LoanToValue'
import { UserPositionSummary } from '@/domain/market-info/marketInfo'
import { nonZeroOrDefault } from '@/utils/bigNumber'

export interface BorrowOverviewPanelProps {
  currentHealthFactor?: BigNumber
  updatedHealthFactor?: BigNumber
  borrowAPY?: Percentage
  updatedPositionSummary: UserPositionSummary
  setDesiredLoanToValue: (desiredLtv: Percentage) => void
}
export function BorrowOverviewPanel({
  currentHealthFactor,
  updatedHealthFactor,
  borrowAPY,
  updatedPositionSummary,
  setDesiredLoanToValue,
}: BorrowOverviewPanelProps) {
  if (currentHealthFactor === undefined && updatedHealthFactor === undefined && borrowAPY === undefined) {
    return null
  }

  return (
    <DialogPanel>
      <DialogPanelTitle>Transaction overview</DialogPanelTitle>
      <LoanToValue
        className="mt-10"
        loanToValue={updatedPositionSummary.loanToValue}
        maxLoanToValue={updatedPositionSummary.maxLoanToValue}
      />

      <LoanToValueSlider
        className="mt-10"
        ltv={updatedPositionSummary.loanToValue}
        maxAvailableLtv={nonZeroOrDefault(updatedPositionSummary.maxLoanToValue, Percentage(0.8))}
        liquidationLtv={nonZeroOrDefault(updatedPositionSummary.currentLiquidationThreshold, Percentage(0.825))}
        onLtvChange={(e) => {
          setDesiredLoanToValue(e)
        }}
      />
      <TransactionOverviewDetailsItem label="Borrow APY">{formatPercentage(borrowAPY)}</TransactionOverviewDetailsItem>
      <HealthFactorChange currentHealthFactor={currentHealthFactor} updatedHealthFactor={updatedHealthFactor} />
    </DialogPanel>
  )
}
