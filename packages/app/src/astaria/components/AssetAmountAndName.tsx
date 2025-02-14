import { ERC721Name } from '@/astaria/components/AssetName'
import { CurrencyAmount } from '@/astaria/components/CurrencyAmount'
import { SkeletonText } from '@/astaria/components/SkeletonText'

import { isERC20Asset, isERC721Asset } from 'assets'
import { type Asset, type IntentAsset } from 'assets'

export const AssetAmountAndName = ({
  asset,
  assetAmount,
  className,
  showFullName,
  skeleton,
}: {
  asset: Asset | IntentAsset | undefined
  assetAmount?: bigint
  className?: string
  showFullName?: boolean
  skeleton?: boolean
}) => {
  if (skeleton) {
    return <SkeletonText className={className} />
  }

  if (!asset) {
    return null
  }

  if (isERC20Asset(asset)) {
    return (
      <span className={className}>
        <CurrencyAmount amount={assetAmount ?? asset.amount} decimals={asset.decimals} usdValue={asset.usdValue} />{' '}
        {asset.symbol}
        {showFullName ? <> ({asset.name})</> : null}
      </span>
    )
  }

  if (isERC721Asset(asset)) {
    return <ERC721Name erc721={asset} />
  }

  return null
}
