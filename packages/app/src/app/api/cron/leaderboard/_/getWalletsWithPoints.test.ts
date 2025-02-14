import { ETHER_DECIMALS, numberToBigInt } from 'common'
import { describe, expect, it } from 'vitest'

import { getWalletsWithPoints } from '@/app/api/cron/leaderboard/_/getWalletsWithPoints'

import { type LoanEventData } from 'indexer/model'

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

const POINTS_0 = numberToBigInt({ amount: 0, decimals: ETHER_DECIMALS } || undefined)

describe('getWalletsWithPoints', () => {
  it('gets total on-chain points for each unique address', () => {
    const loanEventData = [
      {
        borrower: EXAMPLE_ADDRESS1,
        lender: EXAMPLE_ADDRESS2,
        points: POINTS_100,
      },
      {
        borrower: EXAMPLE_ADDRESS1,
        lender: EXAMPLE_ADDRESS3,
        points: POINTS_200,
      },
    ] as Array<Partial<LoanEventData>> as Array<LoanEventData>

    const expectedOutput = [
      {
        totalPoints: POINTS_300,
        walletAddress: EXAMPLE_ADDRESS1,
      },
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS2,
      },
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS3,
      },
    ]

    expect(getWalletsWithPoints({ loanEventData })).toEqual(expectedOutput)
  })
  it('handles loan events with zero points', () => {
    const loanEventData = [
      {
        borrower: EXAMPLE_ADDRESS1,
        lender: EXAMPLE_ADDRESS2,
        points: POINTS_0,
      },
      {
        borrower: EXAMPLE_ADDRESS1,
        lender: EXAMPLE_ADDRESS3,
        points: POINTS_0,
      },
    ] as Array<Partial<LoanEventData>> as Array<LoanEventData>

    const expectedOutput = [
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS1,
      },
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS2,
      },
      {
        totalPoints: POINTS_0,
        walletAddress: EXAMPLE_ADDRESS3,
      },
    ]

    expect(getWalletsWithPoints({ loanEventData })).toEqual(expectedOutput)
  })
})
