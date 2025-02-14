import { type Address, type PublicClient } from 'viem'
import { z } from 'zod'

import { type ChainId } from 'chains'
import { AddressSchema, getNowInSecondsBigInt } from 'common'
import { type DataSource, LessThan } from 'typeorm'

import { BorrowerIntentSchema, LenderIntentSchema } from '@/app/api/cron/matchingservice/_/types'
import { InternalServerError } from '@/app/api/server-error'
import { executeHelper } from '@/astaria/onchain-helpers/executeHelper'
import { ApprovalAndBalanceValidator } from '@/astaria/onchain-helpers/fragments/ApprovalAndBalanceValidator'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { ArchivedBorrowIntent, ArchivedLendIntent, BorrowIntent, LendIntent } from 'indexer/model'
import { SignedCaveatSchema, type SpentItem as SpentItemSdk } from 'sdk'

const SignedCaveatWithOwnerSchema = SignedCaveatSchema.extend({
  owner: AddressSchema,
})

export const BorrowIntentWithSignedCaveatSchema = BorrowerIntentSchema.extend({
  activeApproval: z.boolean(),
  signedCaveat: SignedCaveatWithOwnerSchema,
})

type BorrowIntentWithSignedCaveat = z.infer<typeof BorrowIntentWithSignedCaveatSchema>

export const LendIntentWithSignedCaveatSchema = LenderIntentSchema.extend({
  activeApproval: z.boolean(),
  signedCaveat: SignedCaveatWithOwnerSchema,
})

type LendIntentWithSignedCaveat = z.infer<typeof LendIntentWithSignedCaveatSchema>

const isValidBalanceAndApproval = async (
  starport: Address,
  publicClient: PublicClient,
  spentItems: SpentItemSdk[],
  spender: Address,
  chainId: ChainId,
) =>
  executeHelper({
    ...ApprovalAndBalanceValidator,
    args: [
      {
        spender,
        spentItems,
        starport,
      },
    ],
    chainId,
    publicClient,
  }).then((errors) => errors.length === 0)

export const validateIntents = async ({
  chainId,
  intents,
  isCollateral,
  publicClient,
}: {
  chainId: ChainId
  intents: BorrowIntentWithSignedCaveat[] | LendIntentWithSignedCaveat[]
  isCollateral: boolean
  publicClient: PublicClient
}) => {
  const starport = getContractAddress({
    chainId,
    contractName: Contracts.Starport,
  })

  return await Promise.allSettled(
    intents.map(async (intent) => ({
      intent,
      isValid: await isValidBalanceAndApproval(
        starport,
        publicClient,
        isCollateral ? intent.collateral : intent.borrow,
        intent.signedCaveat.owner,
        chainId,
      ),
    })),
  ).then((results) => {
    if (results.some((item) => item.status === 'rejected')) {
      throw new InternalServerError(
        `Error validating balance and approval: ${results
          .filter((item) => item.status === 'rejected')
          .map((item) => (item as PromiseRejectedResult).reason.message)
          .join(', ')}`,
      )
    }

    return results
      .filter((item) => item.status === 'fulfilled')
      .map(
        (item) =>
          (
            item as PromiseFulfilledResult<{
              intent: (typeof intents)[0]
              isValid: boolean
            }>
          ).value,
      )
      .filter((item) => item.isValid !== item.intent.activeApproval) // only update if the approval status has changed
      .map((item) => ({ ...item.intent, activeApproval: item.isValid })) // update the approval status
  })
}

export const removeExpiredLendIntents = async ({
  chainDataSource,
  chainId,
}: {
  chainDataSource: DataSource
  chainId: ChainId
}) => {
  const result = await chainDataSource.manager.getRepository(LendIntent).find({
    relations: {
      signedCaveat: true,
    },
    where: {
      chainId,
      deadline: LessThan(getNowInSecondsBigInt()),
    },
  })

  if (!result.length) {
    return
  }

  const archivedLendIntents = result.map((intent) => new ArchivedLendIntent(intent))

  await chainDataSource.manager
    .save(archivedLendIntents)
    .catch((error) => console.error('Error archiving lend intents:', error)) // First save to archived intents, then delete

  await chainDataSource.manager.remove(LendIntent, result)
}

export const removeExpiredBorrowIntents = async ({
  chainDataSource,
  chainId,
}: {
  chainDataSource: DataSource
  chainId: ChainId
}) => {
  const result = await chainDataSource.manager.getRepository(BorrowIntent).find({
    relations: {
      recall: {
        starportLoan: true,
      },
      signedCaveat: true,
    },
    where: {
      chainId,
      deadline: LessThan(getNowInSecondsBigInt()),
      isRecall: false,
    },
  })

  if (!result.length) {
    return
  }

  const archivedBorrowIntents = result.map((intent) => new ArchivedBorrowIntent(intent))

  await chainDataSource.manager
    .save(archivedBorrowIntents)
    .catch((error) => console.error('Error archiving borrow intents:', error)) // First save to archived intents, then delete

  await chainDataSource.manager.remove(BorrowIntent, result)
}
