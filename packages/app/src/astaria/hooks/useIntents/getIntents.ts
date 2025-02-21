'use server'

import { type Address } from 'viem'
import { sepolia } from 'viem/chains'
import { deserialize, serialize } from 'wagmi'
import { z } from 'zod'

import { getNowInSecondsBigInt } from 'common'
import { createClient } from 'redis'
import { type FindOptionsOrder, type FindOptionsWhere, IsNull, MoreThan, Not } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getAssetsMetadata } from '@/app/api/_/getAssetsMetadata'
import { getCurrentAPYForBorrowIntent } from '@/app/isolated/intents/_/getCurrentAPY'
import { isVerifiedIntent } from '@/app/isolated/intents/_/isVerifiedIntent'
import {
  BORROW_AMOUNT_NO_LTV_EXPERT_MODE_THRESHOLD,
  BORROW_COLLATERAL_AMOUNT_NO_EXPERT_MODE_LOWER_THRESHOLD,
  HIGH_LTV,
  REDIS_CACHE_KEY,
  REDIS_CACHING_SECONDS,
} from '@/astaria/constants/constants'
import { ENV_SERVER } from '@/astaria/constants/environmentServer'
import { getIntentAssetIdentifiers } from '@/astaria/hooks/useIntents/getIntentAssetIdentifiers'
import { transformBorrowIntent } from '@/astaria/hooks/useIntents/transformBorrowIntent'
import { transformLendIntent } from '@/astaria/hooks/useIntents/transformLendIntent'
import {
  type BorrowIntent,
  BorrowIntentSchema,
  type GETIntentsParameters,
  type GETIntentsResponse,
  GETIntentsResponseSchema,
  type LendIntent,
  LendIntentSchema,
} from '@/astaria/types-internal/intent-schemas'
import { calculateRecallLtvs } from '@/astaria/utils/calculateRecallLtvs'
import { getFulfilledResponses } from '@/astaria/utils/getFulfilledResponses'
import { getUSDValue } from '@/astaria/utils/getUSDValue'
import { isBorrowIntent, isLendIntent } from '@/astaria/utils/intentStates'

import { CaveatStatus, BorrowIntent as IndexerBorrowIntent, LendIntent as IndexerLendIntent } from 'indexer/model'

const INTENT_FEED_ORDER: FindOptionsOrder<IndexerBorrowIntent | IndexerLendIntent> = {
  deadline: 'ASC',
}

const filterIntents = ({
  borrowAsset,
  collateralAsset,
  filterBorrowIntents,
  filterLendIntents,
  intents,
  isExpertMode,
  maxLTV,
  minAPY,
}: {
  borrowAsset?: Address
  collateralAsset?: Address
  filterBorrowIntents?: boolean
  filterLendIntents?: boolean
  intents: (BorrowIntent | LendIntent)[]
  isExpertMode: boolean
  maxLTV?: number
  minAPY?: bigint
}) =>
  intents.filter(
    (intent) =>
      filterBorrowIntent(!!filterBorrowIntents, intent) &&
      filterLendIntent(!!filterLendIntents, intent) &&
      filterByAsset(collateralAsset, intent.collateral.address) &&
      filterByAsset(borrowAsset, intent.borrow.address) &&
      filterByLTV(maxLTV, intent) &&
      filterByAPY(minAPY, intent) &&
      filterExpertMode(isExpertMode, intent),
  )

const filterBorrowIntent = (filterBorrowIntents: boolean, intent: BorrowIntent | LendIntent) =>
  filterBorrowIntents ? !isBorrowIntent(intent) : true

const filterLendIntent = (filterLendIntents: boolean, intent: BorrowIntent | LendIntent) =>
  filterLendIntents ? !isLendIntent(intent) : true

const filterByAsset = (filterAsset: Address | undefined, asset: Address) => (filterAsset ? filterAsset !== asset : true)

const filterByLTV = (maxLTV: number | undefined, intent: BorrowIntent | LendIntent) => {
  if (maxLTV === undefined || !intent.ltv) {
    return true
  }
  return maxLTV <= intent.ltv
}

const filterByAPY = (minAPY: bigint | undefined, intent: BorrowIntent | LendIntent) => {
  if (minAPY === undefined) {
    return true
  }
  return minAPY <= (isLendIntent(intent) ? intent.minAPY : getCurrentAPYForBorrowIntent(intent))
}

