import { type Duration, milliseconds, millisecondsToSeconds } from 'date-fns'

export const getSeconds = ({ days, hours, minutes, months, weeks, years }: Duration) =>
  millisecondsToSeconds(
    milliseconds({
      days,
      hours,
      minutes,
      months,
      weeks,
      years,
    }),
  )

export const getSecondsBigInt = ({ days, hours, minutes, months, weeks, years }: Duration) =>
  BigInt(
    getSeconds({
      days,
      hours,
      minutes,
      months,
      weeks,
      years,
    }),
  )
