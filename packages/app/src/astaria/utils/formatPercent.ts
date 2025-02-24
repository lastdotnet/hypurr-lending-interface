import { PERCENT_DECIMAL_PLACES, formatNumber, percentToNumber, toNormalizedValue } from 'common'

const VERY_SMALL_NUMBER = 0.0001
const VERY_SMALL_NUMBER_CONCISE = 0.01

export const formatPercent = ({
  conciseDisplay,
  decimals,
  percent,
  standardDecimals,
  useDashForZero,
}: {
  conciseDisplay?: boolean
  decimals?: number
  percent: bigint | number
  standardDecimals?: boolean
  useDashForZero?: boolean
}): {
  content: string
  trigger: string
} => {
  const numberValue = typeof percent === 'bigint' && decimals ? toNormalizedValue(percent, decimals) : Number(percent)

  if (numberValue > 0) {
    if (conciseDisplay && numberValue < VERY_SMALL_NUMBER_CONCISE) {
      const trigger = '<1%'
      return {
        content: trigger,
        trigger,
      }
    }
    if (numberValue < VERY_SMALL_NUMBER) {
      const trigger = '<0.01%'
      return {
        content: trigger,
        trigger,
      }
    }
  }

  const baseFormat = {
    amount: percentToNumber(numberValue),
    maxDecimals: PERCENT_DECIMAL_PLACES,
    standardDecimals,
    useDashForZero,
  }

  const contentPercent = formatNumber(baseFormat)

  const triggerPercent = conciseDisplay
    ? formatNumber({
        ...baseFormat,
        maxDecimals: 0,
        useDashForZero,
      })
    : contentPercent

  return {
    content: `${contentPercent}%`,
    trigger: `${triggerPercent}%`,
  }
}
