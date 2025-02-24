import { assets } from '@/ui/assets'
import { TokenIcon } from '@/ui/atoms/token-icon/TokenIcon'
import { ActionRow } from '../../components/action-row/ActionRow'
import { ActionRowBaseProps } from '../../components/action-row/types'
import { getFormattedValue } from '../../components/action-row/utils'
import { ApproveAction } from './types'
import { Trans } from '@lingui/react/macro'
export interface ApproveActionRowProps extends ActionRowBaseProps {
  action: ApproveAction
}

export function ApproveActionRow({ index, action, variant, actionHandlerState, onAction }: ApproveActionRowProps) {
  const status = actionHandlerState.status
  const formattedValue = getFormattedValue(action.value, action.token, variant)
  const successMessage = `Approved for ${formattedValue}!`

  return (
    <ActionRow index={index}>
      <ActionRow.Icon path={assets.actions.approve} actionStatus={status} />

      <ActionRow.Title icon={<TokenIcon token={action.token} className="h-6" />} actionStatus={status}>
        <Trans>Approve</Trans> {formattedValue}
      </ActionRow.Title>

      <ActionRow.Description successMessage={successMessage} actionStatus={status} variant={variant} />

      <ActionRow.ErrorWarning variant={variant} actionHandlerState={actionHandlerState} />

      <ActionRow.Action onAction={onAction} status={status} action={action}>
        <Trans>Approve</Trans>
      </ActionRow.Action>
    </ActionRow>
  )
}
