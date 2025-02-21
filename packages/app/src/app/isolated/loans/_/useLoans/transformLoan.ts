import { ChainIdSchema } from 'chains'
import { AddressSchema, getNowInSecondsBigInt } from 'common'
import { type DataSource } from 'typeorm'

import { getSpentItemCacheKey } from '@/app/api/_/getSpentItemCacheKey'
import { getIsClaimable, getRecallHoneymoonEnd } from '@/app/isolated/loans/_/useLoans/checkLoanStatus'
import { type Loan, LoanSchema, type Recall, SourceType } from '@/astaria/types-internal/loan-schemas'

import { isERC20Asset } from 'assets'
import { type Asset } from 'assets'
import { type Loan as IndexerLoan } from 'indexer/model'
import { ItemType, LoanType, ProviderType, type SpentItem, SpentItemSchema, type StarportLoan } from 'sdk'

export const transformLoan = ({
  address,
  assets,
  loan,
  recall,
  starportLoan,
}: {
  address: string
  assets: Map<string, Asset>
  dataSource: DataSource
  loan: IndexerLoan
  recall: Recall | null
  starportLoan: StarportLoan
}) => {
  const isClaimable = getIsClaimable(recall)
  const honeymoonEnd = getRecallHoneymoonEnd(starportLoan)
  const isRecallable = honeymoonEnd < getNowInSecondsBigInt()
  const isRecall = !!recall

  const collateralFromAPI = loan.collateral.at(0)
  if (!collateralFromAPI) {
    // @ts-ignore
    throw new Error('LOAN_INVALID', {
      cause: 'Missing collateral from api',
    })
  }
  const debtFromAPI: SpentItem = {
    amount: loan.amount,
    identifier: 0n,
    itemType: ItemType.ERC20,
    token: AddressSchema.parse(loan.address),
  }
  if (!debtFromAPI) {
    // @ts-ignore
    throw new Error('LOAN_INVALID', {
      cause: 'Missing debt from api',
    })
  }

  const collateralAsset: Asset | undefined = assets.get(
    getSpentItemCacheKey({
      item: SpentItemSchema.parse(collateralFromAPI),
    }),
  )
  if (!collateralAsset) {
    // @ts-ignore
    throw new Error('LOAN_INVALID', {
      cause: 'Missing collateral asset',
    })
  }

  const debtAsset: Asset | undefined = assets.get(
    getSpentItemCacheKey({
      item: SpentItemSchema.parse(debtFromAPI),
    }),
  )
  if (!debtAsset) {
    // @ts-ignore
    throw new Error('LOAN_INVALID', {
      cause: 'Missing debt asset',
    })
  }

  if (!isERC20Asset(debtAsset)) {
    // @ts-ignore
    throw new Error('LOAN_INVALID', {
      cause: 'Debt asset must be ERC20',
    })
  }

  if (isERC20Asset(collateralAsset)) {
    collateralAsset.amount = collateralFromAPI.amount
  }

  const transformedLoan: Loan = {
    apy: loan.rate,
    asset: collateralAsset,
    chainId: ChainIdSchema.parse(loan.chainId),
    debt: { ...debtAsset, amount: debtFromAPI.amount },
    duration: loan.duration ? loan.duration : undefined,
    id: loan.id,
    isClaimable,
    isRecall,
    isRecallable,
    loanType: LoanType.ASTARIA,
    provider: ProviderType.ASTARIA,
    recall: recall || undefined,
    recallableAt: honeymoonEnd,
    source: loan.borrower === address ? SourceType.BORROWER : SourceType.LENDER,
    startTime: loan.start,
  }

  return LoanSchema.parse(transformedLoan)
}
