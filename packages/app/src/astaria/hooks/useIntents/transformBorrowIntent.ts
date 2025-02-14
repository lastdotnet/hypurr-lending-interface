import { ChainIdSchema } from 'chains'
import { AddressSchema, HexSchema, Uint256Schema, getNowInSecondsBigInt } from 'common'
import { type DataSource } from 'typeorm'

import { getSpentItemCacheKey } from '@/app/api/_/getSpentItemCacheKey'
import { getIsClaimable, getRecallHoneymoonEnd } from '@/app/loans/_/useLoans/checkLoanStatus'
import { getBorrowCollateralAndLTV } from '@/astaria/hooks/useIntents/getBorrowCollateralAndLTV'
import {
  BorrowIntentSchema,
  type BorrowIntentWithRecall,
  type UserBorrowIntent,
} from '@/astaria/types-internal/intent-schemas'
import { type Loan, LoanSchema, RecallSchema, SourceType } from '@/astaria/types-internal/loan-schemas'

import { type Asset, isERC20Asset } from 'assets'
import { type BorrowIntent as IndexerBorrowIntent, Loan as IndexerLoan } from 'indexer/model'
import { ItemType, LoanType, ProviderType, type SpentItem, SpentItemSchema, StarportLoanSchema } from 'sdk'

export const transformBorrowIntent = async ({
  assets,
  borrowIntent,
  dataSource,
}: {
  assets: Map<string, Asset>
  borrowIntent: IndexerBorrowIntent
  dataSource: DataSource
}) => {
  const chainId = ChainIdSchema.parse(borrowIntent.chainId)
  const { borrow, collateral, ltv } = await getBorrowCollateralAndLTV({
    assets,
    chainId,
    intent: borrowIntent,
  })

  if (borrowIntent.isRecall) {
    const recall = borrowIntent.recall

    if (!recall) {
      throw new Error('INTENT_INVALID', { cause: 'Missing recall' })
    }
    const starportLoan = StarportLoanSchema.parse(recall.starportLoan)
    const loan = await dataSource.getRepository(IndexerLoan).findOneBy({ id: recall.id })

    if (!loan) {
      throw new Error("Couldn't find loan in db")
    }

    const isClaimable = getIsClaimable(RecallSchema.parse(recall))
    const honeymoonEnd = getRecallHoneymoonEnd(starportLoan)
    const isRecallable = honeymoonEnd < getNowInSecondsBigInt()
    const collateralFromAPI = loan.collateral.at(0)

    if (!collateralFromAPI) {
      throw new Error('LOAN_INVALID', { cause: 'Missing collateral from API' })
    }

    const debtFromAPI: SpentItem = {
      amount: loan.amount,
      identifier: 0n,
      itemType: ItemType.ERC20,
      token: AddressSchema.parse(loan.address),
    }

    if (!debtFromAPI) {
      throw new Error('LOAN_INVALID', { cause: 'Missing debt from API' })
    }

    const collateralAsset = assets.get(getSpentItemCacheKey({ item: SpentItemSchema.parse(collateralFromAPI) }))

    if (!collateralAsset) {
      throw new Error('LOAN_INVALID', { cause: 'Missing collateral asset' })
    }

    const debtAsset = assets.get(getSpentItemCacheKey({ item: SpentItemSchema.parse(debtFromAPI) }))

    if (!debtAsset) {
      throw new Error('LOAN_INVALID', { cause: 'Missing debt asset' })
    }

    if (!isERC20Asset(debtAsset)) {
      throw new Error('LOAN_INVALID', { cause: 'Debt asset must be ERC20' })
    }

    if (isERC20Asset(collateralAsset)) {
      collateralAsset.amount = collateralFromAPI.amount
    }

    const transformedLoan: Loan = {
      apy: loan.rate,
      asset: collateralAsset,
      chainId: ChainIdSchema.parse(loan.chainId),
      debt: { ...debtAsset, amount: debtFromAPI.amount },
      duration: loan.duration || undefined,
      id: loan.id,
      isClaimable,
      isRecall: true,
      isRecallable,
      loanType: LoanType.ASTARIA,
      provider: ProviderType.ASTARIA,
      recall: RecallSchema.parse(recall) || undefined,
      recallableAt: honeymoonEnd,
      source: SourceType.BORROWER, // ???
      startTime: loan.start,
    }

    const parsedLoan = LoanSchema.safeParse(transformedLoan)
    if (!parsedLoan.success) {
      throw new Error(`Error parsing loan from database:${parsedLoan.error}`)
    }

    const transformedBorrowIntent: BorrowIntentWithRecall = {
      ...borrowIntent,
      borrow,
      borrower: AddressSchema.parse(recall.starportLoan.borrower),
      chainId: ChainIdSchema.parse(borrowIntent.chainId),
      collateral,
      deadline: recall.end,
      duration: borrowIntent.endTime - borrowIntent.startTime,
      isRecall: true,
      loan: parsedLoan.data,
      ltv,
      owner: AddressSchema.parse(recall.recaller),
      randomNumber: Math.random(),
      recallEndTime: recall.end,
      recallStartTime: recall.start,
      starportLoan,
    }

    return BorrowIntentSchema.parse(transformedBorrowIntent)
  }

  const signedCaveat = borrowIntent.signedCaveat
  if (!signedCaveat) {
    throw new Error('LEND_INTENT_INVALID', { cause: 'Missing signed caveat' })
  }

  const nonceUnparsed: string = signedCaveat.nonce
  const ownerUnparsed: string = signedCaveat.owner

  const transformedBorrowIntent: UserBorrowIntent = {
    ...borrowIntent,
    borrow,
    chainId: ChainIdSchema.parse(borrowIntent.chainId),
    collateral,
    deadline: signedCaveat.deadline,
    duration: borrowIntent.endTime - borrowIntent.startTime,
    isRecall: false,
    ltv,
    nonce: Uint256Schema.parse(nonceUnparsed),
    owner: AddressSchema.parse(ownerUnparsed),
    randomNumber: Math.random(),
    salt: HexSchema.parse(signedCaveat.salt),
  }

  return BorrowIntentSchema.parse(transformedBorrowIntent)
}
