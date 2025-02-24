/* eslint-disable @typescript-eslint/no-explicit-any */
export function serializeBigInts(val: any): any {
  const newVals: { [key: string]: any } = {}
  for (const [key, value] of Object.entries(val)) {
    newVals[key] = typeof value === 'bigint' ? value.toString() : value
  }
  return newVals
}
