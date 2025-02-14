import { calculateCompoundInterest, getNowInSecondsBigInt } from 'common'

import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getLTV } from '@/astaria/utils/getLTV'

export const calculateRecallLtvs = (intents: (BorrowIntent | LendIntent)[]) =>
  intents.map((rawIntent) => {
    const intent = { ...rawIntent }
    if ('isRecall' in intent && intent.isRecall && 'amount' in intent.collateral) {
      const currentInterest = calculateCompoundInterest({
        amount: intent.loan.debt.amount,
        apy: intent.loan.apy,
        decimals: intent.loan.debt.decimals,
        delta: getNowInSecondsBigInt() - BigInt(intent.loan.startTime),
      })
      const currentDebt = intent.loan.debt.amount + currentInterest

      intent.ltv = getLTV({
        borrowAmount: currentDebt,
        borrowAsset: intent.borrow,
        collateralAmount: intent.collateral.amount,
        collateralAsset: intent.collateral,
      })
    }
    return intent
  })
