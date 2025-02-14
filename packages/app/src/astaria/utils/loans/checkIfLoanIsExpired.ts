import { getNowInSecondsBigInt } from 'common';

export const checkIfLoanIsExpired = (loanEnd?: bigint) => {
  if (!loanEnd) {
    return false;
  }

  return getNowInSecondsBigInt() > loanEnd;
};
