import { type PublicClient } from 'viem'
import { z } from 'zod'

import { type ChainId } from 'chains'
import { getNowInSecondsBigInt } from 'common'
import { type DataSource, MoreThan } from 'typeorm'

import { BorrowIntentWithSignedCaveatSchema, validateIntents } from '@/app/api/cron/clearInvalidIntents/_/common'
import { InternalServerError } from '@/app/api/server-error'

import { BorrowIntent, SpentItem } from 'indexer/model'

export const borrowIntentsClean = async ({
  chainDataSource,
  chainId,
  publicClient,
}: {
  chainDataSource: DataSource
  chainId: ChainId
  publicClient: PublicClient
}) => {
  const result = await chainDataSource.manager.getRepository(BorrowIntent).find({
    relations: {
      signedCaveat: true,
    },
    where: {
      chainId,
      deadline: MoreThan(getNowInSecondsBigInt()),
      isRecall: false,
    },
  })

  const intentsWithOwnerResults = z.array(BorrowIntentWithSignedCaveatSchema).safeParse(result)

  if (!intentsWithOwnerResults.success) {
    throw new InternalServerError(`Error parsing Intent from database:${intentsWithOwnerResults.error}`)
  }

  const intentsToUpdate = await validateIntents({
    chainId,
    intents: intentsWithOwnerResults.data,
    isCollateral: true,
    publicClient,
  })

  const intents = intentsToUpdate.map((intentWithCaveat) => {
    const { signedCaveat, ...intent } = intentWithCaveat
    return new BorrowIntent({
      ...intent,
      borrow: intent.borrow.map((item) => new SpentItem(item)),
      collateral: intent.collateral.map((item) => new SpentItem(item)),
    })
  })
  await chainDataSource.manager.save(intents).catch((error) => {
    throw new InternalServerError(`Failed to insert Intents: ${error.message}`)
  })
}
