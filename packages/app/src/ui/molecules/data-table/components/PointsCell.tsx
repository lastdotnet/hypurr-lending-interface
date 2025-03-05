import { cn } from '@/ui/utils/style'
import { MobileViewOptions } from '../types'
import { Typography } from '@/ui/atoms/typography/Typography'

interface PointsCellWrapperProps {
  points: number
  mobileViewOptions?: MobileViewOptions
  className?: string
  gradient?: boolean
}

export function PointsCell({ points, mobileViewOptions, className, gradient }: PointsCellWrapperProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {!mobileViewOptions?.showOnMobile && mobileViewOptions?.isMobileView && (
        <Typography variant="prompt">{mobileViewOptions?.rowTitle}</Typography>
      )}
      <Typography gradient={gradient} className={cn('text-sm', gradient && 'font-bold')}>
        {points}
      </Typography>
    </div>
  )
}
