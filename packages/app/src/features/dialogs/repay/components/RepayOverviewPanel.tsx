import { Token } from '@/domain/types/Token'
import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import { HealthFactorChange } from '../../common/components/transaction-overview/HealthFactorChange'
import { TokenValueChange } from '../../common/components/transaction-overview/TokenValueChange'
import { PositionOverview } from '../logic/types'
import { useLingui } from '@lingui/react/macro'
export interface RepayOverviewPanelProps {
  debtAsset: Token
  currentPositionOverview: PositionOverview
  updatedPositionOverview?: PositionOverview
}
export function RepayOverviewPanel({
  debtAsset,
  currentPositionOverview,
  updatedPositionOverview,
}: RepayOverviewPanelProps) {
  const { t } = useLingui()
  return (
    <DialogPanel>
      <DialogPanelTitle>{t`Transaction overview`}</DialogPanelTitle>
      <TokenValueChange
        token={debtAsset}
        currentValue={currentPositionOverview.debt}
        updatedValue={updatedPositionOverview?.debt}
        label={t`Debt`}
      />
      <HealthFactorChange
        currentHealthFactor={currentPositionOverview.healthFactor}
        updatedHealthFactor={updatedPositionOverview?.healthFactor}
      />
    </DialogPanel>
  )
}
