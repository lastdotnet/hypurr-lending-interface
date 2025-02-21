import { type ChainId } from 'chains'

import { getScanDetails } from '@/app/isolated/intents/_/ScanLink'
import { AssetName } from '@/astaria/components/AssetName'
import { TextLink } from '@/astaria/components/TextLink'

import type { Asset, IntentAsset } from 'assets'

export const IntentViewOnExplorer = ({
  asset,
  chainId,
}: {
  asset: Asset | IntentAsset | undefined
  chainId: ChainId | undefined
}) => {
  const { href, name } = getScanDetails({ asset, chainId })
  return (
    <TextLink href={href}>
      View <AssetName asset={asset} /> on {name}
    </TextLink>
  )
}