const filterExpertMode = (isExpertMode: boolean, intent: BorrowIntent | LendIntent) => {
  if (isExpertMode) {
    return true
  }
  const borrowUsdValue =
    getUSDValue({
      amount: intent.borrow.amount,
      decimals: intent.borrow.decimals,
      usdValue: intent.borrow.usdValue,
    }) || 0

  return (
    isVerifiedIntent({ intent }) &&
    (intent.ltv || 0) < HIGH_LTV &&
    !(borrowUsdValue > BORROW_AMOUNT_NO_LTV_EXPERT_MODE_THRESHOLD && !intent.ltv) &&
    borrowUsdValue > BORROW_COLLATERAL_AMOUNT_NO_EXPERT_MODE_LOWER_THRESHOLD
  )
}

const getIntentsFromAPI = async ({
  isTestnet,
}: {
  isTestnet: boolean
}): Promise<(BorrowIntent | LendIntent)[]> => {
  const currentTime = getNowInSecondsBigInt()
  const borrowIntentsWhere: FindOptionsWhere<IndexerBorrowIntent>[] = [
    {
      activeApproval: true,
      chainId: isTestnet ? sepolia.id : Not(sepolia.id),
      deadline: MoreThan(currentTime),
      signedCaveat: {
        status: CaveatStatus.Active,
      },
    },
    {
      chainId: isTestnet ? sepolia.id : Not(sepolia.id),
      deadline: MoreThan(currentTime),
      recall: {
        starportLoan: Not(IsNull()),
      },
    },
  ]

  const dataSource = await initializeDataSource()

  const borrowIntentsFromAPI = await dataSource.getRepository(IndexerBorrowIntent).find({
    order: INTENT_FEED_ORDER,
    relations: {
      recall: {
        starportLoan: true,
      },
      signedCaveat: true,
    },
    where: borrowIntentsWhere,
  })

  const lendIntentsWhere: FindOptionsWhere<IndexerLendIntent> = {
    activeApproval: true,
    chainId: isTestnet ? sepolia.id : Not(sepolia.id),
    deadline: MoreThan(currentTime),
    signedCaveat: {
      status: CaveatStatus.Active,
    },
  }

  const lendIntentsFromAPI = await dataSource.getRepository(IndexerLendIntent).find({
    order: INTENT_FEED_ORDER,
    relations: {
      signedCaveat: true,
    },
    where: lendIntentsWhere,
  })

  const assets = await getAssetsMetadata({
    assets: [...getIntentAssetIdentifiers(borrowIntentsFromAPI), ...getIntentAssetIdentifiers(lendIntentsFromAPI)],
  })

  return getFulfilledResponses(
    await Promise.allSettled([
      ...borrowIntentsFromAPI.map((borrowIntent) =>
        transformBorrowIntent({
          assets,
          borrowIntent,
          dataSource,
        }),
      ),
      ...lendIntentsFromAPI.map((lendIntent) =>
        transformLendIntent({
          assets,
          lendIntent,
        }),
      ),
    ]),
  )
}

const getIntentsWithoutRedisCaching = async ({
  isTestnet,
}: {
  isTestnet: boolean
}) => (await getIntentsFromAPI({ isTestnet })).sort((a, b) => (a.deadline > b.deadline ? 1 : -1))

const getIntentsWithRedisCaching = async ({
  isTestnet,
}: {
  isTestnet: boolean
}) => {
  const redis = createClient({
    url: ENV_SERVER.REDIS_URL,
  })
  await redis.connect()
  const cacheValue = await redis.get(REDIS_CACHE_KEY)
  let intents: (BorrowIntent | LendIntent)[]

  if (!cacheValue) {
    // cache miss
    intents = await getIntentsWithoutRedisCaching({
      isTestnet,
    })
    await redis.set(REDIS_CACHE_KEY, serialize(intents), {
      EX: REDIS_CACHING_SECONDS,
    })
  } else {
    // cache hit
    intents = z.array(z.union([BorrowIntentSchema, LendIntentSchema])).parse(deserialize(cacheValue))
  }
  await redis.disconnect()
  return intents
}

export const getIntents = async ({ intentFilterParameters, isTestnet, limit, offset }: GETIntentsParameters) => {
  let cachedIntents = await (ENV_SERVER.REDIS_URL
    ? getIntentsWithRedisCaching({
        isTestnet,
      })
    : getIntentsWithoutRedisCaching({
        isTestnet,
      }))

  cachedIntents = calculateRecallLtvs(cachedIntents)
  cachedIntents = filterIntents({
    intents: cachedIntents,
    ...intentFilterParameters,
  })
  const totalIntents = cachedIntents.length
  const onLastPage = offset + limit >= totalIntents
  const intents = onLastPage ? cachedIntents.slice(offset) : cachedIntents.slice(offset, offset + limit)

  const transformedResponse: GETIntentsResponse = {
    intents,
    paging: {
      itemsReturned: intents.length,
      limit,
      offset,
      onLastPage,
      total: totalIntents,
    },
  }
  return GETIntentsResponseSchema.parse(transformedResponse)
}
