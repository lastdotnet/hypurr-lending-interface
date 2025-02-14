import { type PublicClient } from 'viem'
import { z } from 'zod'

import { type ChainId } from 'chains'
import { getNowInSecondsBigInt } from 'common'
import { type DataSource, MoreThan } from 'typeorm'

import { LendIntentWithSignedCaveatSchema, validateIntents } from '@/app/api/cron/clearInvalidIntents/_/common'
import { InternalServerError } from '@/app/api/server-error'

import { LendIntent, SpentItem } from 'indexer/model'

export const lendIntentsClean = async ({
  chainDataSource,
  chainId,
  publicClient,
}: {
  chainDataSource: DataSource
  chainId: ChainId
  publicClient: PublicClient
}) => {
  const result = await chainDataSource.manager.getRepository(LendIntent).find({
    relations: {
      signedCaveat: true,
    },
    where: {
      chainId,
      deadline: MoreThan(getNowInSecondsBigInt()),
    },
  })

  const intentsWithOwnerResults = z.array(LendIntentWithSignedCaveatSchema).safeParse(result)

  if (!intentsWithOwnerResults.success) {
    throw new InternalServerError(`Error parsing Intent from database:${intentsWithOwnerResults.error}`)
  }

  const intentsToUpdate = await validateIntents({
    chainId,
    intents: intentsWithOwnerResults.data,
    isCollateral: false,
    publicClient,
  })

  const intents = intentsToUpdate.map((intentWithCaveat) => {
    const { signedCaveat, ...intent } = intentWithCaveat
    return new LendIntent({
      ...intent,
      borrow: intent.borrow.map((item) => new SpentItem(item)),
      collateral: intent.collateral.map((item) => new SpentItem(item)),
    })
  })
  await chainDataSource.manager.save(intents).catch((error) => {
    throw new InternalServerError(`Failed to insert Intents: ${error.message}`)
  })
}
