import { formatPercentage } from '@/domain/common/format'
import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import { HealthFactorChange } from '../../common/components/transaction-overview/HealthFactorChange'
import { TransactionOverviewDetailsItem } from '../../common/components/transaction-overview/TransactionOverviewDetailsItem'
import { collateralTypeToDescription } from '../logic/collateralization'
import { PositionOverview } from '../logic/types'
import { useLingui as useLinguiMacro } from '@lingui/react/macro'
import { useLingui } from '@lingui/react'
export interface DepositOverviewPanelProps {
  currentPositionOverview: PositionOverview
  updatedPositionOverview?: PositionOverview
}
export function DepositOverviewPanel({ currentPositionOverview, updatedPositionOverview }: DepositOverviewPanelProps) {
  const { t } = useLinguiMacro()
  const { _ } = useLingui()
  return (
    <DialogPanel>
      <DialogPanelTitle>{t`Transaction overview`}</DialogPanelTitle>
      <TransactionOverviewDetailsItem label={t`Supply APY`}>
        {formatPercentage(currentPositionOverview.supplyAPY)}
      </TransactionOverviewDetailsItem>
      <TransactionOverviewDetailsItem label={t`Collateralization`}>
        {_(collateralTypeToDescription(currentPositionOverview.collateralization))}
      </TransactionOverviewDetailsItem>
      <HealthFactorChange
        currentHealthFactor={currentPositionOverview.healthFactor}
        updatedHealthFactor={updatedPositionOverview?.healthFactor}
      />
    </DialogPanel>
  )
}
