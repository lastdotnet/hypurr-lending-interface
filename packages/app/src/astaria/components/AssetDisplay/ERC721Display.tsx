import { IconAlertTriangleFilled } from '@tabler/icons-react'

import { isVerifiedCollection } from '@/app/intents/_/isVerifiedCollection'
import { Image } from '@/astaria/components/AssetImageBox/components/Image'
import { getAssetName } from '@/astaria/components/AssetName'
import { BlockExplorerLink } from '@/astaria/components/BlockExplorerLink'
import { Button } from '@/astaria/components/Button'
import { CurrencyAmountWrapper } from '@/astaria/components/CurrencyAmountWrapper'
import { DetailsDisplayTooltip } from '@/astaria/components/DetailsDisplayTooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/astaria/components/Popover'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { shorten } from '@/astaria/utils/shorten'

import { type ERC721 } from 'assets'

export const ERC721Display = ({
  asset,
  className,
  linkAssetToBlockExplorer,
  skeleton,
  textClassName,
  triggerExtraWording,
}: {
  asset: ERC721
  className?: string
  linkAssetToBlockExplorer?: boolean
  skeleton?: boolean
  textClassName?: string
  triggerExtraWording?: string
}) => {
  const getCollectionName = () => {
    if (skeleton) {
      return <SkeletonText />
    }
    if (asset.collection.name) {
      return asset.collection.name
    }
    return null
  }

  return (
    <CurrencyAmountWrapper className={className}>
      <Image
        alt={getAssetName({ asset }) ?? 'asset image'}
        height={32}
        skeleton={skeleton}
        src={asset.image}
        width={32}
      />
      <span className={textClassName}>
        {linkAssetToBlockExplorer ? (
          <BlockExplorerLink showIcon={false} type="address" value={asset.address}>
            {getCollectionName()}
          </BlockExplorerLink>
        ) : (
          <span>{getCollectionName()}</span>
        )}{' '}
        #
        {skeleton ? (
          <SkeletonText />
        ) : (
          <>
            <DetailsDisplayTooltip
              content={asset.tokenId.toString()}
              trigger={shorten({
                maxLength: 10,
                value: asset.tokenId.toString(),
              })}
            />
            {triggerExtraWording ? <> {triggerExtraWording}</> : null}
          </>
        )}
      </span>
      {!isVerifiedCollection(asset) ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button aria-label="Warning" className="align-middle" emphasis="low" size="icon-xs">
              <IconAlertTriangleFilled className="inline h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            Astaria has not verified{' '}
            <BlockExplorerLink type="address" value={asset.address}>
              {getCollectionName()}
            </BlockExplorerLink>
            . Confirm its details and proceed at your own risk.
          </PopoverContent>
        </Popover>
      ) : null}
    </CurrencyAmountWrapper>
  )
}
