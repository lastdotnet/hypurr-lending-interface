import { type Address, type PublicClient, type WalletClient, decodeAbiParameters } from 'viem'

import { type ChainId } from 'chains'
import { getNowInSecondsBigInt, getSecondsBigInt } from 'common'
import { type DataSource } from 'typeorm'

import {
  getDistinctAssortmentIds,
  getIntentsByAssortmentId,
  getTransactionParametersMap,
} from '@/app/api/cron/matchingservice/_/database'
import { executeOrigination } from '@/app/api/cron/matchingservice/_/executeOrigination'
import { executeRefinance } from '@/app/api/cron/matchingservice/_/executeRefinance'
import { getLendIntentsWithCapacity } from '@/app/api/cron/matchingservice/_/getLendIntentsWithCapacity'
import { matchLendIntents } from '@/app/api/cron/matchingservice/_/matchLendIntents'
import type { BorrowerIntent } from '@/app/api/cron/matchingservice/_/types'

import { AstariaV1PricingABI } from 'sdk/abi/AstariaV1PricingABI'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'

export const runMatchingService = async ({
  astariaV1Pricing,
  chainId,
  dataSource,
  publicClient,
  starport,
  walletClient,
}: {
  astariaV1Pricing: Address
  chainId: ChainId
  dataSource: DataSource
  publicClient: PublicClient
  starport: Address
  walletClient: WalletClient
}) => {
  const assortmentIds = await getDistinctAssortmentIds({ chainId, dataSource })

  console.info('overlapping assortmentIds: ', assortmentIds)

  return Promise.all(
    assortmentIds.map(async (assortmentId: string) => {
      const { borrowIntents, lendIntents } = await getIntentsByAssortmentId({
        assortmentId,
        chainId,
        dataSource,
      })

      const transactionParametersMap = await getTransactionParametersMap({
        borrowIntents,
        chainId,
        dataSource,
        lendIntents,
      })

      const cleanedBorrowIntents = await Promise.all(
        borrowIntents.map(async (intent: BorrowerIntent) => {
          const params = transactionParametersMap.get(intent.id)

          if (!params) {
            throw new Error('Transaction paramaters not mapped')
          }
          if ('signature' in params) {
            return intent
          }

          const deltaT = getNowInSecondsBigInt() + getSecondsBigInt({ minutes: 5 }) - params.start

          const pricingDetails = decodeAbiParameters([BasePricingDetailsStructABI], params.terms.pricingData)[0]

          const interest = await publicClient.readContract({
            abi: AstariaV1PricingABI,
            address: astariaV1Pricing,
            args: [deltaT, params.debt[0].amount, pricingDetails.rate, pricingDetails.decimals],
            functionName: 'calculateInterest',
          })

          intent.maxAmount = params.debt[0].amount + interest
          intent.minAmount = params.debt[0].amount + interest

          return intent
        }),
      )
      const lendIntentsWithCapacity = await getLendIntentsWithCapacity({
        lendIntents,
        publicClient,
        starport,
        transactionParametersMap,
      })

      const blockTime = await publicClient.getBlock().then((block) => block.timestamp)

      const matchedLendIntents = matchLendIntents({
        borrowIntents: cleanedBorrowIntents,
        currentTime: blockTime,
        lendIntents: lendIntentsWithCapacity,
        transactionParametersMap,
      })

      console.info('matched intents: ', matchedLendIntents.size)

      const hashes = []
      for (const [borrowIntent, lendIntent] of matchedLendIntents) {
        const borrowerParams = transactionParametersMap.get(borrowIntent.id)
        const lenderCaveat = transactionParametersMap.get(lendIntent.id)

        if (!borrowerParams || !lenderCaveat || 'collateral' in lenderCaveat) {
          throw new Error('Borrower or Lender SignedCaveat not returned from map as expected')
        }
        let hash
        // Borrower intent case
        if ('deadline' in borrowerParams) {
          const { owner: lender, ...caveat } = lenderCaveat
          hash = await executeOrigination({
            borrowerCaveat: borrowerParams,
            borrowIntent,
            lender,
            lenderCaveat: caveat,
            lendIntent,
            publicClient,
            starport,
            walletClient,
          })
        }
        // Recall intent case
        else {
          const { owner: lender, ...caveat } = lenderCaveat
          hash = await executeRefinance({
            borrowIntent,
            lender,
            lenderCaveat: caveat,
            loan: borrowerParams,
            publicClient,
            starport,
            walletClient,
          })
        }
        hashes.push(hash)
      }
      return hashes
    }),
  ).then((hashes) => hashes.flat())
}
