import { describe, expect, it } from 'vitest'

import { getERC20TokenBySymbol } from 'assets'
import { ETHER_DECIMALS, getNowInSeconds, numberToBigInt } from 'common'
import { base } from 'viem/chains'

import {
  BASE_USDC,
  BASE_WETH,
  USDC_EXPECTED_POINTS,
  WETH_EXPECTED_POINTS,
  baseDenominatorUSDC,
  baseDenominatorWETH,
  start,
  usdValueWETH,
} from '../constants/test-constants'
import { calculatePointsForPoint, getPoints, getTokenAmount } from './calculatePointsForPoint'

const duration = 1000n
const BASE_DEGEN = getERC20TokenBySymbol({
  chainId: base.id,
  symbol: 'DEGEN',
})
const usdValueDEGEN = 0.003585
const usdValueExpensive = usdValueWETH * 2
const baseDenominatorDEGEN = usdValueWETH / usdValueDEGEN
const baseDenominatorExpensive = usdValueWETH / usdValueExpensive
const pointDEGEN = {
  amount: numberToBigInt({
    amount: 1000,
    decimals: BASE_DEGEN.decimals,
  }),
  baseDenominator: baseDenominatorDEGEN,
  decimals: BASE_DEGEN.decimals,
  start,
}
const pointUSDC = {
  amount: numberToBigInt({
    amount: 1000,
    decimals: BASE_USDC.decimals,
  }),
  baseDenominator: baseDenominatorUSDC,
  decimals: BASE_USDC.decimals,
  start,
}
const pointWETH = {
  amount: numberToBigInt({
    amount: 1,
    decimals: BASE_WETH.decimals,
  }),
  baseDenominator: baseDenominatorWETH,
  decimals: BASE_WETH.decimals,
  start,
}
const pointExpensive = {
  amount: numberToBigInt({
    amount: 1,
    decimals: 18,
  }),
  baseDenominator: baseDenominatorExpensive,
  decimals: 18,
  start,
}

const WETH_EXPECTED_GET_POINTS = 3.858

describe('calculatePointsForPoint', () => {
  describe('getTokenAmount', () => {
    it('should handle DEGEN', () => {
      const result = getTokenAmount({ point: pointDEGEN })

      expect(result).toBe(
        numberToBigInt({
          amount: 0.000896250089625008,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle USDC', () => {
      const result = getTokenAmount({ point: pointUSDC })

      expect(result).toBe(
        numberToBigInt({
          amount: 0.25,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle WETH', () => {
      const result = getTokenAmount({ point: pointWETH })

      expect(result).toBe(
        numberToBigInt({
          amount: 1,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle Expensive', () => {
      const result = getTokenAmount({ point: pointExpensive })
      expect(result).toBe(
        numberToBigInt({
          amount: 2,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
  })

  describe('getPoints', () => {
    it('should handle DEGEN', () => {
      const result = getPoints({
        duration,
        tokenAmount: numberToBigInt({
          amount: 0.000896250089625008,
          decimals: ETHER_DECIMALS,
        }),
      })

      expect(result).toBe(
        numberToBigInt({
          amount: 0.00345773284577328,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle USDC', () => {
      const result = getPoints({
        duration,
        tokenAmount: numberToBigInt({
          amount: 0.25,
          decimals: ETHER_DECIMALS,
        }),
      })

      expect(result).toBe(
        numberToBigInt({
          amount: 0.9645,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle WETH', () => {
      const result = getPoints({
        duration,
        tokenAmount: numberToBigInt({
          amount: 1,
          decimals: ETHER_DECIMALS,
        }),
      })

      expect(result).toBe(
        numberToBigInt({
          amount: WETH_EXPECTED_GET_POINTS,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle Expensive', () => {
      const result = getPoints({
        duration,
        tokenAmount: numberToBigInt({
          amount: 2,
          decimals: ETHER_DECIMALS,
        }),
      })

      expect(result).toBe(
        numberToBigInt({
          amount: WETH_EXPECTED_GET_POINTS * 2,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
  })

  describe('calculatePointsForPoint', () => {
    it('should handle DEGEN', () => {
      const result = calculatePointsForPoint({
        point: pointDEGEN,
        startTime: getNowInSeconds(),
      })

      expect(result).toBe(
        numberToBigInt({
          amount: 0.000207463970746396,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle USDC', () => {
      const result = calculatePointsForPoint({
        point: pointUSDC,
        startTime: getNowInSeconds(),
      })

      expect(result).toBe(
        numberToBigInt({
          amount: USDC_EXPECTED_POINTS,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle WETH', () => {
      const result = calculatePointsForPoint({
        point: pointWETH,
        startTime: getNowInSeconds(),
      })

      expect(result).toBe(
        numberToBigInt({
          amount: WETH_EXPECTED_POINTS,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('should handle Expensive', () => {
      const result = calculatePointsForPoint({
        point: pointExpensive,
        startTime: getNowInSeconds(),
      })
      expect(result).toBe(
        numberToBigInt({
          amount: WETH_EXPECTED_POINTS * 2,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
  })
})
