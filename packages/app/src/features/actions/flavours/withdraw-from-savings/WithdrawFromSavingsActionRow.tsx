import { ActionRow } from '@/features/actions/components/action-row/ActionRow'
import { UpDownMarker } from '@/features/actions/components/action-row/UpDownMarker'
import { ActionRowBaseProps } from '@/features/actions/components/action-row/types'
import { assets, getTokenImage } from '@/ui/assets'
import { IconStack } from '@/ui/molecules/icon-stack/IconStack'
import { WithdrawFromSavingsAction } from './types'
import { Trans, useLingui } from '@lingui/react/macro'

export interface WithdrawFromSavingsActionRowProps extends ActionRowBaseProps {
  action: WithdrawFromSavingsAction
}

export function WithdrawFromSavingsActionRow({
  action,
  index,
  actionHandlerState,
  onAction,
  variant,
}: WithdrawFromSavingsActionRowProps) {
  const { t } = useLingui()
  const { savingsToken, token, amount, mode } = action
  const tokenIconPaths = [getTokenImage(savingsToken.symbol), getTokenImage(token.symbol)]
  const status = actionHandlerState.status
  const successMessage = `${t`Converted`}${mode === 'send' ? t` and sent` : ''} ${savingsToken.format(amount, { style: 'auto' })} ${token.symbol}!`

  return (
    <ActionRow index={index}>
      <ActionRow.Icon path={assets.actions.exchange} actionStatus={status} />

      <ActionRow.Title icon={<IconStack paths={tokenIconPaths} stackingOrder="last-on-top" />} actionStatus={status}>
        <Trans>
          Convert {savingsToken.symbol} to {token.symbol}
        </Trans>
        {mode === 'send' ? t` and send` : ''}
      </ActionRow.Title>

      <ActionRow.Description successMessage={successMessage} actionStatus={status} variant={variant}>
        <UpDownMarker token={token} value={amount} direction="up" />
      </ActionRow.Description>

      <ActionRow.ErrorWarning variant={variant} actionHandlerState={actionHandlerState} />

      <ActionRow.Action onAction={onAction} status={status} action={action}>
        {mode === 'send' ? t`Send` : t`Convert`}
      </ActionRow.Action>
    </ActionRow>
  )
}
