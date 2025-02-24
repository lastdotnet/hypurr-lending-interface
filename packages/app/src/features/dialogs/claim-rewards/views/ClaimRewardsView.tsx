import { DialogActionsPanel } from '@/features/dialogs/common/components/DialogActionsPanel'
import { MultiPanelDialog } from '@/features/dialogs/common/components/MultiPanelDialog'
import { DialogTitle } from '@/ui/atoms/dialog/Dialog'

import { Objective } from '@/features/actions/logic/types'
import { Reward } from '@/features/navbar/components/rewards-badge/types'
import { PageStatus } from '../../common/types'
import { ClaimRewardsOverviewPanel } from '../components/ClaimRewardsOverviewPanel'
import { Trans } from '@lingui/react/macro'

export interface ClaimRewardsViewProps {
  rewards: Reward[]
  pageStatus: PageStatus
  objectives: Objective[]
}

export function ClaimRewardsView({ rewards, pageStatus, objectives }: ClaimRewardsViewProps) {
  return (
    <MultiPanelDialog>
      <DialogTitle>
        <Trans>Claim rewards</Trans>
      </DialogTitle>

      <ClaimRewardsOverviewPanel rewards={rewards} />

      <DialogActionsPanel
        objectives={objectives}
        onFinish={pageStatus.goToSuccessScreen}
        enabled={pageStatus.actionsEnabled}
      />
    </MultiPanelDialog>
  )
}
