import { getDefaultERC20BorrowToken } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/getDefaultERC20BorrowToken'
import { getDefaultERC20CollateralToken } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/getDefaultERC20CollateralToken'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useUSDValue } from '@/astaria/hooks/useUSDValue'

export const useDefaultAssets = () => {
  const chainId = useChainId()
  const borrowAsset = getDefaultERC20BorrowToken({ chainId })
  const collateralAsset = getDefaultERC20CollateralToken({ chainId })

  const { data: usdValueBorrowAsset, isPending: isPendingUSDValueBorrowAsset } = useUSDValue(borrowAsset)
  const { data: usdValueCollateralAsset, isPending: isPendingUSDValueCollateralAsset } = useUSDValue(collateralAsset)

  return {
    borrowAsset: {
      ...borrowAsset,
      usdValue: usdValueBorrowAsset,
    },
    collateralAsset: {
      ...collateralAsset,
      usdValue: usdValueCollateralAsset,
    },
    isPending: isPendingUSDValueBorrowAsset || isPendingUSDValueCollateralAsset,
  }
}
