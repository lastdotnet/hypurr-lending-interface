import { decodeAbiParameters } from 'viem'

import { calculateMatchAmount } from '@/app/api/cron/matchingservice/_/calculateMatchAmount'
import { isMatch } from '@/app/api/cron/matchingservice/_/isMatch'
import type {
  BorrowerIntent,
  LenderIntent,
  LenderIntentWithCapacity,
  SignedCaveatWithOwnerAndId,
} from '@/app/api/cron/matchingservice/_/types'
import { getCurrentAPYForIndexerOrBorrowerIntent } from '@/app/isolated/intents/_/getCurrentAPY'

import { type StarportLoan } from 'sdk'
import { V1BorrowerDetailsStructABI } from 'sdk/abi/V1BorrowerDetailsStructABI'
import { V1LenderDetailsStructABI } from 'sdk/abi/V1LenderDetailsStructABI'

const getBorrowIntentSettlementParams = ({
  borrowerParams,
}: {
  borrowerParams: SignedCaveatWithOwnerAndId | StarportLoan
}) => {
  if ('deadline' in borrowerParams) {
    // Borrower intent case
    return decodeAbiParameters([V1BorrowerDetailsStructABI], borrowerParams.caveats[0].data)[0].loan.terms
      .settlementData
  }
  // Recall intent case
  return borrowerParams.terms.settlementData
}

export const matchLendIntents = ({
  borrowIntents,
  currentTime,
  lendIntents,
  transactionParametersMap,
}: {
  borrowIntents: BorrowerIntent[]
  currentTime: bigint
  lendIntents: LenderIntentWithCapacity[]
  transactionParametersMap: Map<string, SignedCaveatWithOwnerAndId | StarportLoan>
}): Map<BorrowerIntent, LenderIntent> => {
  // match larger borrow intents first
  borrowIntents.sort((a, b) => (a.maxAmount > b.maxAmount ? -1 : 1))
  const matchedLendIntents = new Map<BorrowerIntent, LenderIntent>()

  return lendIntents.reduce(
    (matchedLendIntents: Map<BorrowerIntent, LenderIntent>, lendIntent: LenderIntentWithCapacity) => {
      borrowIntents.reduce((matchedLendIntents: Map<BorrowerIntent, LenderIntent>, borrowIntent: BorrowerIntent) => {
        const borrowerParams = transactionParametersMap.get(borrowIntent.id)
        const lenderCaveat = transactionParametersMap.get(lendIntent.id)

        if (!borrowerParams || !lenderCaveat || 'collateral' in lenderCaveat) {
          throw new Error('Borrower or Lender SignedCaveat not returned from map as expected')
        }

        const lendIntentSettlementParams = decodeAbiParameters(
          [V1LenderDetailsStructABI],
          lenderCaveat.caveats[0].data,
        )[0].loan.terms.settlementData

        const borrowIntentSettlementParams = getBorrowIntentSettlementParams({
          borrowerParams,
        })

        const currentAPY = getCurrentAPYForIndexerOrBorrowerIntent({
          borrowIntent,
          currentTime,
        })
        if (
          isMatch({
            borrowIntent,
            borrowIntentSettlementParams,
            currentAPY,
            lendIntent,
            lendIntentSettlementParams,
          }) &&
          !matchedLendIntents.has(borrowIntent)
        ) {
          const matchAmount = calculateMatchAmount({
            borrowIntent,
            capacity: lendIntent.capacity,
            lendIntent,
          })
          lendIntent.capacity -= matchAmount
          matchedLendIntents.set(borrowIntent, lendIntent)

          if (lendIntent.singleUse) {
            lendIntent.capacity = 0n
          }
        }
        return matchedLendIntents
      }, matchedLendIntents)
      return matchedLendIntents
    },
    matchedLendIntents,
  )
}
