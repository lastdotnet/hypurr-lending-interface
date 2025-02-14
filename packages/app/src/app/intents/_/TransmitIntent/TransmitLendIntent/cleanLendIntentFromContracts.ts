import { type Address } from 'viem'

import { BadRequestError } from '@/app/api/server-error'
import { AstariaV1LenderOfferSchema } from '@/astaria/types-internal/intent-schemas'
import { validateSpentItems } from '@/astaria/utils/validateSpentItems'

export const getCleanLendIntentFromContracts = (lendIntentFromContracts: {
  loan: {
    borrower: Address
    collateral: readonly {
      amount: bigint
      identifier: bigint
      itemType: number
      token: Address
    }[]
    custodian: Address
    debt: readonly {
      amount: bigint
      identifier: bigint
      itemType: number
      token: Address
    }[]
    issuer: Address
    originator: Address
    start: bigint
    terms: {
      pricing: Address
      pricingData: Address
      settlement: Address
      settlementData: Address
      status: Address
      statusData: Address
    }
  }
  matchIdentifier: boolean
  minDebtAmount: bigint
}) => {
  // decode caveat to lend intent
  const lenderDetailsParseResult = AstariaV1LenderOfferSchema.safeParse(lendIntentFromContracts)

  if (!lenderDetailsParseResult.success) {
    throw new BadRequestError(`Invalid lend intent: ${lenderDetailsParseResult.error.message}`)
  }

  const { data: lenderDetails } = lenderDetailsParseResult
  validateSpentItems({
    collateralList: lenderDetails.loan.collateral,
    debtList: lenderDetails.loan.debt,
  })

  return lenderDetails
}
