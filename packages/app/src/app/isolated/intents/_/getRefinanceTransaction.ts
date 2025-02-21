'use server'

import { decodeAbiParameters, encodeAbiParameters } from 'viem'

import { AddressSchema } from 'common'
import { IsNull, Not } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { prepFunctionData } from '@/app/api/_/prepFunctionData'
import { BadRequestError, InternalServerError } from '@/app/api/server-error'
import { getCurrentAPYForIndexerOrBorrowerIntent } from '@/app/isolated/intents/_/getCurrentAPY'
import { getEmptySignedCaveats } from '@/app/isolated/intents/_/getEmptySignedCaveats'
import { getRepayConsideration } from '@/app/isolated/loans/_/useLoans/getRepayConsideration'
import { emptyBytes } from '@/astaria/constants/empty'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { type GETRefinanceTransactionParameters } from '@/astaria/types-internal/refinance-schemas'
import { getContractAddress } from '@/astaria/utils/getContractAddress'
import { getPublicClient } from '@/astaria/utils/getPublicClient'

import { BorrowIntent } from 'indexer/model'
import { SpentItemSchema, type StarportLoan, StarportLoanSchema, TermsSchema } from 'sdk'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'
import { StarportABI } from 'sdk/abi/StarportABI'

export const getRefinanceTransaction = async ({ chainId, intentId, lender }: GETRefinanceTransactionParameters) => {
  const publicClient = getPublicClient({ chainId })
  const dataSource = await initializeDataSource()
  const borrowIntent = await dataSource.manager.getRepository(BorrowIntent).findOne({
    relations: {
      recall: {
        starportLoan: true,
      },
    },
    where: { id: intentId, isRecall: true, recall: Not(IsNull()) },
  })

  if (!borrowIntent || !borrowIntent.recall) {
    throw new BadRequestError(`Recall intent not found for id: ${intentId}`)
  }

  const rawLoan = borrowIntent.recall.starportLoan
  const transformedLoan: StarportLoan = {
    ...rawLoan,
    borrower: AddressSchema.parse(rawLoan.borrower),
    collateral: SpentItemSchema.array().parse(rawLoan.collateral),
    custodian: AddressSchema.parse(rawLoan.custodian),
    debt: SpentItemSchema.array().parse(rawLoan.debt),
    issuer: AddressSchema.parse(rawLoan.issuer),
    originator: AddressSchema.parse(rawLoan.originator),
    terms: TermsSchema.parse(rawLoan.terms),
  }

  const starportLoan = StarportLoanSchema.parse(transformedLoan)

  // Calculate current rate
  const pricingDetails = decodeAbiParameters([BasePricingDetailsStructABI], starportLoan.terms.pricingData)[0]

  const blockTime = await publicClient.getBlock().then((block) => block.timestamp)

  const newPricingDetails = {
    ...pricingDetails,
    rate: getCurrentAPYForIndexerOrBorrowerIntent({
      borrowIntent,
      currentTime: blockTime,
    }),
  }

  if (newPricingDetails.rate < 0n) {
    throw new InternalServerError(
      `Rate is negative ${newPricingDetails.rate}; time: ${blockTime}, borrowIntent: ${JSON.stringify(
        borrowIntent,
        (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
      )}`,
    )
  }

  // Get buffered current debt
  const debtWithInterest = getCompoundedDebtItems({
    currentTime: blockTime,
    starportLoan,
  })

  const newPricingData = encodeAbiParameters([BasePricingDetailsStructABI], [newPricingDetails])
  const functionName = 'refinance'

  const transactionData = {
    abi: StarportABI,
    address: getContractAddress({
      chainId,
      contractName: Contracts.Starport,
    }),
    args: [lender, getEmptySignedCaveats(), starportLoan, newPricingData, emptyBytes],
    functionName,
  }

  return {
    amountWithInterest: debtWithInterest.at(0)?.amount,
    functionData: prepFunctionData(transactionData),
  }
}

const getCompoundedDebtItems = ({
  currentTime,
  starportLoan,
}: {
  currentTime: bigint
  starportLoan: StarportLoan
}) => {
  const { carryConsideration, repayConsideration } = getRepayConsideration({
    delta: currentTime - starportLoan.start,
    starportLoan,
  })

  if (carryConsideration.length === 0) {
    return repayConsideration
  }

  if (carryConsideration.length !== repayConsideration.length) {
    throw new Error('Invalid consideration lengths')
  }

  return repayConsideration.map((item, index) => ({
    ...item,
    amount: item.amount + carryConsideration[index].amount,
  }))
}
