import {
  getMockAaveFormattedUserSummary,
  getMockAaveFormattedUserSummaryReserve,
  getMockUserReservesData,
  testAddresses,
} from '@/test/integration/constants'
import { calculateNetApy } from './calculateNetApy'

const whypeAddress = testAddresses.token
const usdcAddress = testAddresses.token2
const susdeAddress = testAddresses.token3
const solveBtcAddress = testAddresses.token4

describe('calculateNetApy', () => {
  //  Borrows
  const whypeReserve = getMockAaveFormattedUserSummaryReserve({
    symbol: 'WHYPE',
    variableBorrowAPY: '1.2034', // 120.34%
    underlyingAsset: whypeAddress,
  })
  const whypeUserReserve = getMockUserReservesData(whypeReserve, {
    scaledVariableDebt: '1',
    variableBorrowsUSD: '26.96',
    underlyingAsset: whypeAddress,
  })

  const susdeReserve = getMockAaveFormattedUserSummaryReserve({
    symbol: 'sUSDe',
    variableBorrowAPY: '.0004', // 0.04%
    underlyingAsset: susdeAddress,
  })
  const susdeUserReserve = getMockUserReservesData(susdeReserve, {
    scaledVariableDebt: '1',
    variableBorrowsUSD: '103.04',
    underlyingAsset: susdeAddress,
  })

  // Deposits
  const solveBtcReserve = getMockAaveFormattedUserSummaryReserve({
    supplyAPY: '0.0005',
    symbol: 'SOLVE',
    underlyingAsset: solveBtcAddress,
  })
  const solveBtcUserReserve = getMockUserReservesData(solveBtcReserve, {
    scaledATokenBalance: '1',
    underlyingBalanceUSD: '2110.84',
    underlyingAsset: solveBtcAddress,
  })

  const usdcReserve = getMockAaveFormattedUserSummaryReserve({
    supplyAPY: '0.0124',
    symbol: 'USDC',
    underlyingAsset: usdcAddress,
  })
  const usdcUserReserve = getMockUserReservesData(usdcReserve, {
    scaledATokenBalance: '1',
    underlyingBalanceUSD: '5.01',
    underlyingAsset: usdcAddress,
  })

  it('should return zero APY when no positions exist', () => {
    const result = calculateNetApy(
      getMockAaveFormattedUserSummary([], {
        totalLiquidityUSD: '0',
        totalBorrowsUSD: '0',
        netWorthUSD: '0',
      }),
      [],
    )

    expect(result.netSupplyApy.toString()).toBe('0')
    expect(result.netBorrowApy.toString()).toBe('0')
    expect(result.totalNetApy.toString()).toBe('0')
  })

  it('should calculate deposit-only positions correctly', () => {
    const userSummary = getMockAaveFormattedUserSummary([solveBtcUserReserve, usdcUserReserve], {
      totalLiquidityUSD: '2115.85',
      totalBorrowsUSD: '0',
      netWorthUSD: '2115.85',
    })

    const result = calculateNetApy(userSummary, [solveBtcReserve, usdcReserve])

    expect(result.netSupplyApy.toString()).toBe('0.0005281773282605099')
    expect(result.netBorrowApy.toString()).toBe('0')
    expect(result.totalNetApy.toString()).toBe('0.0005281773282605099')
  })

  it('should calculate combined supply and borrow position correctly', () => {
    const userSummary = getMockAaveFormattedUserSummary(
      [whypeUserReserve, usdcUserReserve, solveBtcUserReserve, susdeUserReserve],
      {
        totalLiquidityUSD: '2115.85',
        totalBorrowsUSD: '130',
        netWorthUSD: '1985.85',
      },
    )

    const result = calculateNetApy(userSummary, [whypeReserve, usdcReserve, solveBtcReserve, susdeReserve])

    expect(result.netSupplyApy.toString()).toBe('0.0005281773282605099')
    expect(result.netBorrowApy.toString()).toBe('0.2498836923076923')
    expect(result.totalNetApy.toString()).toBe('-0.015795420600750308')
  })
})
