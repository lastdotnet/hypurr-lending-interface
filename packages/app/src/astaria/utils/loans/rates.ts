import { divideByDaysInAYear } from '@/astaria/utils/loans/loans'

export const getDailyRate = (apy?: bigint) => divideByDaysInAYear(apy)
