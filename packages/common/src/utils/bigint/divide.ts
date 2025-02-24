export const divide = (value?: bigint, divisor?: bigint) => {
  if (value === undefined || divisor === undefined || divisor === 0n || value === 0n) {
    return 0n
  }
  return value / divisor
}
