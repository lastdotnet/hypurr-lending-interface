import { millisecondsToSeconds } from 'date-fns'

export const getNowInSeconds = () => millisecondsToSeconds(Date.now())
export const getNowInSecondsBigInt = () => BigInt(millisecondsToSeconds(Date.now()))
