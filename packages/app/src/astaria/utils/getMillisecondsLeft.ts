export const getMillisecondsLeft = (end: number) => {
  const dateDelta = end - Date.now()
  return dateDelta > 0 ? dateDelta : 0
}
