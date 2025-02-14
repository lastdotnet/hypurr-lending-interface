import { LTVDisplay } from '@/astaria/components/LTVDisplay'
import { getLTV } from '@/astaria/utils/getLTV'

import { type ERC20Asset } from 'assets'

export const LTV = ({
  borrowAmount,
  borrowAsset,
  className,
  collateralAmount,
  collateralAsset,
  showHighLTVWarning,
  ...rest
}: {
  borrowAmount: bigint | undefined
  borrowAsset: ERC20Asset
  className?: string
  collateralAmount: bigint | undefined
  collateralAsset: ERC20Asset
  showHighLTVWarning?: boolean
}) => {
  const ltv = getLTV({
    borrowAmount,
    borrowAsset,
    collateralAmount,
    collateralAsset,
  })

  return (
    <LTVDisplay
      {...rest}
      className={className}
      decimals={borrowAsset.decimals}
      ltv={ltv}
      showHighLTVWarning={showHighLTVWarning}
    />
  )
}
