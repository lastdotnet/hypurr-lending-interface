import { AssetCache, type AssetIdentifier } from '@/app/api/_/getAssetsMetadata/assetMetadataCache'

export type { AssetIdentifier }

const assetCache = new AssetCache()

const getDistinctAssets = (assets: AssetIdentifier[]) => [
  ...new Map(assets.map((asset) => [asset.address, asset])).values(),
]

export const getAssetsMetadata = ({ assets }: { assets: AssetIdentifier[] }) =>
  assetCache.getAssetMap({ assets: getDistinctAssets(assets) })

export const warmAssetsMetadataCache = assetCache.warmAssetMetadataCache
