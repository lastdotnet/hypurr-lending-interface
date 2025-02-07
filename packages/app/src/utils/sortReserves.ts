export const DEFAULT_SORT: string[] = ['WHYPE', 'USDXL', 'USDC', 'sUSDe']

const INFINITY = Number.POSITIVE_INFINITY

export function sortReserves<T>(
  reserves: T[],
  getKey: (reserve: T) => string,
  priorityOrder: string[] = DEFAULT_SORT,
): T[] {
  if (!priorityOrder.length) {
    return reserves
  }

  return reserves.sort((a, b) => {
    const aKey = getKey(a)
    const bKey = getKey(b)

    const aIndex = priorityOrder.indexOf(aKey)
    const bIndex = priorityOrder.indexOf(bKey)

    const aPriority = aIndex !== -1 ? aIndex : INFINITY
    const bPriority = bIndex !== -1 ? bIndex : INFINITY

    return aPriority - bPriority
  })
}
