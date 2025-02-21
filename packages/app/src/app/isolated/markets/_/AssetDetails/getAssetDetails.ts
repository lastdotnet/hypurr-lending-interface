'use server'

import { sepolia } from 'viem/chains'

import { ChainIdSchema } from 'chains'
import { AddressSchema } from 'common'
import { MoreThan, MoreThanOrEqual, Not } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { type AssetIdentifier, getAssetsMetadata } from '@/app/api/_/getAssetsMetadata'
import { sumAssetDetails } from '@/app/isolated/markets/_/AssetDetails/sumAssetsDetails'
import { transformAssetDetail } from '@/app/isolated/markets/_/AssetDetails/transformAssetDetail'
import {
  type GETAssetDetailsParameters,
  type GETAssetDetailsResponse,
  GETAssetDetailsResponseSchema,
} from '@/astaria/types-internal/market-schemas'
import { getFulfilledResponses } from '@/astaria/utils/getFulfilledResponses'

import { Erc20Stats } from 'indexer/model'

export const getAssetDetails = async ({ isTestnet, limit, offset }: GETAssetDetailsParameters) => {
  const dataSource = await initializeDataSource()
  const where = [
    {
      chainId: isTestnet ? sepolia.id : Not(sepolia.id),
      totalCollateral: MoreThan(0n),
      totalDebt: MoreThanOrEqual(0n),
    },
    {
      chainId: isTestnet ? sepolia.id : Not(sepolia.id),
      totalCollateral: MoreThanOrEqual(0n),
      totalDebt: MoreThan(0n),
    },
  ]

  const [erc20Stats, total] = await dataSource.manager.getRepository(Erc20Stats).findAndCount({
    order: {
      totalCollateral: 'DESC',
    },
    skip: offset,
    take: limit,
    where,
  })
  const assetIdentifiers = erc20Stats.map<AssetIdentifier>((erc20Stat) => ({
    address: AddressSchema.parse(erc20Stat.address),
    chainId: ChainIdSchema.parse(erc20Stat.chainId),
  }))
  const assets = await getAssetsMetadata({
    assets: assetIdentifiers,
  })

  const assetDetailsForAllChains = getFulfilledResponses(
    await Promise.allSettled(
      erc20Stats.map(
        async (erc20Stats) =>
          await transformAssetDetail({
            assets,
            erc20Stats,
          }),
      ),
    ),
  )

  const combinedAssetDetails = sumAssetDetails(assetDetailsForAllChains).sort(
    (a, b) => (b.usdValueCollateral || 0) - (a.usdValueCollateral || 0),
  )

  const transformedResponse: GETAssetDetailsResponse = {
    assetDetails: combinedAssetDetails,
    paging: {
      itemsReturned: erc20Stats.length,
      limit,
      offset,
      onLastPage: offset + limit >= total,
      total,
    },
  }
  return GETAssetDetailsResponseSchema.parse(transformedResponse)
}
