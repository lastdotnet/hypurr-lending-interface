'use server'

import { z } from 'zod'

import { type ChainId } from 'chains'
import { getNowInSecondsBigInt, getSecondsBigInt } from 'common'
import { type DataSource, ILike, In, MoreThan } from 'typeorm'

import {
  BorrowIntentAssortmentIdSchema,
  type BorrowerIntent,
  BorrowerIntentSchema,
  LendIntentAssortmentIdSchema,
  type LenderIntent,
  LenderIntentSchema,
  type SignedCaveatWithOwnerAndId,
  SignedCaveatWithOwnerAndIdSchema,
  StarportLoanSchemaWithId,
  type StarportLoanWithId,
} from '@/app/api/cron/matchingservice/_/types'
import { InternalServerError } from '@/app/api/server-error'

import { BorrowIntent, StarportLoan as IndexerStarportLoan, LendIntent, SignedCaveat } from 'indexer/model'
import { type StarportLoan } from 'sdk'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

export const getDistinctAssortmentIds = async ({
  chainId,
  dataSource,
}: {
  chainId: ChainId
  dataSource: DataSource
}) => {
  const deadline = getNowInSecondsBigInt() + getSecondsBigInt({ minutes: 2 })

  const intentResults = z.array(BorrowIntentAssortmentIdSchema).safeParse(
    await dataSource.manager
      .getRepository(BorrowIntent)
      .createQueryBuilder('intent')
      .select('intent.assortmentId')
      .distinct(true)
      .where('chain_id = :chainId AND deadline > :deadline AND active_approval = true', {
        chainId,
        deadline,
      })
      .getRawMany(),
  )

  if (!intentResults.success) {
    throw new InternalServerError('Error parsing intent assortmentIds from database')
  }

  const intentAssortmentIds = intentResults.data.map((item) => item.intent_assortment_id.toLowerCase())

  const lendIntentResults = z.array(LendIntentAssortmentIdSchema).safeParse(
    await dataSource.manager
      .getRepository(LendIntent)
      .createQueryBuilder('offer')
      .select('offer.assortmentId')
      .distinct(true)
      .where('chain_id = :chainId AND deadline > :deadline', {
        chainId,
        deadline,
      })
      .getRawMany(),
  )

  if (!lendIntentResults.success) {
    throw new InternalServerError(`Error parsing lend intent assortmentIds from database`)
  }

  console.info(`lendIntentResults: ${lendIntentResults.data.length}; borrowIntentResults: ${intentResults.data.length}`)

  return lendIntentResults.data
    .map((item) => item.offer_assortment_id.toLowerCase())
    .filter((value) => intentAssortmentIds.includes(value))
}

export const getIntentsByAssortmentId = async ({
  assortmentId,
  chainId,
  dataSource,
}: {
  assortmentId: string
  chainId: ChainId
  dataSource: DataSource
}) => {
  const borrowIntentQuery = await dataSource.manager.getRepository(BorrowIntent).findBy({
    activeApproval: true,
    assortmentId: ILike(assortmentId),
    chainId,
    deadline: MoreThan(getNowInSecondsBigInt() + getSecondsBigInt({ minutes: 2 })),
  })

  const borrowIntentsResults = z.array(BorrowerIntentSchema).safeParse(borrowIntentQuery)

  if (!borrowIntentsResults.success) {
    throw new InternalServerError('Error parsing intent from database')
  }

  const { data: borrowIntentsData } = borrowIntentsResults

  const borrowIntents = borrowIntentsData.map((intent: BorrowerIntent) => ({
    ...intent,
    assortmentId: intent.assortmentId?.toLowerCase(),
  }))

  const lendIntentQuery = await dataSource.manager.getRepository(LendIntent).findBy({
    activeApproval: true,
    assortmentId: ILike(assortmentId),
    chainId,
    deadline: MoreThan(getNowInSecondsBigInt() + getSecondsBigInt({ minutes: 2 })),
  })

  const lendIntentResults = z.array(LenderIntentSchema).safeParse(lendIntentQuery)

  if (!lendIntentResults.success) {
    throw new InternalServerError(`Error parsing lend intents from database`)
  }

  const { data: lendIntentsData } = lendIntentResults

  const lendIntents = lendIntentsData.map((lendIntent: LenderIntent) => ({
    ...lendIntent,
    assortmentId: lendIntent.assortmentId?.toLowerCase(),
  }))

  return { borrowIntents, lendIntents }
}

export const getTransactionParametersMap = async ({
  borrowIntents,
  chainId,
  dataSource,
  lendIntents,
}: {
  borrowIntents: BorrowerIntent[]
  chainId: ChainId
  dataSource: DataSource
  lendIntents: LenderIntent[]
}) => {
  const uniqueBorrowIntentIds = borrowIntents.map((borrowIntent: BorrowerIntent) => borrowIntent.id)
  const uniqueLendIntentIds = lendIntents.map((lendIntent: LenderIntent) => lendIntent.id)

  const caveatResults = z.array(SignedCaveatWithOwnerAndIdSchema).safeParse(
    await dataSource.manager.getRepository(SignedCaveat).findBy({
      chainId,
      id: In([...uniqueLendIntentIds, ...uniqueBorrowIntentIds]),
    }),
  )

  if (!caveatResults.success) {
    throw new InternalServerError('Error parsing SignedCaveat from database')
  }

  const loanResults = z.array(StarportLoanSchemaWithId).safeParse(
    await dataSource.manager.getRepository(IndexerStarportLoan).findBy({
      chainId,
      id: In([...uniqueBorrowIntentIds]),
    }),
  )

  if (!loanResults.success) {
    throw new InternalServerError('Error parsing Loans from database')
  }
  return [...caveatResults.data, ...loanResults.data].reduce(
    (
      acc: Map<string, SignedCaveatWithOwnerAndId | StarportLoan>,
      item: SignedCaveatWithOwnerAndId | StarportLoanWithId,
    ) => {
      acc.set(item.id, item)
      return acc
    },
    new Map<string, SignedCaveatWithOwnerAndId | StarportLoan>(),
  )
}
