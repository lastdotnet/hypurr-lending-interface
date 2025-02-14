import { type Address, type PublicClient, type WalletClient, decodeAbiParameters, encodeAbiParameters } from 'viem'

import { calculateMatchAmount } from '@/app/api/cron/matchingservice/_/calculateMatchAmount'
import type { BorrowerIntent, LenderIntent } from '@/app/api/cron/matchingservice/_/types'
import { getCleanBorrowIntentFromContracts } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/cleanBorrowIntentFromContracts'
import { getCurrentAPYForIndexerOrBorrowerIntent } from '@/app/intents/_/getCurrentAPY'

import { type SignedCaveat as SignedCaveatType, SpentItemSchema, StarportLoanSchema } from 'sdk'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'
import { StarportABI } from 'sdk/abi/StarportABI'
import { V1BorrowerDetailsStructABI } from 'sdk/abi/V1BorrowerDetailsStructABI'

export const executeOrigination = async ({
  borrowerCaveat,
  borrowIntent,
  lender,
  lenderCaveat,
  lendIntent,
  publicClient,
  starport,
  walletClient,
}: {
  borrowIntent: BorrowerIntent
  borrowerCaveat: SignedCaveatType
  lendIntent: LenderIntent
  lender: Address
  lenderCaveat: SignedCaveatType
  publicClient: PublicClient
  starport: Address
  walletClient: WalletClient
}) => {
  // recover an example loan from the SignedCaveat data field
  const cleanBorrowIntent = getCleanBorrowIntentFromContracts(
    decodeAbiParameters([V1BorrowerDetailsStructABI], borrowerCaveat.caveats[0].data)[0],
  )
  const loan = StarportLoanSchema.parse(cleanBorrowIntent.loan)
  // replace collateral with the lend intent collateral
  loan.collateral = SpentItemSchema.array().parse(lendIntent.collateral)
  // find the maximum match amount allowed by the borrower and the lender
  loan.debt[0].amount = calculateMatchAmount({
    borrowIntent,
    capacity: lendIntent.maxAmount,
    lendIntent,
  })

  const pricingDetails = decodeAbiParameters([BasePricingDetailsStructABI], loan.terms.pricingData)[0]

  const blockTime = await publicClient.getBlock().then((block) => block.timestamp)
  pricingDetails.rate = getCurrentAPYForIndexerOrBorrowerIntent({
    borrowIntent,
    currentTime: blockTime,
  })

  loan.terms.pricingData = encodeAbiParameters([BasePricingDetailsStructABI], [pricingDetails])

  loan.issuer = lender

  const account = walletClient.account
  const { request } = await publicClient.simulateContract({
    abi: StarportABI,
    account,
    address: starport,
    args: [[], borrowerCaveat, lenderCaveat, loan],
    functionName: 'originate',
  })

  return await walletClient.writeContract(request)
}
