import { PERCENT_DECIMAL_PLACES } from '../constants'
import { decimalsToMultiplierNumber } from './decimalsToMultiplierNumber'

// Remove 2 digits (decimal places) so 5% is 0.05 for example
export const numberToPercent = (amount: number) => amount / decimalsToMultiplierNumber(PERCENT_DECIMAL_PLACES)
// Add 2 digits (decimal places) so 0.05 is 5 for example
export const percentToNumber = (amount: number) => amount * decimalsToMultiplierNumber(PERCENT_DECIMAL_PLACES)
