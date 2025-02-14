import { useQuery } from '@tanstack/react-query'

import { useIsClient } from 'usehooks-ts'

import { getERC20Token } from '@/astaria/utils/getERC20Token'

import type { GetERC20TokenBySymbolProps } from 'assets'

export const useERC20Token = (props: GetERC20TokenBySymbolProps) => {
  const { chainId, symbol } = props
  const { data: erc20, ...rest } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && Boolean(chainId),
    queryFn: async () => getERC20Token(props),
    queryKey: ['erc20-token', { chainId, symbol }],
  })

  return {
    erc20,
    ...rest,
  }
}
