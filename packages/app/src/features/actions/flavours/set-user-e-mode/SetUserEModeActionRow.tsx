import { assets } from '@/ui/assets'
import { ActionRow } from '../../components/action-row/ActionRow'
import { ActionRowBaseProps } from '../../components/action-row/types'
import { SetUserEModeAction } from './logic/types'
import { Trans, useLingui } from '@lingui/react/macro'
export interface SetUserEModeActionRowProps extends ActionRowBaseProps {
  action: SetUserEModeAction
}

export function SetUserEModeActionRow({
  index,
  action,
  actionHandlerState,
  onAction,
  variant,
}: SetUserEModeActionRowProps) {
  const { t } = useLingui()
  const status = actionHandlerState.status
  const eModeEnabled = action.eModeCategoryId !== 0
  const actionTitle = eModeEnabled ? t`Enable` : t`Disable`
  const successMessage = `${t`E-Mode`} ${eModeEnabled ? t`enabled` : t`disabled`}!`

  return (
    <ActionRow index={index}>
      <ActionRow.Icon path={assets.actions.approve} actionStatus={status} />

      <ActionRow.Title actionStatus={status}>
        {actionTitle} <Trans>E-Mode</Trans>
      </ActionRow.Title>

      <ActionRow.Description successMessage={successMessage} actionStatus={status} variant={variant} />

      <ActionRow.ErrorWarning variant={variant} actionHandlerState={actionHandlerState} />

      <ActionRow.Action onAction={onAction} status={status} action={action}>
        {actionTitle}
      </ActionRow.Action>
    </ActionRow>
  )
}
