'use server'

import { type Address } from 'viem'

import { type ChainId } from 'chains'
import { ETHER_DECIMALS, numberToBigInt } from 'common'
import { millisecondsToSeconds } from 'date-fns'
import { calculateIntentFillPoints } from 'points'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { InternalServerError } from '@/app/api/server-error'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { EventType, IntentFillData, OffChainPoint, Point, PointEvents, SignedCaveat } from 'indexer/model'

type InsertIntentFillPointsParameters = {
  address: Address
  chainId: ChainId
  intent: BorrowIntent | LendIntent
}

export const insertIntentFillPoints = async ({ address, chainId, intent }: InsertIntentFillPointsParameters) => {
  const chainDataSource = await initializeDataSource()
  const signedCaveat = await chainDataSource.getRepository(SignedCaveat).findOneBy({ chainId, id: intent.id })

  if (!signedCaveat) {
    throw new Error(`On insert intent fill points the SignedCaveat was not found for intent id: ${intent.id}`)
  }
  const createdAt = new Date()
  const caveatDuration = Number(signedCaveat.deadline) - millisecondsToSeconds(signedCaveat.createdAt.getTime())
  const usdValue = getUSDValue({
    amount: intent.borrow.amount,
    decimals: intent.borrow.decimals,
    usdValue: intent.borrow.usdValue,
  })
  const intentFillPoints = calculateIntentFillPoints({
    caveatDuration,
    currentTimestamp: millisecondsToSeconds(createdAt.getTime()),
    endTimestamp: Number(signedCaveat.deadline),
    usdValue: usdValue ?? 0,
  })
  if (intentFillPoints === null) {
    throw new Error('Error when inserting the intent fill points')
  }
  const points = numberToBigInt({
    amount: intentFillPoints,
    decimals: ETHER_DECIMALS,
  })
  const data: IntentFillData = new IntentFillData(
    {
      createdAt,
      hash: signedCaveat.hash,
      points,
    },
    undefined,
  )
  const point: Point = {
    address: address.toLowerCase(),
    chainId,
    data,
    event: PointEvents.IntentFill,
    id: signedCaveat.hash,
    isDynamic: true,
  }

  const offChainPoint: OffChainPoint = {
    address: address.toLowerCase(),
    chainId,
    createdAt,
    data,
    id: signedCaveat.hash,
    type: EventType.IntentFill,
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
