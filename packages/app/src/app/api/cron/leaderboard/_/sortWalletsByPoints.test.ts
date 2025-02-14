import { ETHER_DECIMALS, numberToBigInt } from 'common'
import { describe, expect, it } from 'vitest'

import { sortWalletByPoints } from '@/app/api/cron/leaderboard/_/sortWalletsByPoints'

const EXAMPLE_ADDRESS1 = '0x3ff777d0c554869ce75d68562bb029f93f8cca14'
const EXAMPLE_ADDRESS2 = '0x170d612d9899774b3ecf578d8a63f8c941d0a883'
const EXAMPLE_ADDRESS3 = '0xf1e7dbedd9e06447e2f99b1310c09287b734addc'

const POINTS_100 = numberToBigInt({
  amount: 100,
  decimals: ETHER_DECIMALS,
})

const POINTS_200 = numberToBigInt({
  amount: 200,
  decimals: ETHER_DECIMALS,
})

const POINTS_300 = numberToBigInt({
  amount: 300,
  decimals: ETHER_DECIMALS,
})

describe('sortWalletByPoints', () => {
  it('sorts wallet by points and assigns ranks', () => {
    const resultList = [
      {
        totalPoints: POINTS_300,
        walletAddress: EXAMPLE_ADDRESS1,
      },
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS2,
      },
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS3,
      },
    ]

    const expectedOutput = [
      {
        id: EXAMPLE_ADDRESS1,
        points: POINTS_300,
        rank: 1,
      },
      {
        id: EXAMPLE_ADDRESS2,
        points: POINTS_200,
        rank: 2,
      },
      {
        id: EXAMPLE_ADDRESS3,
        points: POINTS_100,
        rank: 3,
      },
    ]

    expect(sortWalletByPoints(resultList)).toEqual(expectedOutput)
  })
})
