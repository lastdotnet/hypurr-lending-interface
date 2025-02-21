import { type WalletWithPoints } from '@/app/api/cron/leaderboard/route'

export const combineTotalPoints = (
  walletsWithOffChainPoints: WalletWithPoints[],
  walletsWithOnChainPoints: WalletWithPoints[],
): WalletWithPoints[] => {
  const combinedMap = new Map<string, bigint>()

  const addPointsToMap = (pointsArray: WalletWithPoints[], combinedMap: Map<string, bigint>) => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    pointsArray.forEach(({ totalPoints, walletAddress }) => {
      if (walletAddress !== undefined && combinedMap !== undefined) {
        const currentTotalPoints = combinedMap.get(walletAddress)
        if (currentTotalPoints !== undefined) {
          combinedMap.set(walletAddress, currentTotalPoints + totalPoints)
        } else {
          combinedMap.set(walletAddress, totalPoints)
        }
      }
    })
  }

  const onChainWalletsSet = new Set(walletsWithOnChainPoints.map((walletWithPoints) => walletWithPoints.walletAddress))
  // Include only wallets present in the on-chain points
  const filteredOffChainPoints = walletsWithOffChainPoints.filter((walletWithPoints) =>
    onChainWalletsSet.has(walletWithPoints.walletAddress),
  )
  addPointsToMap(filteredOffChainPoints, combinedMap)

  addPointsToMap(walletsWithOnChainPoints, combinedMap)

  const combinedTotalPointsArray = Array.from(combinedMap.entries()).map(([walletAddress, totalPoints]) => ({
    totalPoints,
    walletAddress,
  }))
  return combinedTotalPointsArray
}
