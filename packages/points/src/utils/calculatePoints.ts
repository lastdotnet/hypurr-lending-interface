import { getNowInSeconds, removeDecimals } from 'common'

import { POINTS_DECIMALS, POINT_AMOUNT } from '../constants/constants'

export const calculatePoints = ({
  endTime = getNowInSeconds(),
  startPoints,
  startTime,
  totalActiveLoanTokenAmount,
}: {
  endTime?: number
  startPoints: bigint | undefined
  startTime: number | undefined
  totalActiveLoanTokenAmount: bigint | undefined
}) => {
  if (startPoints === undefined || startTime === undefined || totalActiveLoanTokenAmount === undefined) {
    return undefined
  }

  const duration = BigInt(endTime - startTime)
  return (
    removeDecimals({
      decimals: POINTS_DECIMALS,
      value: duration * totalActiveLoanTokenAmount * POINT_AMOUNT,
    }) + startPoints
  )
}
