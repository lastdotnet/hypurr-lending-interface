import { type Address } from 'viem'

import { type ChainId } from 'chains'
import { AddressSchema } from 'common'
import { type ObjectLiteral } from 'typeorm'

import { getAssetsMetadata } from '@/app/api/_/getAssetsMetadata/getAssetsMetadata'
import { extractUSDValue } from '@/app/api/cron/intentsUsdBatchPricing/_/putIntentsUsdValue'
import { type USDValuesBatchResponse, fetchUSDValuesBatch } from '@/astaria/utils/fetchUSDValue'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type Asset, isERC20Asset } from 'assets'
import { type ArchivedLoan, type Loan, type SpentItem } from 'indexer/model'
import { ItemType } from 'sdk'

interface SpentItemWoIdentifier {
  amount: bigint
  itemType: ItemType
  token: string
}

const tranformArrayToInput = (loanArray: ObjectLiteral[]) => {
  const newMap: Map<Address, number[]> = new Map()

  // biome-ignore lint/complexity/noForEach: <explanation>
  loanArray.forEach((item) => {
    const timeStamp = Number(item.start)
    const borrowToken = AddressSchema.parse(item.address)
    const collateralToken = AddressSchema.parse(item.collateral.at(0)?.token)

    newMap.has(borrowToken) ? newMap.get(borrowToken)?.push(timeStamp) : newMap.set(borrowToken, [timeStamp])

    newMap.has(collateralToken)
      ? newMap.get(collateralToken)?.push(timeStamp)
      : newMap.set(collateralToken, [timeStamp])
  })

  return newMap
}

const transformOutputWithUSD = async ({
  addressesWithTimestampAndPrices,
  assets,
  timeStamp,
  token,
}: {
  addressesWithTimestampAndPrices: USDValuesBatchResponse[]
  assets: Map<string, Asset>
  timeStamp: bigint
  token: SpentItem | SpentItemWoIdentifier | undefined
}): Promise<number> => {
  if (!token || token.itemType !== ItemType.ERC20) {
    return 0
  }

  const result = assets.get(token.token.toLowerCase())
  if (!result || !isERC20Asset(result)) {
    return 0
  }

  const usdValueAsset = getUSDValue({
    amount: token.amount,
    decimals: result.decimals,
    usdValue: extractUSDValue({
      address: AddressSchema.parse(token.token),
      addressesWithTimestampAndPrices,
      timeStamp: Number(timeStamp),
    }),
  })

  return usdValueAsset || 0
}

export const getLoansWithPrices = async (chainId: ChainId, loans: Array<Loan | ArchivedLoan>) => {
  const addressesWithTimestampAndPrices = await fetchUSDValuesBatch({
    addressesWithTimestamps: tranformArrayToInput(loans),
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

  const loanWithPrices = await Promise.all(
    loans.map(async (loan) => ({
      ...loan,
      usdValueBorrow: await transformOutputWithUSD({
        addressesWithTimestampAndPrices,
        assets,
        timeStamp: loan.start,
        token: {
          amount: loan.amount,
          itemType: ItemType.ERC20,
          token: loan.address,
        },
      }),
      usdValueCollateral: await transformOutputWithUSD({
        addressesWithTimestampAndPrices,
        assets,
        timeStamp: loan.start,
        token: loan.collateral.at(0),
      }),
    })),
  )

  return loanWithPrices
}
