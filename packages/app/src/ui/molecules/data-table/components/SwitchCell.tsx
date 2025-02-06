import { MouseEventHandler } from 'react'

import { Switch } from '@/ui/atoms/switch/Switch'
import { Typography } from '@/ui/atoms/typography/Typography'

import { MobileViewOptions } from '../types'

interface SwitchCellProps {
  checked: boolean
  mobileViewOptions?: MobileViewOptions
  onSwitchClick: MouseEventHandler<HTMLButtonElement>
}

export function SwitchCell({ checked, onSwitchClick, mobileViewOptions }: SwitchCellProps) {
  if (mobileViewOptions?.isMobileView) {
    return (
      <div className="flex flex-row items-center justify-between">
        {!mobileViewOptions?.showOnMobile && <Typography variant="prompt">{mobileViewOptions.rowTitle}</Typography>}
        <Switch checked={checked} onClick={onSwitchClick} />
      </div>
    )
  }

  return (
    <div className="flex w-full justify-end">
      <Switch checked={checked} onClick={onSwitchClick} />
    </div>
  )
}
