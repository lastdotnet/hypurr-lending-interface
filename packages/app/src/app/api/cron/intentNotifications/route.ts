import { type NextRequest } from 'next/server'

import { formatUnits } from 'viem'

import { type ChainId } from 'chains'
import { addDecimals, getNowInSecondsBigInt } from 'common'
import { secondsInHour } from 'date-fns/constants'
import { type DataSource, MoreThan } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getAssetsMetadata } from '@/app/api/_/getAssetsMetadata'
import { getSpentItemCacheKey } from '@/app/api/_/getSpentItemCacheKey'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { handleErrors } from '@/app/api/server-error'
import {
  getCurrentAPYForBorrowIntentWithRecall,
  getCurrentAPYForIndexerOrBorrowerIntent,
} from '@/app/isolated/intents/_/getCurrentAPY'
import { getEstimatedLTV } from '@/app/isolated/intents/_/getEstimatedLTV'
import {
  DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
  HIGHER_APY_THRESHOLD,
  HIGH_APY_THRESHOLD,
  NotificationChannel,
  type NotificationPayload,
  NotificationType,
} from '@/astaria/constants/notifications'
import { getIntentAssetIdentifiers } from '@/astaria/hooks/useIntents/getIntentAssetIdentifiers'
import { type BorrowIntentWithRecall } from '@/astaria/types-internal/intent-schemas'
import { sendNotification } from '@/astaria/utils/sendNotification'

import { ERC20AssetSchema, isERC20Asset } from 'assets'
import { BorrowIntent } from 'indexer/model'
import { SpentItemSchema } from 'sdk'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // This function can run for a maximum of 300 seconds

const DELAY_BETWEEN_NOTIFICATIONS = 1000

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    const chainDataSource = await initializeDataSource()

    await intentNotifications(chainDataSource)

    return jsonResponse('ok')
  })

const intentNotifications = async (chainDataSource: DataSource) => {
  const currentTime = getNowInSecondsBigInt()
  const intents = await chainDataSource.manager
    .getRepository(BorrowIntent)
    .find({ where: { deadline: MoreThan(currentTime) } })

  const assets = await getAssetsMetadata({
    assets: getIntentAssetIdentifiers(intents),
  })

  // biome-ignore lint/complexity/noForEach: <explanation>
  intents.forEach(async (intent) => {
    const borrowAsset = assets.get(
      getSpentItemCacheKey({
        item: SpentItemSchema.parse(intent.borrow.at(0)),
      }),
    )

    const collateralAsset = assets.get(
      getSpentItemCacheKey({
        item: SpentItemSchema.parse(intent.collateral.at(0)),
      }),
    )

    if (!borrowAsset || !collateralAsset || !isERC20Asset(borrowAsset) || !isERC20Asset(collateralAsset)) {
      return
    }

    if (intent.usdValueBorrow === undefined || typeof intent.usdValueBorrow !== 'number') {
      return
    }

    const usdValueBorrow = intent.usdValueBorrow ?? 0
    const usdValueCollateral = intent.usdValueCollateral ?? 0

    const currentAPY = intent.isRecall
      ? getCurrentAPYForBorrowIntentWithRecall(intent as unknown as BorrowIntentWithRecall)
      : getCurrentAPYForIndexerOrBorrowerIntent({
          borrowIntent: intent,
          currentTime,
        })

    const erc20AssetBorrow = ERC20AssetSchema.parse(borrowAsset)
    const erc20AssetCollateral = ERC20AssetSchema.parse(collateralAsset)

    const endsWithinHour = intent.deadline - currentTime < secondsInHour

    const highApyThreshold = addDecimals({
      decimals: erc20AssetBorrow.decimals - DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
      value: HIGH_APY_THRESHOLD,
    })

    const higherApyThreshold = addDecimals({
      decimals: erc20AssetBorrow.decimals - DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
      value: HIGHER_APY_THRESHOLD,
    })

    const payload: NotificationPayload = {
      apy: formatUnits(currentAPY, erc20AssetBorrow.decimals - DECIMALS_SUBTRACTION_FOR_PERCENTAGES),
      borrowAmount: formatUnits(intent.borrow[0].amount, erc20AssetBorrow.decimals),
      borrowSymbol: erc20AssetBorrow.symbol.toUpperCase(),
      chainId: intent.chainId as ChainId,
      collateralAmount: formatUnits(intent.collateral[0].amount, erc20AssetCollateral.decimals),
      collateralSymbol: erc20AssetCollateral.symbol.toUpperCase(),
      intentType: intent.isRecall ? 'BORROW RECALL' : 'BORROW',
      ltv: getEstimatedLTV({ usdValueBorrow, usdValueCollateral }),
      raw: intent,
      status: 'OPEN',
      usdValue: usdValueBorrow === 0 ? undefined : usdValueBorrow,
    }

    let type: NotificationType | undefined
    if (currentAPY >= higherApyThreshold && endsWithinHour) {
      type = NotificationType.HIGHER_APY_LAST_CHANCE
    } else if (currentAPY >= higherApyThreshold) {
      type = NotificationType.HIGHER_APY
    } else if (currentAPY >= highApyThreshold) {
      type = NotificationType.HIGH_APY
    } else {
      return
    }

    const results = await sendNotification({
      channels: [NotificationChannel.TELEGRAM],
      payload,
      type,
    })

    // eslint-disable-next-line no-console
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('Notification results:', results)

    await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_NOTIFICATIONS))
  })
}
