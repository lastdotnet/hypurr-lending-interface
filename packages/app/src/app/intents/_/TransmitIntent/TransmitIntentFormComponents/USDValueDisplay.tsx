import { formatNumber } from 'common'

import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'

const USD_DECIMALS = 2
const MINIMUM_USD = 0.01

const getDisplayValue = ({
  standardDecimals,
  usdValue,
  useDashForZero,
}: {
  standardDecimals?: boolean
  usdValue: number | undefined
  useDashForZero?: boolean
}) => {
  if (usdValue === undefined) {
    return '$?'
  }

  if (usdValue === 0) {
    return '$0'
  }

  if (usdValue < MINIMUM_USD) {
    return `<$${MINIMUM_USD}`
  }

  return `$${formatNumber({ amount: usdValue, maxDecimals: USD_DECIMALS, standardDecimals, useDashForZero })}`
}

export const USDValueDisplay = ({
  className,
  skeleton,
  standardDecimals,
  suppressHydrationWarning,
  usdValue,
  useDashForZero,
}: {
  className?: string
  skeleton?: boolean
  standardDecimals?: boolean
  suppressHydrationWarning?: boolean
  usdValue: number | undefined
  useDashForZero?: boolean
}) => {
  if (skeleton) {
    return (
      <div className={className} suppressHydrationWarning={suppressHydrationWarning}>
        $<SkeletonNumber />
      </div>
    )
  }

  return (
    <div className={className} suppressHydrationWarning={suppressHydrationWarning}>
      {getDisplayValue({
        standardDecimals,
        usdValue,
        useDashForZero,
      })}
    </div>
  )
}
