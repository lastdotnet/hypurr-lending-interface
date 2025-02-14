import { type Address, type PublicClient, type WalletClient, decodeAbiParameters, encodeAbiParameters } from 'viem'

import { type BorrowerIntent } from '@/app/api/cron/matchingservice/_/types'
import { getCurrentAPYForIndexerOrBorrowerIntent } from '@/app/intents/_/getCurrentAPY'
import { emptyBytes } from '@/astaria/constants/empty'

import { type SignedCaveat as SignedCaveatType, type StarportLoan } from 'sdk'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'
import { StarportABI } from 'sdk/abi/StarportABI'

export const executeRefinance = async ({
  borrowIntent,
  lender,
  lenderCaveat,
  loan,
  publicClient,
  starport,
  walletClient,
}: {
  borrowIntent: BorrowerIntent
  lender: Address
  lenderCaveat: SignedCaveatType
  loan: StarportLoan
  publicClient: PublicClient
  starport: Address
  walletClient: WalletClient
}) => {
  const pricingDetails = decodeAbiParameters([BasePricingDetailsStructABI], loan.terms.pricingData)[0]
  const blockTime = await publicClient.getBlock().then((block) => block.timestamp)
  pricingDetails.rate = getCurrentAPYForIndexerOrBorrowerIntent({
    borrowIntent,
    currentTime: blockTime,
  })

  const pricingData = encodeAbiParameters([BasePricingDetailsStructABI], [pricingDetails])

  const account = walletClient.account
  const { request } = await publicClient.simulateContract({
    abi: StarportABI,
    account,
    address: starport,
    args: [lender, lenderCaveat, loan, pricingData, emptyBytes],
    functionName: 'refinance',
  })

  return await walletClient.writeContract(request)
}
