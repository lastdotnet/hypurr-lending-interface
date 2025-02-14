import { DetailsDisplayTooltip } from '@/astaria/components/DetailsDisplayTooltip'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { getCollectionNameAndTokenId } from '@/astaria/utils/getCollectionNameAndTokenId'
import { shorten } from '@/astaria/utils/shorten'

import { type Asset, type ERC721, type IntentAsset, isERC20Asset, isERC721Asset } from 'assets'

export const getAssetName = ({
  asset,
}: {
  asset: Asset | IntentAsset | undefined
}) => {
  if (!asset) {
    return null
  }

  if (isERC20Asset(asset)) {
    return `${asset.name} (${asset.symbol})`
  }

  if (isERC721Asset(asset)) {
    return getCollectionNameAndTokenId(asset)
  }

  return null
}

export const ERC721Name = ({
  className,
  erc721,
}: {
  className?: string
  erc721: ERC721
}) => {
  const tokenId = (
    <DetailsDisplayTooltip
      content={erc721.tokenId.toString()}
      trigger={shorten({
        maxLength: 10,
        value: erc721.tokenId.toString(),
      })}
    />
  )
  if (erc721.collection.name) {
    return (
      <span className={className}>
        {erc721.collection.name} {tokenId}
      </span>
    )
  }

  return <span className={className}>#{tokenId}</span>
}

export const AssetName = ({
  asset,
  className,
  showFullName,
  skeleton,
}: {
  asset: Asset | IntentAsset | undefined
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
        {asset.symbol}
        {showFullName ? <> ({asset.name})</> : null}
      </span>
    )
  }

  if (isERC721Asset(asset)) {
    return <ERC721Name className={className} erc721={asset} />
  }

  return null
}
