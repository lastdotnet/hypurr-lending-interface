import { PERCENT_DECIMAL_PLACES } from '../../constants'
import { addDecimals, removeDecimals } from './addOrRemoveDecimals'

// Remove 2 digits (decimal places) so 5% is 0.05 for example
export const bigintToPercent = (amount: bigint) => removeDecimals({ decimals: PERCENT_DECIMAL_PLACES, value: amount })
// Add 2 digits (decimal places) so 0.05 is 5 for example
export const percentToBigint = (amount: bigint) => addDecimals({ decimals: PERCENT_DECIMAL_PLACES, value: amount })
