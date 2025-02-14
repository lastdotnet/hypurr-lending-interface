import { mainnet } from 'viem/chains'

import { type ChainId } from 'chains'
import { AddressSchema, ONE_SECOND } from 'common'
import { secondsToMilliseconds } from 'date-fns'
import { type DataSource } from 'typeorm'

import { fetchUSDValue } from '@/astaria/utils/fetchUSDValue'

import { type ERC20WithChainIdAndStartPointsTimestamp, getERC20TokenBySymbol } from 'assets'
import { PointToken } from 'indexer/model'

;`use server`

const MAINNET_WETH = getERC20TokenBySymbol({
  chainId: mainnet.id,
  symbol: 'WETH',
})

const getTimestampFromDate = (date: Date) => Math.floor(date.getTime() / ONE_SECOND)

const DEFAULT_START_YEAR = 2024

const DELAY = 2000

const COUNTER_DAYS_FOR_DELAY = 30

const NOT_SUPPORTED_TOKENS_IN_API = [
  '0xcc7ff230365bd730ee4b352cc2492cedac49383e',
  '0xa61beb4a3d02decb01039e378237032b351125b4',
  '0x4c5d8a75f3762c1561d96f177694f67378705e98',
  '0x4e0da40b9063dc48364c1c0ffb4ae9d091fc2270',
  '0x94025780a1ab58868d9b2dbbb775f44b32e8e6e5',
  '0x598f9cb99bafc8346b4c153a61b3a27c8f13b10f', // MODE - MODI
]

const usdValueWETHCache = new Map()

const getUsdValueWETH = async (timestamp: number) => {
  // Check if the value is already cached
  if (usdValueWETHCache.has(timestamp)) {
    return usdValueWETHCache.get(timestamp)
  }

  // Fetch usdValueWETH and cache it
  const usdValue =
    (await fetchUSDValue({
      address: MAINNET_WETH.address,
      chainId: mainnet.id,
      timestamp,
    })) || 0

  usdValueWETHCache.set(timestamp, usdValue)

  return usdValue
}

// This is for the nonWETH tokens
export const getHistoricalPrices = async (
  pointToken: ERC20WithChainIdAndStartPointsTimestamp,
  chainId: ChainId,
  chainDataSource: DataSource,
): Promise<PointToken[]> => {
  const historicalValues: PointToken[] = []
  if (NOT_SUPPORTED_TOKENS_IN_API.includes(pointToken.address)) {
    return historicalValues
  }
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  let currentDateTimestamp = getTimestampFromDate(currentDate)
  let startTimestamp = 0
  let latestUpdateTimestamp = 0
  const prevUpdate = await chainDataSource.manager.getRepository(PointToken).findOne({
    order: {
      timestamp: 'DESC',
    },
    where: { address: pointToken.address.toLowerCase(), chainId },
  })
  if (prevUpdate) {
    latestUpdateTimestamp = prevUpdate.timestamp
  }
  if (latestUpdateTimestamp !== 0) {
    // Move 1 day ahead
    const newStartDate = new Date(secondsToMilliseconds(latestUpdateTimestamp))
    newStartDate.setDate(newStartDate.getDate() + 1)
    startTimestamp = getTimestampFromDate(newStartDate < currentDate ? newStartDate : currentDate)
  } else {
    if (pointToken.startPointsTimestamp) {
      startTimestamp = pointToken.startPointsTimestamp
    } else {
      startTimestamp = getTimestampFromDate(new Date(DEFAULT_START_YEAR, 1, 0, 0, 0, 0)) // 2024 1 Feb 00:00:00 default startTimestamp
    }
  }
  let counter = 0
  while (currentDateTimestamp >= startTimestamp) {
    counter++
    let usdValueWETH, usdValueAsset
    try {
      usdValueWETH = (await getUsdValueWETH(currentDateTimestamp)) || 0

      usdValueAsset =
        (await fetchUSDValue({
          address: AddressSchema.parse(pointToken.address),
          chainId,
          timestamp: currentDateTimestamp,
        })) || 0
    } catch (err) {
      console.error('Error fetching info from defillama: ', err)
      break
    }
    if (usdValueWETH === 0 || usdValueAsset === 0) {
      console.error(
        `Missing usd values for one of these tokens: ${MAINNET_WETH.address} / ${pointToken.address} for this timestamp: ${currentDateTimestamp}`,
      )
      currentDate.setDate(currentDate.getDate() - 1)
      currentDateTimestamp = getTimestampFromDate(currentDate)
      continue
    }

    const result: PointToken = {
      address: pointToken.address,
      baseDenominator: usdValueWETH / usdValueAsset,
      chainId,
      decimals: pointToken.decimals,
      id: `${chainId}_${pointToken.address}_${currentDateTimestamp}`,
      timestamp: currentDateTimestamp,
    }
    historicalValues.push(new PointToken(result))
    // Move to the previous day
    currentDate.setDate(currentDate.getDate() - 1)
    currentDateTimestamp = getTimestampFromDate(currentDate)
    if (counter > COUNTER_DAYS_FOR_DELAY) {
      await new Promise((func) => setTimeout(func, DELAY))
    }
  }
  return historicalValues
}
