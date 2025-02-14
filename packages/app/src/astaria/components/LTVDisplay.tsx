import { numberToPercent } from 'common'

import { Percent } from '@/astaria/components/Percent'
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverWarningTrigger } from '@/astaria/components/PopoverWarningTrigger'
import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { HIGH_LTV } from '@/astaria/constants/constants'

export const LTVDisplay = ({
  className,
  conciseDisplay,
  decimals,
  ltv,
  showHighLTVWarning,
  skeleton,
  ...rest
}: {
  className?: string
  conciseDisplay?: boolean
  decimals: number
  ltv: number | null | undefined
  showHighLTVWarning?: boolean
  skeleton?: boolean
}) => {
  if (skeleton) {
    return <SkeletonNumber className={className} />
  }

  if (ltv === null || ltv === undefined) {
    return '?'
  }

  const ltvPercent = (
    <Percent
      {...rest}
      className={className}
      conciseDisplay={conciseDisplay}
      decimals={decimals}
      percent={numberToPercent(ltv || 0)}
    />
  )

  if (ltv > HIGH_LTV && showHighLTVWarning) {
    return (
      <>
        {ltvPercent}
        <Popover>
          <PopoverWarningTrigger />
          <PopoverContent>
            An LTV over {HIGH_LTV}% is undercollateralized. We recommend you recall this loan.
          </PopoverContent>
        </Popover>
      </>
    )
  }

  return ltvPercent
}
