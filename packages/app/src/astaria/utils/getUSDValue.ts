import { formatUnits } from 'viem'

import { ETHER_DECIMALS, numberToBigInt } from 'common'

export const getUSDValue = ({
  amount = 0n,
  decimals,
  usdValue,
}: {
  amount: bigint | undefined
  decimals: number
  usdValue?: number | null
}) => {
  if (!usdValue) {
    return undefined
  }

  const usdValueBigInt = numberToBigInt({
    amount: usdValue,
    decimals: ETHER_DECIMALS,
  })

  const totalValue = amount * usdValueBigInt

  return Number(formatUnits(totalValue, decimals + ETHER_DECIMALS))
}
