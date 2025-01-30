import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import BigNumber from 'bignumber.js'
import { HealthFactorChange } from '../../common/components/transaction-overview/HealthFactorChange'
import { Percentage } from '@/domain/types/NumericValues'
import { formatPercentage } from '@/domain/common/format'
import { TransactionOverviewDetailsItem } from '@/features/farm-details/dialogs/common/components/TransactionOverviewDetailsItem'

export interface BorrowOverviewPanelProps {
  currentHealthFactor?: BigNumber
  updatedHealthFactor?: BigNumber
  borrowAPY?: Percentage
}
export function BorrowOverviewPanel({ currentHealthFactor, updatedHealthFactor, borrowAPY }: BorrowOverviewPanelProps) {
  if (currentHealthFactor === undefined && updatedHealthFactor === undefined && borrowAPY === undefined) {
    return null
  }

  return (
    <DialogPanel>
      <DialogPanelTitle>Transaction overview</DialogPanelTitle>
      <TransactionOverviewDetailsItem label="Borrow APY">{formatPercentage(borrowAPY)}</TransactionOverviewDetailsItem>
      <HealthFactorChange currentHealthFactor={currentHealthFactor} updatedHealthFactor={updatedHealthFactor} />
    </DialogPanel>
  )
}
