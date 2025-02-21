//This seems to cause the serverMinification: false property of the next.config.js be applied. Minification of model imports seems to have caused issues on multiple occasions.
import { type NextRequest } from 'next/server'

import { sepolia } from 'viem/chains'

import { ETHER_DECIMALS, getNowInSeconds, numberToBigInt } from 'common'
import { calculatePointsForPoint } from 'points'
import { type Repository } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { calculateTotalOffChainPointsPerWallet } from '@/app/api/cron/leaderboard/_/calculateTotalOffChainPointsPerWallet'
import { combineTotalPoints } from '@/app/api/cron/leaderboard/_/combineTotalPoints'
import { getWalletsWithPoints } from '@/app/api/cron/leaderboard/_/getWalletsWithPoints'
import { sortWalletByPoints } from '@/app/api/cron/leaderboard/_/sortWalletsByPoints'
import { BadRequestError, InternalServerError, handleErrors } from '@/app/api/server-error'

import { Leaderboard, type LoanEventData, Point, PointEvents } from 'indexer/model'

export const dynamic = 'force-dynamic'
export const maxDuration = 240 // This function can run for a maximum of 4 minutes
const CHUNK_SIZE = 5000
const SCALING_FACTOR = 100
const MILLISECONDS = 1000n

export interface WalletWithPoints {
  totalPoints: bigint
  walletAddress: string
}
const IGNORE_ADDRESS = '0x3ff777d0c554869ce75d68562bb029f93f8cca14'

type EventCountType = {
  address: string
  eventCount: string
}

const getSnapshot = (req: NextRequest) => {
  const snapshotQueryParam = req.nextUrl.searchParams.get('snapshot')

  if (!snapshotQueryParam) {
    throw new BadRequestError('Missing query param: snapshot')
  }

  return BigInt(Number.parseInt(snapshotQueryParam))
}

const getEventCounts = async (repository: Repository<Point>, cutoffDate: string): Promise<EventCountType[]> => {
  const results = await repository
    .createQueryBuilder('point')
    .select('point.address', 'address')
    .addSelect('COUNT(point.event)', 'eventCount')
    .where('point.event IN (:...events)', {
      events: [PointEvents.CheckedIntentFeed, PointEvents.IntentSubmission],
    })
    .andWhere('point.address != :ignoreAddress', {
      ignoreAddress: IGNORE_ADDRESS,
    })
    .andWhere('point.chainId != :chainId', { chainId: sepolia.id })
    .andWhere(`(point.data->>'createdAt')::timestamp >= :cutoffDate`, {
      cutoffDate,
    })
    .groupBy('point.address')
    .getRawMany<EventCountType>()

  return results
}

const getArrayAsChunks = (array: Leaderboard[], chunkSize: number): Leaderboard[][] => {
  const result = []
  const data = array.slice(0)
  while (data.at(0)) {
    result.push(data.splice(0, chunkSize))
  }
  return result
}

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    const snapshot = getSnapshot(req)
    const dataSource = await initializeDataSource()
    const loanPoints = await dataSource
      .getRepository(Point)
      .createQueryBuilder('point')
      .where('point.chainId != :chainId', { chainId: sepolia.id })
      .andWhere('point.event = :event', { event: PointEvents.Loan })
      .andWhere(
        "((point.data->>'isClosed' = 'true' AND CAST(point.data->>'start' AS BIGINT) > :lastSnapshot) OR (point.data->>'isClosed' = 'false'))",
        { lastSnapshot: snapshot },
      )
      .getMany()

    // Calculate the current points for non closed points
    const updatedLoanPoints = await Promise.all(
      loanPoints.map(async (point) => {
        if (point.data.isTypeOf === 'LoanEventData' && !point.data.points) {
          point.data.start = point.data.start > snapshot ? point.data.start : snapshot
          point.data.points = calculatePointsForPoint({
            point: point.data,
            startTime: getNowInSeconds(),
          })
        }
        return point
      }),
    )

    // Conversion to ISO timestamp for database comparison
    const cutoffDate = new Date(Number(snapshot * MILLISECONDS)).toISOString()

    const eventFeedAndSubmissionCounts = await getEventCounts(dataSource.getRepository(Point), cutoffDate)

    const eventFeedAndSubmissionPoints = eventFeedAndSubmissionCounts.map((data) => ({
      address: data.address,
      points: numberToBigInt({
        amount: Number(data.eventCount) * SCALING_FACTOR,
        decimals: ETHER_DECIMALS,
      }),
    }))

    const otherEntityPoints = await dataSource
      .getRepository(Point)
      .createQueryBuilder('point')
      .where('point.address != :ignoreAddress', { ignoreAddress: IGNORE_ADDRESS })
      .andWhere('point.chainId != :chainId', { chainId: sepolia.id })
      .andWhere('point.event NOT IN (:...events)', {
        events: [PointEvents.CheckedIntentFeed, PointEvents.IntentSubmission, PointEvents.Loan],
      })
      .andWhere("point.data->>'createdAt' >= :cutoffDate", { cutoffDate })
      .getMany()

    // set constant values for missing points
    const intentFillPoints = otherEntityPoints.map((nonLoanPoint) => {
      const address = nonLoanPoint.address

      if (nonLoanPoint.data.isTypeOf === 'IntentFillData') {
        return { address, points: nonLoanPoint.data.points }
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        throw new InternalServerError(`Not implemented type of offchain point ${nonLoanPoint.data.isTypeOf}`)
      }
    })

    const otherPoints = eventFeedAndSubmissionPoints.concat(intentFillPoints)

    const walletsWithOffChainPoints = calculateTotalOffChainPointsPerWallet(otherPoints)

    const walletsWithOnChainPoints = getWalletsWithPoints({
      ignoreAddress: IGNORE_ADDRESS,
      loanEventData: updatedLoanPoints
        .map((loanPoint) => (loanPoint.data.isTypeOf === 'LoanEventData' ? loanPoint.data : null))
        .filter((item): item is LoanEventData => item !== null),
    })

    const totalPoints = combineTotalPoints(walletsWithOffChainPoints, walletsWithOnChainPoints)

    const leaderboard = sortWalletByPoints(totalPoints)
    const chunksArray = getArrayAsChunks(leaderboard, CHUNK_SIZE)

    await Promise.all(
      chunksArray.map(async (oneChunk) => {
        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Leaderboard)
          .values(oneChunk.map((item) => item))
          .orUpdate(['points', 'rank'], ['id'], {
            skipUpdateIfNoValuesChanged: true,
          })
          .execute()
      }),
    )
    return jsonResponse('ok')
  })
