'use client'

import { useLocalStorage } from 'usehooks-ts'

import { Label } from '@/astaria/components/Label'
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverInfoTrigger } from '@/astaria/components/PopoverInfoTrigger'
import { Switch } from '@/astaria/components/Switch'

export const ExpertMode = () => {
  const [isExpertMode, setIsExpertMode] = useLocalStorage('isExpertMode', false, { initializeWithValue: false })

  return (
    <Label above={false} className="inline-flex items-center gap-2">
      <span>
        <span className="font-medium">Expert mode</span>{' '}
        <Popover>
          <PopoverInfoTrigger />
          <PopoverContent>
            Expert mode allows you to fill loans for unverified tokens and collections. Always make sure to confirm the
            token or collection’s address before filling a loan.
          </PopoverContent>
        </Popover>
      </span>

      <Switch checked={isExpertMode} onCheckedChange={(checked) => setIsExpertMode(checked === true)} />
    </Label>
  )
}
