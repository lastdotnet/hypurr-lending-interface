'use client'

import { useState } from 'react'

import { HALF_DAY, ONE_SECOND, formatDuration } from 'common'
import { useInterval } from 'usehooks-ts'

import { Tooltip } from '@/astaria/components/Tooltip'

const getTimePassed = (start: number) => {
  const dateDelta = Date.now() - start
  return dateDelta > 0 ? dateDelta : 0
}

const formatDate = (start: number) => {
  const date = new Date(start)
  return date.toUTCString()
}

export const TimePassed = ({ sentAt }: { sentAt: number }) => {
  const [millisecondsPassed, setMilisecondsPassed] = useState(getTimePassed(sentAt))
  const [isConcise, setIsConcise] = useState(getTimePassed(sentAt) > HALF_DAY)

  useInterval(() => {
    const timePassed = getTimePassed(sentAt)
    if (timePassed > HALF_DAY) {
      setIsConcise(true)
    }
    setMilisecondsPassed(getTimePassed(sentAt))
  }, ONE_SECOND)

  return (
    <Tooltip
      className="text-black-500"
      content={formatDate(sentAt)}
      trigger={`${formatDuration({
        concise: isConcise,
        milliseconds: millisecondsPassed,
      })} ago`}
      underline={true}
    />
  )
}
