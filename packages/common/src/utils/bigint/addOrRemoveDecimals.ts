import { pow } from './pow'

const PRECISION_MULTIPLIER = 10n
const PRECISION_MULTIPLIER_NUMBER = 10
const decimalsToMultiplier = (decimals: number) => pow({ base: PRECISION_MULTIPLIER, exponent: BigInt(decimals) })
const decimalsToMultiplierNumber = (decimals: number) => PRECISION_MULTIPLIER_NUMBER ** decimals

export const addDecimals = ({
  decimals,
  value,
}: {
  decimals: number
  value: bigint
}) => value * decimalsToMultiplier(decimals)

export const addDecimalsNumber = ({
  decimals,
  value,
}: {
  decimals: number
  value: number
}) => value * decimalsToMultiplierNumber(decimals)

export const removeDecimals = ({
  decimals,
  value,
}: {
  decimals: number
  value: bigint
}) => value / decimalsToMultiplier(decimals)

export const removeDecimalsNumber = ({
  decimals,
  value,
}: {
  decimals: number
  value: number
}) => value / decimalsToMultiplierNumber(decimals)

export const addOrRemoveDecimals = ({
  newDecimals,
  oldDecimals = 0,
  value,
}: {
  newDecimals: number
  oldDecimals?: number
  value: bigint | undefined
}) => {
  if (value === undefined) {
    return 0n
  }
  if (newDecimals > oldDecimals) {
    return addDecimals({ decimals: newDecimals - oldDecimals, value })
  }
  if (newDecimals < oldDecimals) {
    return removeDecimals({ decimals: oldDecimals - newDecimals, value })
  }
  return value
}
