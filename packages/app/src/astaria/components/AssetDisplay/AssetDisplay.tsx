import { ERC20Display } from '@/astaria/components/AssetDisplay/ERC20Display'
import { ERC721Display } from '@/astaria/components/AssetDisplay/ERC721Display'
import { CurrencyAmountWrapper } from '@/astaria/components/CurrencyAmountWrapper'
import { SkeletonIcon } from '@/astaria/components/SkeletonIcon'
import { SkeletonText } from '@/astaria/components/SkeletonText'

import { type Asset, isERC20Asset, isERC721Asset } from 'assets'

export const AssetDisplay = ({
  asset,
  className,
  hideUSDValue,
  highPrecision,
  linkAssetToBlockExplorer,
  mock,
  noTooltip,
  size,
  skeleton,
  triggerExtraWording,
}: {
  asset: Asset | undefined
  className?: string
  hideUSDValue?: boolean
  highPrecision?: boolean
  linkAssetToBlockExplorer?: boolean
  mock?: boolean
  noTooltip?: boolean
  size?: 'md' | 'sm' | 'xl'
  skeleton?: boolean
  triggerExtraWording?: string
}) => {
  if (isERC20Asset(asset)) {
    return (
      <ERC20Display
        className={className}
        erc20={asset}
        hideUSDValue={hideUSDValue}
        highPrecision={highPrecision}
        linkAssetToBlockExplorer={linkAssetToBlockExplorer}
        mock={mock}
        noTooltip={noTooltip}
        size={size}
        skeleton={skeleton}
        triggerExtraWording={triggerExtraWording}
      />
    )
  }

  if (isERC721Asset(asset)) {
    return (
      <ERC721Display
        asset={asset}
        linkAssetToBlockExplorer={linkAssetToBlockExplorer}
        skeleton={skeleton}
        textClassName={className}
        triggerExtraWording={triggerExtraWording}
      />
    )
  }

  if (skeleton) {
    return (
      <CurrencyAmountWrapper>
        <SkeletonIcon />
        <SkeletonText />
      </CurrencyAmountWrapper>
    )
  }

  return null
}
