import { MobileViewOptions } from '../types'
import { Typography } from '@/ui/atoms/typography/Typography'

interface PointsCellWrapperProps {
  points: number
  mobileViewOptions?: MobileViewOptions
}

export function PointsCell({ points, mobileViewOptions }: PointsCellWrapperProps) {
  if (mobileViewOptions?.isMobileView) {
    return (
      <div className="flex items-center justify-between">
        {!mobileViewOptions?.showOnMobile && mobileViewOptions?.isMobileView && (
          <Typography variant="prompt" className="w-fulls">
            {mobileViewOptions?.rowTitle}
          </Typography>
        )}
        <Typography>{points}</Typography>
      </div>
    )
  }

  return <Typography>{points}</Typography>
}
