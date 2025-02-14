import {
  type Asset,
  type IntentAsset,
  isERC20Asset,
  isERC721Asset,
} from 'assets';

export const getAssetsName = ({ asset }: { asset: Asset | IntentAsset }) => {
  if (isERC20Asset(asset)) {
    return asset.symbol;
  }
  if (isERC721Asset(asset)) {
    if (!asset.collection || !asset.collection.name) {
      return `NFTs from this collection`;
    }
    return `${asset.collection.name} NFTs`;
  }
  return null;
};
