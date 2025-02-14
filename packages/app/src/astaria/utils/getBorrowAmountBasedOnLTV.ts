import { numberToBigInt, numberToPercent } from 'common'

import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type ERC20Asset, type IntentAsset, isERC20Asset } from 'assets'

export const getBorrowAmountBasedOnLTV = ({
  borrowAsset,
  collateralAmount,
  collateralAsset,
  ltv,
}: {
  borrowAsset: ERC20Asset
  collateralAmount: bigint
  collateralAsset: IntentAsset
  ltv: number
}) => {
  const usdValueCollateral = isERC20Asset(collateralAsset)
    ? getUSDValue({
        amount: collateralAmount,
        decimals: collateralAsset.decimals,
        usdValue: collateralAsset.usdValue,
      })
    : undefined

  if (usdValueCollateral === undefined) {
    return 0n
  }

  const usdAmountBorrowShouldBe = usdValueCollateral * numberToPercent(ltv)

  return numberToBigInt({
    amount: usdAmountBorrowShouldBe / (borrowAsset.usdValue || 1),
    decimals: borrowAsset.decimals,
  })
}

export const getCollateralAmountBasedOnLTV = ({
  borrowAmount,
  borrowAsset,
  collateralAsset,
  ltv,
}: {
  borrowAmount: bigint
  borrowAsset: ERC20Asset
  collateralAsset: ERC20Asset
  ltv: number
}) => {
  const usdValueBorrow = getUSDValue({
    amount: borrowAmount,
    decimals: borrowAsset.decimals,
    usdValue: borrowAsset.usdValue,
  })

  if (usdValueBorrow === undefined) {
    return 0n
  }

  const usdAmountCollateralShouldBe = usdValueBorrow / numberToPercent(ltv)

  return numberToBigInt({
    amount: usdAmountCollateralShouldBe / (collateralAsset.usdValue || 1),
    decimals: collateralAsset.decimals,
  })
}
