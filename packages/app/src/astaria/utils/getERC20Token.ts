import { fetchUSDValue } from '@/astaria/utils/fetchUSDValue'

import { type GetERC20TokenBySymbolProps, getERC20TokenBySymbol } from 'assets'

export const getERC20Token = async (props: GetERC20TokenBySymbolProps) => {
  const { chainId } = props
  const erc20 = getERC20TokenBySymbol(props)

  const usdValue = await fetchUSDValue({
    address: erc20.address,
    chainId,
  })

  return {
    ...erc20,
    usdValue,
  }
}
