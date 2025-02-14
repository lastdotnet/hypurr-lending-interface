'use client'

import { useState } from 'react'

import { ONE_SECOND } from 'common'
import { useInterval } from 'usehooks-ts'

import { getOriginationApy } from '@/app/intents/_/getCurrentAPY'
import { CurrentDebt } from '@/app/loans/_/LoanCard/CurrentDebt'
import { CurrencyAmountWrapper } from '@/astaria/components/CurrencyAmountWrapper'
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { type BorrowIntentWithRecall } from '@/astaria/types-internal/intent-schemas'

export const CurrentBorrow = ({
  borrowIntentWithRecall,
  className,
  linkAssetToBlockExplorer,
}: {
  borrowIntentWithRecall: BorrowIntentWithRecall
  className?: string
  linkAssetToBlockExplorer?: boolean
}) => {
  const [originationApy, setOriginationApy] = useState(getOriginationApy(borrowIntentWithRecall))

  useInterval(() => {
    setOriginationApy(getOriginationApy(borrowIntentWithRecall))
  }, ONE_SECOND)

  return (
    <CurrencyAmountWrapper>
      <ERC20Image erc20={borrowIntentWithRecall.borrow} />
      <CurrentDebt
        apy={originationApy}
        className={className}
        erc20={borrowIntentWithRecall.borrow}
        linkAssetToBlockExplorer={linkAssetToBlockExplorer}
        startTime={borrowIntentWithRecall.starportLoan.start}
      />
    </CurrencyAmountWrapper>
  )
}
