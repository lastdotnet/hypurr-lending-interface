import { type HTMLAttributes, useState } from 'react'

import { type Address } from 'viem'

import { clsx } from 'clsx'

import { ONE_SECOND, formatNumber, toNormalizedValue } from 'common'
import { POINTS_DECIMALS, calculatePoints } from 'points'
import { useInterval } from 'usehooks-ts'

import { DetailsDisplayTooltip } from '@/astaria/components/DetailsDisplayTooltip'
import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { usePoints } from '@/astaria/hooks/usePoints'
import { type GETPointsResponse } from '@/astaria/types-internal/points-schemas'
import { formatPoints } from '@/astaria/utils/formatPoints'

interface PointsDisplayProps extends HTMLAttributes<HTMLSpanElement> {
  points: bigint | undefined
  short?: boolean
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero' | undefined
  suppressHydrationWarning?: boolean
}
export const PointsDisplay = ({
  className,
  points,
  short,
  signDisplay,
  suppressHydrationWarning,
  ...rest
}: PointsDisplayProps) => {
  if (points === undefined) {
    return 0
  }

  if (short) {
    const { content, trigger } = formatPoints(points)

    return (
      <DetailsDisplayTooltip
        content={content}
        suppressHydrationWarning={suppressHydrationWarning}
        trigger={trigger}
        {...rest}
      />
    )
  }

  return (
    <span className={clsx('font-mono', className)} suppressHydrationWarning={suppressHydrationWarning} {...rest}>
      {formatNumber({
        amount: toNormalizedValue(points, POINTS_DECIMALS),
        maxDecimals: 0,
        signDisplay,
      })}
    </span>
  )
}

interface UpdatingPointsProps extends HTMLAttributes<HTMLSpanElement> {
  pointsData: GETPointsResponse
  short?: boolean
}
const UpdatingPoints = ({ pointsData, short, ...rest }: UpdatingPointsProps) => {
  const [currentPoints, setCurrentPoints] = useState(
    calculatePoints({
      startPoints: pointsData.startPoints,
      startTime: pointsData.startTime,
      totalActiveLoanTokenAmount: pointsData.totalActiveLoanTokenAmount,
    }),
  )

  useInterval(() => {
    setCurrentPoints(
      calculatePoints({
        startPoints: pointsData.startPoints,
        startTime: pointsData.startTime,
        totalActiveLoanTokenAmount: pointsData.totalActiveLoanTokenAmount,
      }),
    )
  }, ONE_SECOND)

  return <PointsDisplay points={currentPoints} short={short} {...rest} />
}

interface PointsProps extends HTMLAttributes<HTMLSpanElement> {
  address: Address | undefined
  short?: boolean
}
export const Points = ({ address, short, ...rest }: PointsProps) => {
  const { data: pointsData, isPending, isSuccess } = usePoints({ address })

  if (isPending) {
    return <SkeletonNumber />
  }

  if (isSuccess && pointsData) {
    return <UpdatingPoints pointsData={pointsData} short={short} {...rest} />
  }

  return null
}
