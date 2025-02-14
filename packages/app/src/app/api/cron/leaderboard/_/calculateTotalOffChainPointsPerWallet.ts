import { type WalletWithPoints } from '@/app/api/cron/leaderboard/route'

type OffChainPoint = {
  address: string
  points: bigint
}

export const calculateTotalOffChainPointsPerWallet = (otherPoints: OffChainPoint[]): WalletWithPoints[] => {
  const totalPointsMap = new Map()

  otherPoints.forEach((point) => {
    const walletAddress = point.address
    const points = point.points

    if (!totalPointsMap.has(walletAddress)) {
      totalPointsMap.set(walletAddress, points)
    } else {
      const updatedPoints = totalPointsMap.get(walletAddress) + points
      totalPointsMap.set(walletAddress, updatedPoints)
    }
  })

  const totalPointsArray = Array.from(totalPointsMap.entries()).map(([walletAddress, totalPoints]) => ({
    totalPoints,
    walletAddress,
  }))
  return totalPointsArray
}
