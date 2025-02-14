import { type Address } from 'viem'

import { type ChainId } from 'chains'
import { AddressSchema } from 'common'
import { millisecondsToSeconds } from 'date-fns'
import { type DataSource, type EntityTarget, IsNull, type ObjectLiteral } from 'typeorm'

import { getAssetsMetadata } from '@/app/api/_/getAssetsMetadata/getAssetsMetadata'
import { type USDValuesBatchResponse, fetchUSDValuesBatch } from '@/astaria/utils/fetchUSDValue'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type Asset, isERC20Asset } from 'assets'
import { type SpentItem } from 'indexer/model'
import { ItemType } from 'sdk'

const tranformArrayToInput = (intentArray: ObjectLiteral[]) => {
  const newMap: Map<Address, number[]> = new Map()

  // biome-ignore lint/complexity/noForEach: <explanation>
  intentArray.forEach((intent) => {
    const timeStamp: number | undefined = intent.signedCaveat
      ? millisecondsToSeconds(intent.signedCaveat.createdAt.getTime())
      : Number(intent?.startTime)

    if (!timeStamp) {
      return
    }

    const borrowToken = AddressSchema.parse(intent.borrow.at(0).token)

    const collateralToken = AddressSchema.parse(intent.collateral.at(0).token)

    newMap.has(borrowToken) ? newMap.get(borrowToken)?.push(timeStamp) : newMap.set(borrowToken, [timeStamp])

    newMap.has(collateralToken)
      ? newMap.get(collateralToken)?.push(timeStamp)
      : newMap.set(collateralToken, [timeStamp])
  })

  return newMap
}

export const extractUSDValue = ({
  address,
  addressesWithTimestampAndPrices,
  timeStamp,
}: {
  address: Address
  addressesWithTimestampAndPrices: USDValuesBatchResponse[]
  timeStamp: number
}) => {
  const addressWTimeAndPrice = addressesWithTimestampAndPrices.find((item) => item.address === address)?.prices
  if (!addressWTimeAndPrice || !addressWTimeAndPrice.length) {
    return null
  }

  const actualTimestamp = addressWTimeAndPrice
    .map((item) => item.timestamp)
    .reduce((closest, current) => (Math.abs(current - timeStamp) < Math.abs(closest - timeStamp) ? current : closest))

  const priceData = addressWTimeAndPrice.find((item) => item.timestamp === actualTimestamp)

  return priceData?.price || null
}

const transformOutputWithUSD = async ({
  addressesWithTimestampAndPrices,
  assets,
  timeStamp,
  token,
}: {
  addressesWithTimestampAndPrices: USDValuesBatchResponse[]
  assets: Map<string, Asset>
  timeStamp: number
  token: SpentItem | undefined
}) => {
  if (!token || token.itemType !== ItemType.ERC20) {
    return null
  }

  const result = assets.get(token.token.toLowerCase())
  if (!result || !isERC20Asset(result)) {
    return null
  }

  const usdValueAsset = getUSDValue({
    amount: token.amount,
    decimals: result.decimals,
    usdValue: extractUSDValue({
      address: AddressSchema.parse(token.token),
      addressesWithTimestampAndPrices,
      timeStamp,
    }),
  })

  return usdValueAsset || null
}

export const putIntentsUsdValue = async ({
  chainId,
  dataSource,
  modelType,
}: {
  chainId: ChainId
  dataSource: DataSource
  modelType: EntityTarget<ObjectLiteral>
}) => {
  const intentArray = await dataSource.getRepository(modelType).find({
    relations: {
      signedCaveat: true,
    },
    where: [
      { chainId, usdValueCollateral: IsNull() },
      { chainId, usdValueBorrow: IsNull() },
    ],
  })

  if (!intentArray || !intentArray.length) {
    return
  }

  const addressesWithTimestampAndPrices = await fetchUSDValuesBatch({
    addressesWithTimestamps: tranformArrayToInput(intentArray),
    chainId,
  })

  const assetIdentifiers = addressesWithTimestampAndPrices.map((addressWithExtraInfo) => {
    const collateralAddress = AddressSchema.parse(addressWithExtraInfo.address)
    return {
      address: collateralAddress,
      chainId,
      tokenId: undefined,
      type: ItemType.ERC20,
    }
  })
  const assets = await getAssetsMetadata({
    assets: assetIdentifiers,
  })

  await Promise.all(
    intentArray.map(async (intent) => {
      const timeStamp: number | undefined = intent.signedCaveat
        ? millisecondsToSeconds(intent.signedCaveat.createdAt.getTime())
        : Number(intent?.startTime)

      if (!timeStamp) {
        return
      }

      if (!intent.usdValueBorrow) {
        intent.usdValueBorrow = await transformOutputWithUSD({
          addressesWithTimestampAndPrices,
          assets,
          timeStamp,
          token: intent.borrow.at(0),
        })
      }

      if (!intent.usdValueCollateral) {
        intent.usdValueCollateral = await transformOutputWithUSD({
          addressesWithTimestampAndPrices,
          assets,
          timeStamp,
          token: intent.collateral.at(0),
        })
      }
    }),
  )

  await dataSource.getRepository(modelType).save(intentArray)
}
