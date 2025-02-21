'use client'

import { useState } from 'react'

import { ONE_SECOND } from 'common'
import { useInterval } from 'usehooks-ts'

import {
  getCurrentAPYForBorrowIntent,
  getCurrentAPYForBorrowIntentWithRecall,
} from '@/app/isolated/intents/_/getCurrentAPY'
import { Percent } from '@/astaria/components/Percent'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { type BorrowIntent, type BorrowIntentWithRecall } from '@/astaria/types-internal/intent-schemas'

const UpdatingCurrentRate = ({
  borrowIntent,
  className,
  standardDecimals,
  ...rest
}: {
  borrowIntent: BorrowIntent | BorrowIntentWithRecall
  className?: string
  standardDecimals?: boolean
}) => {
  const [currentAPY, setCurrentAPY] = useState(
    borrowIntent.isRecall
      ? getCurrentAPYForBorrowIntentWithRecall(borrowIntent)
      : getCurrentAPYForBorrowIntent(borrowIntent),
  )

  useInterval(() => {
    setCurrentAPY(
      borrowIntent.isRecall
        ? getCurrentAPYForBorrowIntentWithRecall(borrowIntent)
        : getCurrentAPYForBorrowIntent(borrowIntent),
    )
  }, ONE_SECOND)

  const debtDecimals = borrowIntent.borrow.decimals

  return (
    <Percent
      className={className}
      decimals={debtDecimals}
      percent={currentAPY}
      standardDecimals={standardDecimals}
      suppressHydrationWarning
      {...rest}
    />
  )
}

export const CurrentBorrowAPY = ({
  borrowIntent,
  className,
  skeleton,
  standardDecimals,
  ...rest
}: {
  borrowIntent?: BorrowIntent | BorrowIntentWithRecall
  className?: string
  skeleton?: boolean
  standardDecimals?: boolean
}) => {
  if (skeleton) {
    return <SkeletonText className={className} suppressHydrationWarning />
  }
  if (!borrowIntent) {
    return null
  }
  return (
    <UpdatingCurrentRate
      borrowIntent={borrowIntent}
      className={className}
      standardDecimals={standardDecimals}
      {...rest}
    />
  )
}
