import { milliseconds, millisecondsToSeconds } from 'date-fns'

export const daysToSeconds = (days: number) => millisecondsToSeconds(milliseconds({ days }))
