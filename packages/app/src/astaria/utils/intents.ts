import { type Asset, isERC20Asset, isERC721Asset } from 'assets'
import { ItemType } from 'sdk'

export const convertAssetTypeToItemType = (asset: Asset): number => {
  if (isERC20Asset(asset)) {
    return ItemType.ERC20
  }
  if (isERC721Asset(asset)) {
    return ItemType.ERC721
  }
  return 0
}
