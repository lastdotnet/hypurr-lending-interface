import { MIDNIGHT_HOURS } from '@/astaria/constants/constants'
import { TIME_HAS_PASSED_TIME } from '@/astaria/utils/timeHasPassed'

export const getNextTime = ({ lastTime }: { lastTime: number }) => {
  if (lastTime) {
    return new Date(lastTime).setUTCHours(MIDNIGHT_HOURS, 0, 0, 0)
  }
  return TIME_HAS_PASSED_TIME
}
