import { addDecimals, removeDecimals } from 'common'

import { POINTS_DECIMALS, POINT_AMOUNT } from '../constants'

export const getTokenAmount = ({
  point,
}: {
  point: {
    amount: bigint
    baseDenominator: number
    decimals: number
  }
}) => {
  const pointAmount = addDecimals({
    decimals: POINTS_DECIMALS - point.decimals,
    value: point.amount,
  })
  if (point.baseDenominator >= 1) {
    // If baseDenominator is greater than or equal to 1, use Math.floor
    return pointAmount / BigInt(Math.floor(point.baseDenominator))
  }
  // If baseDenominator is between 0 and 1, multiply by the reciprocal
  return pointAmount * BigInt(Math.floor(1 / point.baseDenominator))
}

export const getPoints = ({
  duration,
  tokenAmount,
}: {
  duration: bigint
  tokenAmount: bigint
}) =>
  removeDecimals({
    decimals: POINTS_DECIMALS,
    value: duration * tokenAmount * POINT_AMOUNT,
  })

export const calculatePointsForPoint = ({
  point,
  startTime,
}: {
  point: {
    amount: bigint
    baseDenominator: number
    decimals: number
    start: bigint
  }
  startTime: number
}) => {
  const duration = BigInt(startTime) - point.start
  const tokenAmount = getTokenAmount({ point })
  return getPoints({ duration, tokenAmount })
}
