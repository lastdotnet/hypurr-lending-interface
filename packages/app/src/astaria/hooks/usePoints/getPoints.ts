'use server'

import { sepolia } from 'viem/chains'

import { getNowInSeconds } from 'common'
import { getPointCalculationParameters } from 'points'

import { initializeDataSource } from '@/app/api/_/dataSource'
import {
  type GETPointsParameters,
  type GETPointsResponse,
  GETPointsResponseSchema,
} from '@/astaria/types-internal/points-schemas'

import { Point, PointEvents } from 'indexer/model'

export const getPoints = async ({ address }: GETPointsParameters) => {
  const dataSource = await initializeDataSource()
  const points = await dataSource
    .getRepository(Point)
    .createQueryBuilder(`point`)
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
    .getMany()

  const transformedResponse: GETPointsResponse = getPointCalculationParameters({
    points,
    startTime: getNowInSeconds(),
  })

  return GETPointsResponseSchema.parse(transformedResponse)
}
