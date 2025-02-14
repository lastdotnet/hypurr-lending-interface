'use client'

import { type ReactNode, useState } from 'react'

import { ONE_SECOND, formatDuration } from 'common'
import { secondsToMilliseconds } from 'date-fns'
import { useInterval } from 'usehooks-ts'

import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { getMillisecondsLeft } from '@/astaria/utils/getMillisecondsLeft'

const UpdatingTimeLeft = ({
  children,
  className,
  concise,
  endMilliseconds,
  onOutOfTime,
  ...rest
}: {
  children?: ReactNode
  className?: string
  concise?: boolean
  endMilliseconds: number
  onOutOfTime?: () => void
}) => {
  const [millisecondsLeft, setMillisecondsLeft] = useState(getMillisecondsLeft(endMilliseconds))

  useInterval(() => {
    setMillisecondsLeft(getMillisecondsLeft(endMilliseconds))
  }, ONE_SECOND)

  const timeLeft = formatDuration({ concise, milliseconds: millisecondsLeft })

  if (!timeLeft) {
    if (onOutOfTime) {
      onOutOfTime()
    }
    return <SkeletonNumber className={className} suppressHydrationWarning {...rest} />
  }

  return (
    <span className={className} suppressHydrationWarning {...rest}>
      {timeLeft} {children}
    </span>
  )
}

export const TimeLeft = ({
  children,
  className,
  concise,
  endMilliseconds,
  endSeconds,
  onOutOfTime,
  skeleton,
  ...rest
}: {
  children?: ReactNode
  className?: string
  concise?: boolean
  endMilliseconds?: number
  endSeconds?: bigint
  onOutOfTime?: () => void
  skeleton?: boolean
}) => {
  if (skeleton) {
    return (
      <SkeletonText className={className} suppressHydrationWarning {...rest}>
        {children}
      </SkeletonText>
    )
  }

  if (endMilliseconds) {
    return (
      <UpdatingTimeLeft
        className={className}
        concise={concise}
        endMilliseconds={endMilliseconds}
        onOutOfTime={onOutOfTime}
        {...rest}
      >
        {children}
      </UpdatingTimeLeft>
    )
  }

  if (endSeconds) {
    return (
      <UpdatingTimeLeft
        className={className}
        concise={concise}
        endMilliseconds={secondsToMilliseconds(Number(endSeconds))}
        onOutOfTime={onOutOfTime}
        {...rest}
      >
        {children}
      </UpdatingTimeLeft>
    )
  }

  return null
}
