export const TIME_HAS_PASSED_TIME = 1 // 1ms after the start of time

export const timeHasPassed = ({
  nextTime,
}: {
  nextTime: number | undefined
}) => {
  if (nextTime === undefined) {
    return false
  }
  if (nextTime === TIME_HAS_PASSED_TIME) {
    return true
  }
  const timeUntilNext = nextTime - Date.now()

  return timeUntilNext <= 0
}
