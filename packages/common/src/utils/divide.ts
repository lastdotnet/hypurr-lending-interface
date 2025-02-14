export const divideNumber = (value?: number, divisor?: number) => {
  if (
    value === undefined ||
    divisor === undefined ||
    divisor === 0 ||
    value === 0
  ) {
    return 0;
  }
  return value / divisor;
};
