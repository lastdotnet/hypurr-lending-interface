import { ActionRow } from '@/features/actions/components/action-row/ActionRow'
import { UpDownMarker } from '@/features/actions/components/action-row/UpDownMarker'
import { ActionRowBaseProps } from '@/features/actions/components/action-row/types'
import { assets, getTokenImage } from '@/ui/assets'
import { IconStack } from '@/ui/molecules/icon-stack/IconStack'
import { PsmConvertAction } from './types'

export interface PsmConvertActionRowProps extends ActionRowBaseProps {
  action: PsmConvertAction
}

export function PsmConvertActionRow({
  action,
  index,
  actionHandlerState,
  onAction,
  variant,
}: PsmConvertActionRowProps) {
  const { inToken, outToken } = action
  const tokenIconPaths = [getTokenImage(inToken.symbol), getTokenImage(outToken.symbol)]
  const status = actionHandlerState.status
  const successMessage = `Converted ${inToken.format(action.amount, { style: 'auto' })} ${inToken.symbol}!`

  return (
    <ActionRow index={index}>
      <ActionRow.Icon path={assets.actions.exchange} actionStatus={status} />

      <ActionRow.Title icon={<IconStack paths={tokenIconPaths} stackingOrder="last-on-top" />} actionStatus={status}>
        Convert {inToken.symbol} to {outToken.symbol}
      </ActionRow.Title>

      <ActionRow.Description successMessage={successMessage} actionStatus={status} variant={variant}>
        <UpDownMarker token={inToken} value={action.amount} direction="down" />
      </ActionRow.Description>

      <ActionRow.ErrorWarning variant={variant} actionHandlerState={actionHandlerState} />

      <ActionRow.Action onAction={onAction} status={status} action={action}>
        Convert
      </ActionRow.Action>
    </ActionRow>
  )
}
