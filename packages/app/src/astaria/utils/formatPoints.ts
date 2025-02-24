import { formatNumber, toNormalizedValue } from 'common'
import { POINTS_DECIMALS } from 'points'

const MAX_DIGITS = 4

const getShortVersion = (astrologicalUnits: number) => {
  const astrologicalUnitsLength = astrologicalUnits.toString().length

  let notation: Intl.NumberFormatOptions['notation'] = 'standard'

  if (astrologicalUnitsLength > MAX_DIGITS) {
    notation = 'compact'
  }
  return formatNumber({
    amount: astrologicalUnits,
    maxDecimals: 1,
    notation,
  })
}

export const formatPoints = (
  points: bigint,
): {
  content: string
  trigger: string
} => {
  const normalizedPoints = toNormalizedValue(points, POINTS_DECIMALS)
  const shortenedPoints = getShortVersion(normalizedPoints)

  return {
    content: formatNumber({ amount: normalizedPoints }),
    trigger: shortenedPoints,
  }
}
