import { ETHER_DECIMALS, numberToBigInt } from 'common'
import { describe, expect, it } from 'vitest'

import { calculateTotalOffChainPointsPerWallet } from '@/app/api/cron/leaderboard/_/calculateTotalOffChainPointsPerWallet'

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

describe('calculateTotalOffChainPointsPerWallet', () => {
  it('handles if address has one offchain point entry and sets total', () => {
    const input = [
      {
        address: EXAMPLE_ADDRESS1,
        points: POINTS_100,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    expect(calculateTotalOffChainPointsPerWallet(input)).toEqual(expectedOutput)
  })
  it('update offchain points if offchain points already exist for address', () => {
    const input = [
      {
        address: EXAMPLE_ADDRESS1,
        points: POINTS_100,
      },
      {
        address: EXAMPLE_ADDRESS1,
        points: POINTS_100,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS1,
      },
    ]
    expect(calculateTotalOffChainPointsPerWallet(input)).toEqual(expectedOutput)
  })
  it('handles multiple wallet addresses', () => {
    const input = [
      {
        address: EXAMPLE_ADDRESS1,
        points: POINTS_100,
      },
      {
        address: EXAMPLE_ADDRESS2,
        points: POINTS_200,
      },
    ]
    const expectedOutput = [
      {
        totalPoints: POINTS_100,
        walletAddress: EXAMPLE_ADDRESS1,
      },
      {
        totalPoints: POINTS_200,
        walletAddress: EXAMPLE_ADDRESS2,
      },
    ]
    expect(calculateTotalOffChainPointsPerWallet(input)).toEqual(expectedOutput)
  })
})
