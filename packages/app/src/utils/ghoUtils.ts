export const GHO_SYMBOL = 'GHO'
export const GHO_MINTING_MARKETS = [
  'proto_mainnet_v3',
  'fork_proto_mainnet_v3',
  'proto_sepolia_v3',
  'fork_proto_sepolia_v3',
]

export function displayGhoForMintableMarket({
  symbol,
  currentMarket,
}: {
  symbol: string
  currentMarket: string
}): boolean {
  return symbol === GHO_SYMBOL && GHO_MINTING_MARKETS.includes(currentMarket)
}

export function weightedAverageAPY(
  baseVariableBorrowRate: number,
  totalBorrowAmount: number,
  discountableAmount: number,
  borrowRateAfterDiscount: number,
): number {
  if (discountableAmount === 0) return baseVariableBorrowRate
  if (totalBorrowAmount <= discountableAmount) return borrowRateAfterDiscount

  const nonDiscountableAmount = totalBorrowAmount - discountableAmount

  return (
    (nonDiscountableAmount * baseVariableBorrowRate + discountableAmount * borrowRateAfterDiscount) / totalBorrowAmount
  )
}
