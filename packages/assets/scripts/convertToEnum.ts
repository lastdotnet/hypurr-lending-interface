export const convertToEnum = (symbols: string[]) =>
  JSON.stringify(symbols.reduce((accumulator, current) => ({ ...accumulator, [current]: current }), {})).replace(
    /:/g,
    '=',
  )
