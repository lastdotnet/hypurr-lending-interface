import { useQuery } from '@tanstack/react-query'

import { type Address } from 'viem'

import { useIsClient } from 'usehooks-ts'

import { getRecallTransaction } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RecallDialog/getRecallTransaction'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type Loan } from '@/astaria/types-internal/loan-schemas'

export const useRecallTransactionData = ({
  address,
  loan,
}: {
  address?: Address
  loan: Loan
}) => {
  const chainId = useChainId()

  return useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && !!address,
    queryFn: () =>
      getRecallTransaction({
        chainId,
        loanId: loan.id,
      }),
    queryKey: [
      'recall-transaction',
      {
        chainId,
        loanId: loan.id,
      },
    ],
  })
}
