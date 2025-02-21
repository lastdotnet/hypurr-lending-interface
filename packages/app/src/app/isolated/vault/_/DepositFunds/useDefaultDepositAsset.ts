import { getDefaultERC20DepositToken } from '@/app/isolated/vault/_/DepositFunds/getDefaultERC20DepositToken'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useUSDValue } from '@/astaria/hooks/useUSDValue'

export const useDefaultDepositAsset = () => {
  const chainId = useChainId()
  const depositAsset = getDefaultERC20DepositToken({ chainId })

  const { data: usdValueDepositAsset, ...rest } = useUSDValue(depositAsset)

  return {
    depositAsset: {
      ...depositAsset,
      usdValue: usdValueDepositAsset,
    },
    ...rest,
  }
}
