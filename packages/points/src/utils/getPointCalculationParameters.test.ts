import { describe, expect, it } from 'vitest'

import { ETHER_DECIMALS, getNowInSeconds, numberToBigInt, removeDecimals } from 'common'

import { POINTS_DECIMALS, POINT_AMOUNT } from '../constants'
import {
  BASE_USDC,
  BASE_WETH,
  USDC_EXPECTED_POINTS,
  WETH_EXPECTED_POINTS,
  baseDenominatorUSDC,
  baseDenominatorWETH,
  start,
} from '../constants/test-constants'
import { calculatePoints } from './calculatePoints'
import { getPointCalculationParameters } from './getPointCalculationParameters'

const dynamicPointUSDC = {
  address: BASE_USDC.address,
  data: {
    amount: numberToBigInt({
      amount: 1000,
      decimals: BASE_USDC.decimals,
    }),
    baseDenominator: baseDenominatorUSDC,
    decimals: BASE_USDC.decimals,
    points: undefined,
    start,
  },
  event: 'Loan',
  isDynamic: true,
}
const dynamicPointWETH = {
  address: BASE_WETH.address,
  data: {
    amount: numberToBigInt({
      amount: 1,
      decimals: BASE_WETH.decimals,
    }),
    baseDenominator: baseDenominatorWETH,
    decimals: BASE_WETH.decimals,
    points: undefined,
    start,
  },
  event: 'Loan',
  isDynamic: true,
}

const dynamicPointWETHClosedLoan = {
  address: BASE_WETH.address,
  data: {
    amount: numberToBigInt({
      amount: 10,
      decimals: BASE_WETH.decimals,
    }),
    baseDenominator: baseDenominatorWETH,
    decimals: BASE_WETH.decimals,
    points: numberToBigInt({
      amount: 10,
      decimals: ETHER_DECIMALS,
    }),
    start,
  },
  event: 'Loan',
  isDynamic: true,
}

const nonDynamicPointWETH = {
  address: BASE_WETH.address,
  data: {
    amount: numberToBigInt({
      amount: 10,
      decimals: BASE_WETH.decimals,
    }),
    baseDenominator: baseDenominatorWETH,
    decimals: BASE_WETH.decimals,
    points: numberToBigInt({
      amount: 100,
      decimals: ETHER_DECIMALS,
    }),
    start,
  },
  event: 'CheckedIntentFeed',
  isDynamic: false,
}

describe('getPointCalculationParameters', () => {
  describe('dynamic points', () => {
    it('should handle USDC same as in calculatePointsForPoint', () => {
      const startTime = getNowInSeconds()
      const result = getPointCalculationParameters({
        points: [dynamicPointUSDC],
        startTime,
      })
      expect(result).toStrictEqual({
        startPoints: numberToBigInt({
          amount: USDC_EXPECTED_POINTS,
          decimals: ETHER_DECIMALS,
        }),
        startTime,
        totalActiveLoanTokenAmount: numberToBigInt({
          amount: 0.25, // this value is equal to the one in calculatePointsForPoint.test
          decimals: ETHER_DECIMALS,
        }),
      })
    })
    it('should handle USDC plus WETH', () => {
      const startTime = getNowInSeconds()
      const result = getPointCalculationParameters({
        points: [dynamicPointUSDC, dynamicPointWETH],
        startTime,
      })
      expect(result).toStrictEqual({
        startPoints:
          numberToBigInt({
            amount: USDC_EXPECTED_POINTS,
            decimals: ETHER_DECIMALS,
          }) +
          numberToBigInt({
            amount: WETH_EXPECTED_POINTS,
            decimals: ETHER_DECIMALS,
          }),
        startTime,
        totalActiveLoanTokenAmount:
          numberToBigInt({
            amount: 0.25,
            decimals: ETHER_DECIMALS,
          }) +
          numberToBigInt({
            amount: 1,
            decimals: ETHER_DECIMALS,
          }), // these values are taken from calculatePointsForPoint.test
      })
    })
    it('should handle USDC plus closed WETH', () => {
      const startTime = getNowInSeconds()
      const result = getPointCalculationParameters({
        points: [dynamicPointUSDC, dynamicPointWETHClosedLoan],
        startTime,
      })
      expect(result).toStrictEqual({
        startPoints:
          numberToBigInt({
            amount: USDC_EXPECTED_POINTS,
            decimals: ETHER_DECIMALS,
          }) +
          numberToBigInt({
            amount: 10,
            decimals: ETHER_DECIMALS,
          }),
        startTime,
        totalActiveLoanTokenAmount: numberToBigInt({
          amount: 0.25,
          decimals: ETHER_DECIMALS,
        }),
      })
    })
  })
  describe('nonDynamic points', () => {
    it('should handle WETH', () => {
      const startTime = getNowInSeconds()
      const result = getPointCalculationParameters({
        points: [nonDynamicPointWETH],
        startTime,
      })
      expect(result).toStrictEqual({
        startPoints: numberToBigInt({
          amount: 100,
          decimals: BASE_WETH.decimals,
        }),
        startTime,
        totalActiveLoanTokenAmount: 0n,
      })
    })
  })
  describe('nonDynamic and dynamic points', () => {
    it('should handle both simultaneously', () => {
      const startTime = getNowInSeconds()
      const result = getPointCalculationParameters({
        points: [nonDynamicPointWETH, dynamicPointWETH],
        startTime,
      })
      expect(result.startPoints).toEqual(
        numberToBigInt({
          amount: 100,
          decimals: BASE_WETH.decimals,
        }) +
          numberToBigInt({
            amount: WETH_EXPECTED_POINTS,
            decimals: ETHER_DECIMALS,
          }),
      )
      expect(result.totalActiveLoanTokenAmount).toEqual(
        numberToBigInt({
          amount: 1,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
  })
  describe('calculatePoints function', () => {
    it('should calculate points correctly', () => {
      // Define inputs
      const totalActiveLoanTokenAmount = 10n
      const startTime = 50
      const endTime = 60
      const startPoints = 5n

      // Define expected output
      const expectedPoints =
        removeDecimals({
          decimals: POINTS_DECIMALS,
          value: BigInt(endTime - startTime) * totalActiveLoanTokenAmount * POINT_AMOUNT,
        }) + startPoints

      // Call the function
      const result = calculatePoints({
        endTime,
        startPoints,
        startTime,
        totalActiveLoanTokenAmount,
      })

      // Check if the result matches the expected output
      expect(result).toEqual(expectedPoints)
    })
  })
})
