import { ETHER_DECIMALS, numberToBigInt } from 'common'
import { describe, expect, it } from 'vitest'

import { combineTotalPoints } from '@/app/api/cron/leaderboard/_/combineTotalPoints'

const EXAMPLE_ADDRESS1 = '0x3ff777d0c554869ce75d68562bb029f93f8cca14'
const EXAMPLE_ADDRESS2 = '0x170d612d9899774b3ecf578d8a63f8c941d0a883'

const POINTS_100 = numberToBigInt({
  amount: 100,
  decimals: ETHER_DECIMALS,
})

const POINTS_200 = numberToBigInt({
  amount: 200,
  decimals: ETHER_DECIMALS,
})

const POINTS_0 = numberToBigInt({
  amount: 0,
  decimals: ETHER_DECIMALS,
})

describe('combineTotalPoints', () => {
  it('combines offchain and onchain points from different wallets', () => {
    const offChainPoints = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const onChainPoints = [
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS2,
      },
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS1,
      },
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS2,
      },
    ]
    expect(combineTotalPoints(offChainPoints, onChainPoints)).toEqual(expectedOutput)
  })

  it('combines offchain and onchain points from the same wallet', () => {
    const offChainPoints = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const onChainPoints = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    expect(combineTotalPoints(offChainPoints, onChainPoints)).toEqual(expectedOutput)
  })

  it('handles wallets with zero points', () => {
    const offChainPoints = [
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const onChainPoints = [
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS2,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS2,
      },
    ]
    expect(combineTotalPoints(offChainPoints, onChainPoints)).toEqual(expectedOutput)
  })

  it('handles wallets with zero off-chain points but some value of on-chain points', () => {
    const offChainPoints = [
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const onChainPoints = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    expect(combineTotalPoints(offChainPoints, onChainPoints)).toEqual(expectedOutput)
  })
  it('handles wallets with zero on-chain points but some value of off-chain points', () => {
    const offChainPoints = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const onChainPoints = [
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    expect(combineTotalPoints(offChainPoints, onChainPoints)).toEqual(expectedOutput)
  })
})
