import { formatPercentage } from '@/domain/common/format'
import { Percentage } from '@/domain/types/NumericValues'
import { Typography } from '@/ui/atoms/typography/Typography'

import { MobileViewOptions } from '../types'
import { cn } from '@/ui/utils/style'

interface PercentageCellProps {
  value: Percentage | undefined
  mobileViewOptions?: MobileViewOptions
}

export function PercentageCell({ value, mobileViewOptions }: PercentageCellProps) {
  if (mobileViewOptions?.isMobileView) {
    return (
      <div
        className={cn(
          'flex flex-row items-center',
          mobileViewOptions.showOnMobile ? 'justify-center' : 'justify-between',
        )}
      >
        {!mobileViewOptions.showOnMobile && <Typography variant="prompt">{mobileViewOptions.rowTitle}</Typography>}
        <div>{formatPercentage(value)}</div>
      </div>
    )
  }

  return <div className="flex w-full justify-end">{formatPercentage(value)} </div>
}
