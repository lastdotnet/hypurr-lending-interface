import { assets } from '@/ui/assets'
import { TokenIcon } from '@/ui/atoms/token-icon/TokenIcon'

import { ActionRow } from '../../components/action-row/ActionRow'
import { UpDownMarker } from '../../components/action-row/UpDownMarker'
import { ActionRowBaseProps } from '../../components/action-row/types'
import { ClaimFarmRewardsAction } from './types'
import { Trans, useLingui } from '@lingui/react/macro'

export interface ClaimFarmRewardsActionRowProps extends ActionRowBaseProps {
  action: ClaimFarmRewardsAction
}

export function ClaimFarmRewardsActionRow({
  index,
  action,
  actionHandlerState,
  onAction,
  variant,
}: ClaimFarmRewardsActionRowProps) {
  const { t } = useLingui()
  const status = actionHandlerState.status

  return (
    <ActionRow index={index}>
      <ActionRow.Icon path={assets.actions.withdraw} actionStatus={status} />

      <ActionRow.Title icon={<TokenIcon token={action.rewardToken} className="h-6" />} actionStatus={status}>
        <Trans>Claim rewards</Trans>
      </ActionRow.Title>

      <ActionRow.Description successMessage={t`Rewards claimed!`} actionStatus={status} variant={variant}>
        <UpDownMarker token={action.rewardToken} value={action.rewardAmount} direction="up" />
      </ActionRow.Description>

      <ActionRow.ErrorWarning variant={variant} actionHandlerState={actionHandlerState} />

      <ActionRow.Action onAction={onAction} status={status} action={action}>
        <Trans>Claim</Trans>
      </ActionRow.Action>
    </ActionRow>
  )
}
