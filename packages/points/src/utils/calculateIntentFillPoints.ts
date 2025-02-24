export const MAX_POINTS_PER_INTENT_FILL = 1000

export const calculateIntentFillPoints = ({
  caveatDuration,
  currentTimestamp,
  endTimestamp,
  usdValue,
}: {
  caveatDuration: number
  currentTimestamp: number
  endTimestamp: number
  usdValue: number
}) => {
  const maxPoints = Math.min(usdValue, MAX_POINTS_PER_INTENT_FILL)
  if (endTimestamp < currentTimestamp) {
    // eslint-disable-next-line no-console
    console.warn("Error calculating intent fill points. Shouldn't be able to fill intent after the deadline.")
    return null
  }
  const startTimestamp = endTimestamp - caveatDuration
  if (currentTimestamp < startTimestamp) {
    // eslint-disable-next-line no-console
    console.warn(
      "Error calculating intent fill points. Shouldn't be able to fill intent before the start of the intent.",
    )
    return null
  }

  const elapsedTime = currentTimestamp - startTimestamp

  // Calculate the proportion of elapsed time relative to total duration
  const proportion = elapsedTime / caveatDuration

  // Calculate points as a linear interpolation
  const points = maxPoints - Math.round(maxPoints * proportion)

  // Ensure points don't go below 0. Not sure if needed?
  return Math.max(points, 0)
}
