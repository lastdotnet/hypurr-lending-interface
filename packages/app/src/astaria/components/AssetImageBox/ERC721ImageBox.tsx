import Image from 'next/image'

import { clsx } from 'clsx'

import LogoBlack from '@/astaria/assets/logo/logo-black.svg?url'
import { Image as ImageComponent } from '@/astaria/components/AssetImageBox/components/Image'
import { IndicatorBox } from '@/astaria/components/AssetImageBox/components/IndicatorBox'
import { InfoBox } from '@/astaria/components/AssetImageBox/components/InfoBox'
import { InfoTokenBox } from '@/astaria/components/AssetImageBox/components/InfoTokenBox'
import { getAssetName } from '@/astaria/components/AssetName'
import { DetailsDisplayTooltip } from '@/astaria/components/DetailsDisplayTooltip'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { shorten } from '@/astaria/utils/shorten'

import { type ERC721 } from 'assets'

const ERC721InfoBox = ({
  asset,
  skeleton,
}: {
  asset: ERC721
  skeleton?: boolean
}) => (
  <>
    <ImageComponent
      alt={asset.collection.name ?? 'collection image'}
      className="h-full border-r border-solid"
      height={32}
      skeleton={skeleton}
      src={asset.collection.image}
      width={32}
    />
    {skeleton || !!asset ? (
      <InfoTokenBox>
        #{skeleton ? <SkeletonText /> : null}
        {asset ? (
          <DetailsDisplayTooltip
            content={asset.tokenId.toString()}
            trigger={shorten({
              maxLength: 10,
              value: asset.tokenId.toString(),
            })}
          />
        ) : null}
      </InfoTokenBox>
    ) : null}
  </>
)

export const ERC721ImageBox = ({
  asset,
  className,
  inCard,
  indicator = true,
  isClaimable,
  isLiveAuction,
  isRepaying,
  rounded,
  skeleton,
  ...rest
}: {
  asset: ERC721
  className?: string
  inCard?: boolean
  indicator?: boolean
  isClaimable?: boolean
  isLiveAuction?: boolean
  isRepaying?: boolean
  rounded?: false | 'full' | 'md' | 'sm'
  skeleton?: boolean
}) => (
  <div className={clsx('relative overflow-hidden', className)} {...rest}>
    <InfoBox>
      <ERC721InfoBox asset={asset} skeleton={skeleton} />
    </InfoBox>
    {indicator ? (
      <IndicatorBox>
        <Image alt="Astaria" className="w-full" src={LogoBlack} />
      </IndicatorBox>
    ) : null}

    <ImageComponent
      alt={getAssetName({ asset }) ?? 'asset image'}
      className={clsx({ border: inCard })}
      cover
      rounded={rounded}
      skeleton={skeleton}
      src={asset.image}
    />
  </div>
)
