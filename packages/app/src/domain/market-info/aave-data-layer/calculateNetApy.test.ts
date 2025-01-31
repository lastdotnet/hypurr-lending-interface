import { calculateNetApy } from './calculateNetApy'
import {
  getMockAaveFormattedUserSummaryReserve,
  getMockUserReservesData,
  getMockAaveFormattedUserSummary,
  testAddresses,
} from '@/test/integration/constants'

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

  it('should return zero APYs when no positions exist', () => {
    const result = calculateNetApy(getMockAaveFormattedUserSummary([]), [])

    expect(result.netSupplyApy.toString()).toBe('0')
    expect(result.netBorrowApy.toString()).toBe('0')
    expect(result.totalNetApy.toString()).toBe('0')
  })

  it('should calculate deposit-only positions correctly', () => {
    const userSummary = getMockAaveFormattedUserSummary([solveBtcUserReserve, usdcUserReserve])

    const result = calculateNetApy(userSummary, [solveBtcReserve, usdcReserve])

    expect(result.netSupplyApy.toString()).toBe('0.00052817732826050996')
    expect(result.netBorrowApy.toString()).toBe('0')
    expect(result.totalNetApy.toString()).toBe('0.00052817732826050996')
  })

  it('should calculate borrow-only positions correctly', () => {
    const userSummary = getMockAaveFormattedUserSummary([whypeUserReserve, susdeUserReserve])

    const result = calculateNetApy(userSummary, [whypeReserve, susdeReserve])

    expect(result.netSupplyApy.toString()).toBe('0')
    expect(result.netBorrowApy.toString()).toBe('0.24988369230769230769')
    expect(result.totalNetApy.toString()).toBe('-0.24988369230769230769')
  })

  it('should calculate combined supply and borrow position correctly', () => {
    const userSummary = getMockAaveFormattedUserSummary([
      whypeUserReserve,
      usdcUserReserve,
      solveBtcUserReserve,
      susdeUserReserve,
    ])

    const result = calculateNetApy(userSummary, [whypeReserve, usdcReserve, solveBtcReserve, susdeReserve])

    expect(result.netSupplyApy.toString()).toBe('0.00052817732826050996')
    expect(result.netBorrowApy.toString()).toBe('0.24988369230769230769')
    expect(result.totalNetApy.toString()).toBe('-0.01396679920742703208')
  })
})
