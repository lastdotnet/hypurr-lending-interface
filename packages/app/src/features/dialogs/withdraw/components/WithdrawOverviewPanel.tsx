import { formatPercentage } from '@/domain/common/format'
import { TokenWithValue } from '@/domain/common/types'
import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import { HealthFactorChange } from '../../common/components/transaction-overview/HealthFactorChange'
import { TokenValueChange } from '../../common/components/transaction-overview/TokenValueChange'
import { TransactionOverviewDetailsItem } from '../../common/components/transaction-overview/TransactionOverviewDetailsItem'
import { PositionOverview } from '../logic/types'
import { useLingui } from '@lingui/react/macro'
export interface WithdrawOverviewPanelProps {
  withdrawAsset: TokenWithValue
  currentPositionOverview: PositionOverview
  updatedPositionOverview?: PositionOverview
}
export function WithdrawOverviewPanel({
  withdrawAsset,
  currentPositionOverview,
  updatedPositionOverview,
}: WithdrawOverviewPanelProps) {
  const { t } = useLingui()
  return (
    <DialogPanel>
      <DialogPanelTitle>{t`Transaction overview`}</DialogPanelTitle>
      <TransactionOverviewDetailsItem label={t`Supply APY`}>
        {formatPercentage(currentPositionOverview.supplyAPY)}
      </TransactionOverviewDetailsItem>
      <TokenValueChange
        token={withdrawAsset.token}
        currentValue={currentPositionOverview.tokenSupply}
        updatedValue={updatedPositionOverview?.tokenSupply}
        label={t`Supply`}
      />
      <HealthFactorChange
        currentHealthFactor={currentPositionOverview.healthFactor}
        updatedHealthFactor={updatedPositionOverview?.healthFactor}
      />
    </DialogPanel>
  )
}
