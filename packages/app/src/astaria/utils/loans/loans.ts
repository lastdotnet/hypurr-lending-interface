const DAYS_IN_A_YEAR = 365n;

export const divideByDaysInAYear = (amount?: bigint) =>
  amount ? amount / DAYS_IN_A_YEAR : 0n;
