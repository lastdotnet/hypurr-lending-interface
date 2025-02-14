import { type Loan } from '@/astaria/types-internal/loan-schemas'

export const getEnd = (loan: Loan | undefined): bigint | undefined => {
  if (loan) {
    if (!loan.duration) {
      return undefined
    }
    return loan.startTime + loan.duration
  }
  return undefined
}
