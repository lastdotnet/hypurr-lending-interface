import { clsx } from 'clsx'

import { ERC20ImageBox } from '@/astaria/components/AssetImageBox/ERC20ImageBox'
import { ERC721ImageBox } from '@/astaria/components/AssetImageBox/ERC721ImageBox'
import { Image } from '@/astaria/components/AssetImageBox/components/Image'

import { type Asset, isERC20Asset, isERC721Asset } from 'assets'

export const AssetImageBox = ({
  asset,
  className,
  inCard,
  indicator = true,
  isClaimable,
  isLiveAuction,
  isRepaying,
  priority,
  rounded = 'sm',
  skeleton,
}: {
  asset: Asset | undefined
  className?: string
  inCard?: boolean
  indicator?: boolean
  isClaimable?: boolean
  isLiveAuction?: boolean
  isRepaying?: boolean
  priority?: boolean
  rounded?: false | 'full' | 'md' | 'sm'
  skeleton?: boolean
}) => {
  if (skeleton) {
    return (
      <Image
        alt="placeholder image"
        className={clsx({ border: inCard }, className)}
        cover
        rounded={rounded}
        skeleton={skeleton}
      />
    )
  }

  if (isERC20Asset(asset)) {
    return (
      <ERC20ImageBox
        className={className}
        erc20={asset}
        inCard={inCard}
        indicator={indicator}
        isClaimable={isClaimable}
        isLiveAuction={isLiveAuction}
        isRepaying={isRepaying}
        priority={priority}
        skeleton={skeleton}
      />
    )
  }
  if (isERC721Asset(asset)) {
    return (
      <ERC721ImageBox
        asset={asset}
        className={className}
        inCard={inCard}
        indicator={indicator}
        isClaimable={isClaimable}
        isLiveAuction={isLiveAuction}
        isRepaying={isRepaying}
        rounded={rounded}
        skeleton={skeleton}
      />
    )
  }

  return null
}
