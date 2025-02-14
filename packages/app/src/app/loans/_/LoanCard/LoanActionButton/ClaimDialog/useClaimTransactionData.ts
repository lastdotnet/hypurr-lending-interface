import { useQuery } from '@tanstack/react-query'

import { type Address } from 'viem'

import { useIsClient } from 'usehooks-ts'

import { getCustodianOrder } from '@/app/isolated-loans/_/getCustodianOrder'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type Loan } from '@/astaria/types-internal/loan-schemas'

import { Action } from 'sdk'

export const useClaimTransactionData = ({
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
    // getCustodianOrder uses current time. Disable cache for this query
    gcTime: 0,
    queryFn: () =>
      getCustodianOrder({
        action: Action.Settlement,
        chainId,
        fulfiller: address as Address,
        loanId: loan.id,
      }).then((data) => data.functionData),
    queryKey: [
      'claim-transaction',
      {
        chainId,
        loanId: loan.id,
      },
    ],
  })
}
