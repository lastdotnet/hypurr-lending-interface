import { useQuery } from '@tanstack/react-query'

import { useIsClient } from 'usehooks-ts'

import { useChainId } from '@/astaria/hooks/useChainId'
import { getERC20Tokens } from '@/astaria/utils/getERC20Tokens'

export const useERC20Tokens = ({
  type,
}: {
  type: 'borrow' | 'collateral' | 'deposit'
}) => {
  const chainId = useChainId()
  const { data: erc20s, ...rest } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && Boolean(chainId),
    queryFn: async () => getERC20Tokens({ chainId, type }),
    queryKey: ['erc20-tokens', { chainId, type }],
  })

  return {
    erc20s,
    ...rest,
  }
}
