import { assets } from '@/ui/assets'

import { Button, ButtonProps } from '../../atoms/button/Button'
import { getEventNameByAction, trackEvent } from '@/utils/fathom'
import { ReactNode } from 'react'
import { Action } from '@/features/actions/logic/types'

export interface ActionButtonProps extends ButtonProps {
  isLoading?: boolean
  isDone?: boolean
  action: Action
}

export function ActionButton({ isLoading, isDone, action, children, ...props }: ActionButtonProps) {
  const disabled = props.disabled || isLoading

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (props.onClick) {
      trackEvent(getEventName(children, action))
      props.onClick(event)
    }
  }

  return (
    <Button {...props} disabled={disabled} onClick={handleClick}>
      {children}
      {isLoading && <img src={assets.threeDots} alt="loader" width={20} height={5} data-chromatic="ignore" />}
      {isDone && <span>✓</span>}
    </Button>
  )
}

function getEventName(children: ReactNode, action: Action) {
  const actionName = children?.toString().replace(/\s+/g, '_').toLowerCase() ?? 'unknown'
  const descriptor = getEventNameByAction(action)

  return `action_button_click_${actionName}_${descriptor}`
}
