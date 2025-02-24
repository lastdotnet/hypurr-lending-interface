import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import { HealthFactorChange } from '../../common/components/transaction-overview/HealthFactorChange'
import { EModeCategory, PositionOverview } from '../types'
import { AvailableAssets } from './AvailableAssets'
import { LTVChange } from './LTVChange'
import { useLingui } from '@lingui/react/macro'
export interface EModeOverviewPanelProps {
  eModeCategory: EModeCategory
  currentPositionOverview: PositionOverview
  updatedPositionOverview?: PositionOverview
}
export function EModeOverviewPanel({
  eModeCategory,
  currentPositionOverview,
  updatedPositionOverview,
}: EModeOverviewPanelProps) {
  const { t } = useLingui()
  return (
    <DialogPanel>
      <DialogPanelTitle>{t`Transaction overview`}</DialogPanelTitle>
      <AvailableAssets categoryName={eModeCategory.name} tokens={eModeCategory.tokens} />
      <HealthFactorChange
        currentHealthFactor={currentPositionOverview.healthFactor}
        updatedHealthFactor={updatedPositionOverview?.healthFactor}
      />
      <LTVChange currentMaxLTV={currentPositionOverview.maxLTV} updatedMaxLTV={updatedPositionOverview?.maxLTV} />
    </DialogPanel>
  )
}
