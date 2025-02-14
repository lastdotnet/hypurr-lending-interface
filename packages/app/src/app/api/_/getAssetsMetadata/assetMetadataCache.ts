import { type Address } from 'viem'

import { type VercelKV, createClient } from '@vercel/kv'
import { type ChainId } from 'chains'
import { AddressSchema } from 'common'
import { secondsInHour } from 'date-fns/constants'

import { SimpleHash } from '@/astaria/codegen/api/simplehash/SimpleHash'
import { ENV } from '@/astaria/constants/environment'
import { SIMPLE_HASH_NETWORK_MAP } from '@/astaria/constants/simpleHash'
import { executeHelper } from '@/astaria/onchain-helpers/executeHelper'
import {
  ERC20MetadataHelperABI,
  ERC20MetadataHelperBytecode,
} from '@/astaria/onchain-helpers/fragments/ERC20MetadataHelper'
import { fetchAssetsUSDValue } from '@/astaria/utils/fetchUSDValue'

import { type Asset, type ERC20Asset, type ERC721, ERC721Schema } from 'assets'

const usdValueCacheExpiration = 15
const metadataCacheExpiration = secondsInHour

type AssetMetadata = Exclude<Asset, 'usdValue'>
type AssetToResolve = { asset: AssetIdentifier; index: number }

export interface AssetIdentifier {
  address: Address
  chainId: ChainId
  tokenId?: bigint
}

export class AssetCache {
  #client: VercelKV | undefined = undefined
  #simplehash: SimpleHash | undefined = undefined
  #isSimplehashError = false

