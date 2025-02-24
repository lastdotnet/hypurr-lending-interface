import { ETHER_DECIMALS } from '../constants/constants'
import { addDecimals, expWad, multiply, removeDecimals } from './bigint'
import { getSecondsBigInt } from './date-time'

/**
 * @see https://github.com/AstariaXYZ/v1-core/blob/e7461290751eabf78bae4c75f6d3389d58795da8/src/lib/AstariaV1Lib.sol#L40
 */
export const calculateCompoundInterest = ({
  amount,
  apy,
  decimals,
  delta,
}: {
  amount: bigint
  apy: bigint
  decimals: number
  delta: bigint
}) => {
  if (decimals < ETHER_DECIMALS) {
    const decimalDifference = ETHER_DECIMALS - decimals
    const exponent =
      addDecimals({
        decimals: decimalDifference,
        value: apy * delta,
      }) / getSecondsBigInt({ days: 365 })
    const adjustedAmount = addDecimals({
      decimals: decimalDifference,
      value: amount,
    })
    const multiplied = multiply({
      a: adjustedAmount,
      b: expWad(exponent),
    })
    const result = multiplied - adjustedAmount

    return removeDecimals({ decimals: decimalDifference, value: result })
  }

  const exponent = (apy * delta) / getSecondsBigInt({ days: 365 })

  const multiplied = multiply({
    a: amount,
    b: expWad(exponent),
  })
  return multiplied - amount
}
