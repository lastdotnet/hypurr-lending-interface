import { BadRequestError } from '@/app/api/server-error'
import { AstariaV1BorrowerIntentSchema } from '@/astaria/types-internal/intent-schemas'
import { validateSpentItems } from '@/astaria/utils/validateSpentItems'

import { type StarportLoan } from 'sdk'

export const getCleanBorrowIntentFromContracts = (borrowIntentFromContracts: {
  endTime: bigint
  loan: StarportLoan
  maxAmount: bigint
  minAmount: bigint
  startRate: bigint
  startTime: bigint
}) => {
  // decode caveat to borrow intent
  const borrowerDetailsParseResult = AstariaV1BorrowerIntentSchema.safeParse(borrowIntentFromContracts)

  if (!borrowerDetailsParseResult.success) {
    throw new BadRequestError(`Invalid borrow intent: ${borrowerDetailsParseResult.error.message}`)
  }

  const { data: borrowerDetails } = borrowerDetailsParseResult
  validateSpentItems({
    collateralList: borrowerDetails.loan.collateral,
    debtList: borrowerDetails.loan.debt,
  })

  return borrowerDetails
}
