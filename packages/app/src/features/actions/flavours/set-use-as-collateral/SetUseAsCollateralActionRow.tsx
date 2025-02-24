import { assets } from '@/ui/assets'
import { TokenIcon } from '@/ui/atoms/token-icon/TokenIcon'

import { ActionRow } from '../../components/action-row/ActionRow'
import { ActionRowBaseProps } from '../../components/action-row/types'
import { SetUseAsCollateralAction } from './types'
import { Trans, useLingui } from '@lingui/react/macro'

export interface SetUseAsCollateralActionRowProps extends ActionRowBaseProps {
  action: SetUseAsCollateralAction
}

export function SetUseAsCollateralActionRow({
  index,
  action,
  actionHandlerState,
  onAction,
  variant,
}: SetUseAsCollateralActionRowProps) {
  const { t } = useLingui()
  const useAsCollateral = action.useAsCollateral
  const status = actionHandlerState.status
  const actionTitle = useAsCollateral ? t`Enable` : t`Disable`
  const successMessage = `${useAsCollateral ? t`Enabled` : t`Disabled`} ${action.token.symbol} ${t`as collateral`}`

  return (
    <ActionRow index={index}>
      <ActionRow.Icon path={assets.actions.approve} actionStatus={status} />

      <ActionRow.Title icon={<TokenIcon token={action.token} className="h-6" />} actionStatus={status}>
        {actionTitle} {action.token.symbol} <Trans>as collateral</Trans>
      </ActionRow.Title>

      <ActionRow.Description successMessage={successMessage} actionStatus={status} variant={variant} />

      <ActionRow.ErrorWarning variant={variant} actionHandlerState={actionHandlerState} />

      <ActionRow.Action onAction={onAction} status={status} action={action}>
        {actionTitle}
      </ActionRow.Action>
    </ActionRow>
  )
}
