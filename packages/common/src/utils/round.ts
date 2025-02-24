import { decimalsToMultiplierNumber } from './decimalsToMultiplierNumber'
import { divideNumber } from './divide'

// https://youmightnotneed.com/lodash#round
export const round = (num: number, precision: number) => {
  const modifier = decimalsToMultiplierNumber(precision)
  return divideNumber(Math.round(num * modifier), modifier)
}
export const floor = (num: number, precision: number) => {
  const modifier = decimalsToMultiplierNumber(precision)
  return divideNumber(Math.floor(num * modifier), modifier)
}
