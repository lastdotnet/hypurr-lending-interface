import { type Asset, type ERC20Asset, type ERC721, isERC20Asset, isERC721Asset } from 'assets'

export const convertAssetAndAmountToAsset = ({
  amount,
  asset,
}: {
  amount: bigint | undefined
  asset: ERC20Asset | ERC721
}): Asset => {
  if (isERC20Asset(asset)) {
    return { ...asset, amount: amount || 0n }
  }
  if (isERC721Asset(asset)) {
    return asset
  }
  // This case should never happen
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return asset
}
