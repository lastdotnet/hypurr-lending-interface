export const bigIntMin = (...args: bigint[]) => args.reduce((min, item) => (item < min ? item : min))
