'use server'

import { type Address } from 'viem'
import { sepolia } from 'viem/chains'

import { type ChainId, ChainIdSchema } from 'chains'
import { AddressSchema, ETHER_DECIMALS, getNowInSeconds, numberToBigInt } from 'common'
import { millisecondsToSeconds } from 'date-fns'
import { calculatePointsForPoint } from 'points'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { type AssetIdentifier, getAssetsMetadata } from '@/app/api/_/getAssetsMetadata'
import { type LoanPoint } from '@/app/api/cron/leaderboard/_/getWalletsWithPoints'
import {
  EventType,
  type GETPointsHistoryResponse,
  GETPointsHistoryResponseSchema,
  type GetPointsHistoryParameters,
  type PointsEvent,
  PointsEventSchema,
} from '@/astaria/types-internal/points-schemas'

import { type ERC20, ERC20Schema, isERC20Asset } from 'assets'
import {
  type CheckedIntentFeedData,
  type IntentFillData,
  type IntentSubmissionData,
  type LoanEventData,
  Point,
  PointEvents,
} from 'indexer/model'

const getErc20AssetFromLoanPoint = async ({
  chainId,
  loanPoint,
}: {
  chainId: ChainId
  loanPoint: LoanPoint
}) => {
  const assetIdentifier: AssetIdentifier = {
    address: AddressSchema.parse(loanPoint.address),
    chainId,
  }
  const assets = await getAssetsMetadata({
    assets: [assetIdentifier],
  })
  const result = assets.get(loanPoint.address.toLowerCase())
  if (!isERC20Asset(result)) {
    // @ts-ignore
    throw new Error('POINTS_HISTORY_ASSET_INVALID', {
      cause: 'Asset type for erc20 points history is invalid',
    })
  }

  const transformedReward: ERC20 = { ...result, amount: loanPoint.data.amount }

  return ERC20Schema.parse(transformedReward)
}

const getLoanPoints = (point: LoanPoint) => {
  if (point.data.points) {
    return point.data.points
  }

  return calculatePointsForPoint({
    point: point.data,
    startTime: getNowInSeconds(),
  })
}

const transformLoanPoint = async ({
  address,
  point,
}: {
  address: Address
  point: Point
}) => {
  const loanPoint = {
    ...point,
    data: point.data as LoanEventData,
  }

  const eventType = loanPoint.data.borrower === address ? EventType.BORROW : EventType.LEND
  const transformedEvent: PointsEvent & {
    asset: ERC20
  } = {
    asset: await getErc20AssetFromLoanPoint({
      chainId: ChainIdSchema.parse(loanPoint.chainId),
      loanPoint,
    }),
    chainId: ChainIdSchema.parse(loanPoint.chainId),
    eventType,
    points: getLoanPoints(loanPoint),
    startTime: loanPoint.data.start,
  }
  return PointsEventSchema.parse(transformedEvent)
}

const mapPointEventToEventType = (pointEvent: PointEvents): EventType | undefined => {
  const eventMapping: Record<PointEvents, EventType | undefined> = {
    [PointEvents.CheckedIntentFeed]: EventType.CheckedIntentFeed,
    [PointEvents.IntentFill]: EventType.IntentFill,
    [PointEvents.IntentSubmission]: EventType.IntentSubmission,
    [PointEvents.Special]: EventType.Special,
    [PointEvents.Loan]: undefined,
  }

  return eventMapping[pointEvent]
}

const transformPoint = async ({ point }: { point: Point }) => {
  const eventType = mapPointEventToEventType(point.event)
  if (!eventType) {
    // @ts-ignore
    throw new Error('POINTS_HISTORY_TYPE_MISMATCH', {
      cause: 'Mismatch between Point event type and Response event type',
    })
  }
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let points
  if (eventType === EventType.IntentFill) {
    points = (point.data as IntentFillData).points
  } else {
    points = numberToBigInt({
      amount: 100,
      decimals: ETHER_DECIMALS,
    })
  }
  const transformedEvent: PointsEvent = {
    chainId: ChainIdSchema.parse(point.chainId),
    eventType,
    points,
    startTime: BigInt(
      millisecondsToSeconds(
        (point.data.isTypeOf === 'IntentSubmissionData'
          ? (point.data as IntentSubmissionData).createdAt
          : (point.data as CheckedIntentFeedData).createdAt
        ).getTime(),
      ),
    ),
  }
  return PointsEventSchema.parse(transformedEvent)
}

export const getPointsHistory = async ({ address, limit, offset }: GetPointsHistoryParameters) => {
  const dataSource = await initializeDataSource()
  const [points, total] = await dataSource
    .getRepository(Point)
    .createQueryBuilder('point')
    .where(
      `point.chainId != :chainId
      AND ((point.event = :loanEvent AND (point.data->>'borrower' = :address OR point.data->>'lender' = :address))
      OR (point.event != :loanEvent AND point.address = :address))`,
      {
        address: address?.toLowerCase(),
        chainId: sepolia.id,
        loanEvent: PointEvents.Loan,
      },
    )
    .orderBy(
      `(CASE WHEN point.event = '${PointEvents.Loan}' THEN point.data->>'start' ELSE point.data->>'createdAt' END)`,
      'DESC',
    )
    .skip(offset)
    .take(limit)
    .getManyAndCount()

  const transformedResponse: GETPointsHistoryResponse = {
    paging: {
      itemsReturned: points.length,
      limit,
      offset,
      onLastPage: offset + limit >= total,
      total,
    },
    pointsEvents: await Promise.all(
      points.map(async (point) =>
        point.event === PointEvents.Loan
          ? await transformLoanPoint({ address, point })
          : await transformPoint({ point }),
      ),
    ),
  }
  return GETPointsHistoryResponseSchema.parse(transformedResponse)
}
