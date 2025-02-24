import { type Asset, isERC721Asset } from 'assets'

export const getCollectionNameAndTokenId = (asset: Asset | undefined) => {
  if (isERC721Asset(asset)) {
    if (asset.collection.name) {
      return `${asset.collection.name} ${asset.tokenId}`
    }

    return `#${asset.tokenId}`
  }

  return null
}
