import { parseUnits } from 'viem'

import { ETHER_DECIMALS } from '../../constants'
import { formatNumber } from '../formatNumber'

export const numberToBigInt = ({
  amount,
  decimals = ETHER_DECIMALS,
}: {
  amount: number
  decimals?: number
}) =>
  parseUnits(
    formatNumber({
      amount,
      maxDecimals: ETHER_DECIMALS,
      useGrouping: false,
    }),
    decimals,
  )
