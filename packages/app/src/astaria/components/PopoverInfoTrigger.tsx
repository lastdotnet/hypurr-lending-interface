import { IconInfoCircle } from '@tabler/icons-react'

import { Button } from '@/astaria/components/Button'
import { PopoverTrigger } from '@/astaria/components/Popover'

export const PopoverInfoTrigger = () => (
  <PopoverTrigger asChild>
    <Button aria-label="Info" className="align-middle" emphasis="low" size="icon-xs">
      <IconInfoCircle className="inline h-5 w-5" />
    </Button>
  </PopoverTrigger>
)
