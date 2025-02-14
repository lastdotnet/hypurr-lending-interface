import { percentToNumber } from 'common'

import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type ERC20Asset, type IntentAsset, isERC20Asset } from 'assets'

export const getLTV = ({
  borrowAmount,
  borrowAsset,
  collateralAmount,
  collateralAsset,
}: {
  borrowAmount: bigint | undefined
  borrowAsset: ERC20Asset
  collateralAmount: bigint | undefined
  collateralAsset: IntentAsset
}) => {
  const usdValueBorrow = getUSDValue({
    amount: borrowAmount,
    decimals: borrowAsset.decimals,
    usdValue: borrowAsset.usdValue,
  })
  const usdValueCollateral = isERC20Asset(collateralAsset)
    ? getUSDValue({
        amount: collateralAmount,
        decimals: collateralAsset.decimals,
        usdValue: collateralAsset.usdValue,
      })
    : undefined

  if (usdValueBorrow === 0 && usdValueCollateral === 0) {
    return 0
  }
  if (usdValueBorrow === undefined || usdValueCollateral === undefined) {
    return null
  }

  return percentToNumber(usdValueBorrow / usdValueCollateral)
}
