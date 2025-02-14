'use server'

import { AddressSchema } from 'common'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { type PaginationParameters } from '@/app/api/_/pagination-schemas'
import { type GETLeaderboardResponse, GETLeaderboardResponseSchema } from '@/astaria/types-internal/points-schemas'

import { Leaderboard } from 'indexer/model'

export const getLeaderboard = async ({ limit, offset }: PaginationParameters) => {
  const dataSource = await initializeDataSource()

  const [originalLeaderboard, total] = await dataSource.getRepository(Leaderboard).findAndCount({
    order: {
      rank: 'ASC',
    },
    skip: offset,
    take: limit,
  })

  if (!originalLeaderboard) {
    throw new Error('LEADERBOARD_INVALID', {
      cause: 'Missing leaderboard data',
    })
  }

  const leaderboard = originalLeaderboard.map((entry) => {
    const transformedAddress = AddressSchema.parse(entry.id)
    return {
      ...entry,
      address: transformedAddress,
      id: transformedAddress,
      points: entry.points,
    }
  })

  const transformedResponse: GETLeaderboardResponse = {
    leaderboard,
    paging: {
      itemsReturned: leaderboard.length,
      limit,
      offset,
      onLastPage: offset + limit >= total,
      total,
    },
  }

  return GETLeaderboardResponseSchema.parse(transformedResponse)
}