  constructor() {
    if (!process.env.ASSET_CACHE_REST_API_TOKEN || !process.env.ASSET_CACHE_REST_API_URL) {
      console.warn(
        'AssetMetadataCache: Cache not initialized, missing ASSET_CACHE_REST_API_TOKEN or ASSET_CACHE_REST_API_URL',
      )
      return
    }

    this.#client = createClient({
      automaticDeserialization: false,
      token: process.env.ASSET_CACHE_REST_API_TOKEN,
      url: process.env.ASSET_CACHE_REST_API_URL,
    })

    this.#simplehash = new SimpleHash({
      HEADERS: {
        'X-API-KEY': ENV.NEXT_PUBLIC_SIMPLEHASH_API_KEY,
      },
    })
  }

  private serialize = <TData>(value: TData): string =>
    JSON.stringify(value, (key, value) => (!!key && typeof value === 'bigint' ? value.toString() : value))

  private deserialize = <TData>(value: string, bigintFields: string[]): TData =>
    JSON.parse(value, (key, value) => (bigintFields.includes(key) ? BigInt(value) : value))

  private setSimplehashError = async (value: boolean) => {
    if (this.#isSimplehashError === value || !process.env.SIMPLE_HASH_STATUS_KEY) {
      return
    }
    this.#isSimplehashError = value
    await this.#client?.set(process.env.SIMPLE_HASH_STATUS_KEY, value)
  }

  public isReady = () => !!this.#client

  private getMany = (keys: string[]) => {
    if (!this.isReady()) {
      return undefined
    }

    return keys.length > 0 ? this.#client?.mget<(string | null)[]>(keys) : ([] as (string | null)[])
  }

  private resolveAssets = ({
    erc20AssetMetadataToResolve,
    erc20AssetUsdValuesToResolve,
    erc721AssetMetadataToResolve,
  }: {
    erc20AssetMetadataToResolve: AssetToResolve[]
    erc20AssetUsdValuesToResolve: AssetToResolve[]
    erc721AssetMetadataToResolve: AssetToResolve[]
  }) =>
    Promise.all([
      this.resolveERC721AssetMetadata({
        assets: erc721AssetMetadataToResolve.map(({ asset }) => asset),
      }),
      this.resolveERC20AssetMetadata({
        assets: erc20AssetMetadataToResolve.map(({ asset }) => asset),
      }),
      this.resolveERC20AssetUsdValues({
        assets: erc20AssetUsdValuesToResolve.map(({ asset }) => asset),
      }),
    ])

  public warmAssetMetadataCache = ({ assets }: { assets: AssetIdentifier[] }) =>
    this.resolveAssets({
      ...this.getAssetsToResolve({
        assets,
        metadatas: getDefinedArray(undefined, assets.length),
        usdValues: getDefinedArray(undefined, assets.length),
      }),
    })

  private getMetadataAndUSDValues = async ({
    assets,
  }: {
    assets: AssetIdentifier[]
  }) => {
    const { metadataCacheKeys, usdValueCacheKeys } = this.getCacheKeys({
      assets,
    })
    const [metadatasRes, usdValuesRes] = await Promise.all([
      this.getMany(metadataCacheKeys),
      this.getMany(usdValueCacheKeys),
    ]).then((results) => results.map((result) => getDefinedArray(result, assets.length)))

    const metadatas = metadatasRes.map((metadata) =>
      metadata === null ? metadata : this.deserializeMetadata(metadata),
    )
    const usdValues = usdValuesRes.map((usdValue) =>
      usdValue === null ? usdValue : this.deserialize<number>(usdValue, []),
    )
    return { metadatas, usdValues }
  }

  public getAssetMap = async ({ assets }: { assets: AssetIdentifier[] }) => {
    const { metadataCacheKeys } = this.getCacheKeys({
      assets,
    })
    const { metadatas, usdValues } = await this.getMetadataAndUSDValues({
      assets,
    })

    const { erc20AssetMetadataToResolve, erc20AssetUsdValuesToResolve, erc721AssetMetadataToResolve } =
      this.getAssetsToResolve({ assets, metadatas, usdValues })

    const [resolvedERC721AssetMetadata, resolvedERC20AssetMetadata, resolvedERC20AssetUsdValues] =
      await this.resolveAssets({
        erc20AssetMetadataToResolve,
        erc20AssetUsdValuesToResolve,
        erc721AssetMetadataToResolve,
      })

    erc721AssetMetadataToResolve.forEach(
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      ({ index }, resolvedIndex) => (metadatas[index] = resolvedERC721AssetMetadata[resolvedIndex]),
    )

    erc20AssetMetadataToResolve.forEach(
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      ({ index }, resolvedIndex) => (metadatas[index] = resolvedERC20AssetMetadata[resolvedIndex]),
    )

    erc20AssetUsdValuesToResolve.forEach(
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      ({ index }, resolvedIndex) => (usdValues[index] = resolvedERC20AssetUsdValues[resolvedIndex]),
    )

    return assets.reduce<Map<string, Asset>>((result, asset, index) => {
      const metadata = metadatas.at(index)

      if (!metadata) {
        console.warn(
          'metadata not resolved',
          this.getMetadataCacheKey({
            address: asset.address,
            tokenId: asset.tokenId,
          }),
          asset,
        )
      }

      const assetCacheItem = asset.tokenId ? metadata : { ...metadata, usdValue: usdValues[index] }

      result.set(metadataCacheKeys[index], assetCacheItem)
      return result
    }, new Map<string, Asset>())
  }

  private resolveERC721AssetMetadata = async ({
    assets,
  }: {
    assets: AssetIdentifier[]
  }) => {
    if (assets.length === 0) {
      return []
    }
    if (!this.#simplehash) {
      this.#simplehash = new SimpleHash({
        HEADERS: {
          'X-API-KEY': ENV.NEXT_PUBLIC_SIMPLEHASH_API_KEY,
        },
      })
    }

    const assetMetadatas = await this.#simplehash?.default.nftsByTokenList({
      nftIds: assets
        .map((asset) => `${SIMPLE_HASH_NETWORK_MAP[asset.chainId]}.${asset.address}.${asset.tokenId}`)
        .join(','),
    })

    if (!assetMetadatas?.nfts) {
      await this.setSimplehashError(true)
      throw new Error('NO_ASSET_METADATA')
    }
    await this.setSimplehashError(false)
    return Promise.all(
      assetMetadatas?.nfts.map(async (asset) => {
        if (!!asset.contract_address && !!asset.token_id) {
          const transformedAddress = AddressSchema.parse(asset.contract_address.toLowerCase())
          const transformedERC721: ERC721 = {
            address: transformedAddress,
            collection: {
              image: asset.collection?.image_url ?? undefined,
              name: asset.collection?.name ?? undefined,
            },
            image: asset.image_url ?? undefined,
            tokenId: BigInt(asset.token_id),
          }
          const cacheKey = this.getMetadataCacheKey({
            address: transformedERC721.address,
            tokenId: transformedERC721.tokenId,
          })

          const erc721 = ERC721Schema.parse(transformedERC721)

          if (this.isReady()) {
            await this.#client
              ?.set(cacheKey, this.serialize(erc721), {
                ex: metadataCacheExpiration,
              })
              .catch((error) => {
                console.error(error)
              })
          }

          return erc721
        }
        console.warn('could not find metadata for nft')
        return null
      }),
    )
  }
  private resolveERC20AssetUsdValues = async ({
    assets,
  }: {
    assets: AssetIdentifier[]
  }) => {
    if (assets.length === 0) {
      return []
    }

    const usdValues = await fetchAssetsUSDValue({
      assets,
    })

    if (this.isReady()) {
      try {
        await Promise.all(
          usdValues.map((usdValue, index) => {
            this.#client?.set(
              this.getUsdValueCacheKey(
                this.getMetadataCacheKey({
                  address: assets[index].address,
                }),
              ),
              this.serialize(usdValue),
              { ex: usdValueCacheExpiration },
            )
          }),
        )
      } catch (error) {
        console.error(error)
      }
    }

    return usdValues
  }

  private getERC20AssetChains = ({ assets }: { assets: AssetIdentifier[] }) => {
    const chainsMap = assets.map(({ chainId }) => chainId)
    return [...new Set(chainsMap)]
  }

  private resolveERC20AssetMetadata = async ({
    assets,
  }: {
    assets: AssetIdentifier[]
  }): Promise<ERC20Asset[]> => {
    if (assets.length === 0) {
      return []
    }
    const chainIds = this.getERC20AssetChains({ assets })

    const erc20MetadataCrossChain = chainIds.map(async (chainId) => {
      const assetsOnThisChain = assets.filter((asset) => asset.chainId === chainId)

      const erc20Metadata = await executeHelper({
        abi: ERC20MetadataHelperABI,
        args: [assetsOnThisChain.map((asset) => asset.address)],
        bytecode: ERC20MetadataHelperBytecode,
        chainId,
        functionName: 'readMetadata',
      }).then((result) =>
        result.map((metadata: { [x: string]: any; token: any }) => {
          const { token, ...rest } = metadata
          return {
            address: AddressSchema.parse(token.toLowerCase()),
            chainId,
            ...rest,
          }
        }),
      )
      return erc20Metadata
    })
    const resolvedERC20Metadata = await Promise.all(erc20MetadataCrossChain)
    const erc20Metadata = resolvedERC20Metadata.flat()

    //Cache results
    if (this.isReady()) {
      try {
        await Promise.all(
          erc20Metadata.map((erc20Metadata: { address: any }) => {
            this.#client?.set(
              this.getMetadataCacheKey({
                address: erc20Metadata.address,
              }),
              this.serialize(erc20Metadata),
              { ex: metadataCacheExpiration },
            )
          }),
        )
      } catch (error) {
        console.error(error)
      }
    }

    return erc20Metadata
  }

  private deserializeMetadata = (metadata: string) => this.deserialize<AssetMetadata>(metadata, ['amount', 'tokenId'])

  private getMetadataCacheKey = ({
    address,
    tokenId,
  }: {
    address: Address
    tokenId?: bigint
  }) => {
    if (typeof tokenId === 'bigint') {
      // ERC721
      return `${address.toLowerCase()}.${tokenId.toString()}`
    }

    return `${address.toLowerCase()}`
  }

  private getAssetsToResolve = ({
    assets,
    metadatas,
    usdValues,
  }: {
    assets: AssetIdentifier[]
    metadatas: AssetMetadata[]
    usdValues: number[]
  }) => {
    const erc20AssetMetadataToResolve: AssetToResolve[] = []
    const erc20AssetUsdValuesToResolve: AssetToResolve[] = []
    const erc721AssetMetadataToResolve: AssetToResolve[] = []

    assets.forEach((asset, index) => {
      if (!!asset.tokenId && metadatas[index] === null) {
        erc721AssetMetadataToResolve.push({ asset, index })
        return
      }

      if (metadatas[index] === null) {
        erc20AssetMetadataToResolve.push({ asset, index })
      }

      if (usdValues[index] === null) {
        erc20AssetUsdValuesToResolve.push({ asset, index })
      }
    })
    return {
      erc20AssetMetadataToResolve,
      erc20AssetUsdValuesToResolve,
      erc721AssetMetadataToResolve,
    }
  }

  private getUsdValueCacheKey = (metadataCacheKey: string) => `${metadataCacheKey}-usd-value`

  private getCacheKeys = ({ assets }: { assets: AssetIdentifier[] }) => {
    const metadataCacheKeys = assets.map((asset) =>
      this.getMetadataCacheKey({
        address: asset.address,
        tokenId: asset.tokenId,
      }),
    )
    const usdValueCacheKeys = metadataCacheKeys.map((metadataCacheKey) => this.getUsdValueCacheKey(metadataCacheKey))
    return { metadataCacheKeys, usdValueCacheKeys }
  }
}
function getDefinedArray<T>(arr: (T | null)[] | undefined, length: number) {
  return arr === undefined ? new Array(length).fill(null) : arr
}
