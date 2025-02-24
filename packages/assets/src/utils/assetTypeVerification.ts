import { type Asset, type ERC20, type ERC721, type IntentAsset } from '../types'

export const isERC20Asset = (asset: Asset | IntentAsset | undefined): asset is ERC20 =>
  !!asset && ('amount' in asset || 'decimals' in asset || 'name' in asset || 'symbol' in asset)

export const isERC721Asset = (asset: Asset | IntentAsset | undefined): asset is ERC721 =>
  !!asset && ('collection' in asset || 'image' in asset || 'tokenId' in asset)
