import { type LoanEventData, type Point } from 'indexer/model'

export type LoanPoint = Point & {
  data: LoanEventData
}

export const getWalletsWithPoints = ({
  ignoreAddress,
  loanEventData,
}: {
  ignoreAddress?: string
  loanEventData: Array<LoanEventData>
}) => {
  const uniqueWalletsSet = new Set<string>([
    ...loanEventData.flatMap(({ borrower }) => borrower),
    ...loanEventData.flatMap(({ lender }) => lender),
  ])
  if (ignoreAddress) {
    uniqueWalletsSet.delete(ignoreAddress)
  }
  return Array.from(uniqueWalletsSet).map((walletAddress) => {
    const walletPoints = loanEventData.filter(
      ({ borrower, lender }) => borrower === walletAddress || lender === walletAddress,
    )
    const totalPoints = walletPoints.reduce((sum, { points }) => sum + (points || 0n), 0n)
    return { totalPoints, walletAddress }
  })
}
