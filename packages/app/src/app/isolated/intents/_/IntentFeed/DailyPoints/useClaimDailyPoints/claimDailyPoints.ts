'use server'

import { type Address } from 'viem'

import { type ChainId } from 'chains'
import { randomUUID } from 'node:crypto'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { InternalServerError } from '@/app/api/server-error'
import { getNextTime } from '@/astaria/utils/getNextTime'
import { timeHasPassed } from '@/astaria/utils/timeHasPassed'

import { CheckedIntentFeedData, EventType, OffChainPoint, Point, PointEvents } from 'indexer/model'

export type GetDailyPointsParameters = {
  address: Address
  chainId: ChainId
}

export const claimDailyPoints = async ({ address, chainId }: GetDailyPointsParameters) => {
  const chainDataSource = await initializeDataSource()

  const result = await chainDataSource.manager.getRepository(OffChainPoint).findOne({
    order: {
      createdAt: 'DESC',
    },
    where: {
      address: address.toLowerCase(),
      type: EventType.CheckedIntentFeed,
    },
  })

  if (result) {
    const lastClaimedTime = result.createdAt.getTime()
    const nextClaimTime = getNextTime({ lastTime: lastClaimedTime })

    const canClaimDailyPoints = timeHasPassed({ nextTime: nextClaimTime })

    if (!canClaimDailyPoints) {
      throw Error('Already received points in the last 24 hours.')
    }
  }
  const createdAt = new Date()
  const id = randomUUID()
  const data = new CheckedIntentFeedData(
    {
      createdAt,
    },
    undefined,
  )
  const offChainPoint: OffChainPoint = {
    address: address.toLowerCase(),
    chainId,
    createdAt,
    data,
    id,
    type: EventType.CheckedIntentFeed,
  }
  const point: Point = {
    address: address.toLowerCase(),
    chainId,
    data,
    event: PointEvents.CheckedIntentFeed,
    id,
    isDynamic: false,
  }

  await chainDataSource.transaction(async (manager) => {
    await manager
      .getRepository(OffChainPoint)
      .insert(offChainPoint)
      .catch((error) => {
        throw new InternalServerError(`Failed to insert off chain point: ${error.message}`)
      })
    await manager
      .getRepository(Point)
      .insert(point)
      .catch((error) => {
        throw new InternalServerError(`Failed to insert to point table: ${error.message}`)
      })
  })
}
