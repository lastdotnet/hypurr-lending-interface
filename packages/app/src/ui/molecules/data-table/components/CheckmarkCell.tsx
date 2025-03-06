import { cn } from '@/ui/utils/style'
import { CheckIcon } from 'lucide-react'
import { MobileViewOptions } from '../types'
import { Typography } from '@/ui/atoms/typography/Typography'

interface CheckmarkCellWrapperProps {
  usageAsCollateralEnabled: boolean
  mobileViewOptions?: MobileViewOptions
}

export function CheckmarkCell({ usageAsCollateralEnabled, mobileViewOptions }: CheckmarkCellWrapperProps) {
  return (
    <div className="flex justify-end">
      {!mobileViewOptions?.showOnMobile && (
        <Typography variant="prompt" className="w-full">
          {mobileViewOptions?.rowTitle}
        </Typography>
      )}

      <CheckIcon
        className={cn('h-4 w-4 text-white/35', {
          'text-primary': usageAsCollateralEnabled,
        })}
      />
    </div>
  )
}
