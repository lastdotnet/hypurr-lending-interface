'use client'

import { type ReactNode, useState } from 'react'

import { ONE_SECOND, getNowInSeconds, numberToBigInt } from 'common'
import { calculateIntentFillPoints } from 'points'
import { useInterval } from 'usehooks-ts'

import { PointsDisplay } from '@/astaria/components/Points'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import {
  type BorrowIntent,
  type BorrowIntentWithRecall,
  type LendIntent,
} from '@/astaria/types-internal/intent-schemas'
import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'
import { getUSDValue } from '@/astaria/utils/getUSDValue'
import { isBeingRecalled } from '@/astaria/utils/intentStates'

const UpdatingBonusPoints = ({
  children,
  className,
  intent,
  ...rest
}: {
  children?: ReactNode
  className?: string
  intent: BorrowIntent | BorrowIntentWithRecall | LendIntent
}) => {
  const caveatDuration = Number(
    isBeingRecalled(intent) ? TRANSMIT_INTENT_PARAMS.defaultEndTime : TRANSMIT_INTENT_PARAMS.defaultDeadline,
  )
  const endTimestamp = Number(intent.deadline)
  const usdValue = getUSDValue({
    amount: intent.borrow.amount,
    decimals: intent.borrow.decimals,
    usdValue: intent.borrow.usdValue,
  })
  const [bonusPoints, setBonusPoints] = useState(
    calculateIntentFillPoints({
      caveatDuration,
      currentTimestamp: getNowInSeconds(),
      endTimestamp,
      usdValue: usdValue ?? 0,
    }),
  )

  useInterval(() => {
    setBonusPoints(
      calculateIntentFillPoints({
        caveatDuration,
        currentTimestamp: getNowInSeconds(),
        endTimestamp,
        usdValue: usdValue ?? 0,
      }),
    )
  }, ONE_SECOND)

  if (!bonusPoints) {
    return '—'
  }

  return (
    <PointsDisplay
      points={numberToBigInt({ amount: bonusPoints })}
      signDisplay="always"
      suppressHydrationWarning
      {...rest}
    />
  )
}

export const FillIntentBonusPoints = ({
  children,
  className,
  intent,
  skeleton,
  ...rest
}: {
  children?: ReactNode
  className?: string
  intent?: BorrowIntent | BorrowIntentWithRecall | LendIntent
  skeleton?: boolean
}) => {
  if (skeleton) {
    return (
      <SkeletonText className={className} suppressHydrationWarning {...rest}>
        {children}
      </SkeletonText>
    )
  }

  if (!intent) {
    return null
  }

  return (
    <UpdatingBonusPoints className={className} intent={intent} {...rest}>
      {children}
    </UpdatingBonusPoints>
  )
}
