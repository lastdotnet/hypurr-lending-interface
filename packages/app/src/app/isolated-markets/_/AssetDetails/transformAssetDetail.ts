import { ChainIdSchema } from 'chains'
import { AddressSchema } from 'common'

import { getSpentItemCacheKey } from '@/app/api/_/getSpentItemCacheKey'
import { type AssetDetail, AssetDetailSchema } from '@/astaria/types-internal/market-schemas'
import { fetchUSDValue } from '@/astaria/utils/fetchUSDValue'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type Asset, type ERC20, isERC20Asset } from 'assets'
import { type Erc20Stats } from 'indexer/model'
import { ItemType, type SpentItem, SpentItemSchema } from 'sdk'

export const transformAssetDetail = async ({
  assets,
  erc20Stats,
}: {
  assets: Map<string, Asset>
  erc20Stats: Erc20Stats
}) => {
  const spentItem: SpentItem = {
    amount: 0n,
    identifier: 0n,
    itemType: ItemType.ERC20,
    token: AddressSchema.parse(erc20Stats.address),
  }

  const erc20 = assets.get(getSpentItemCacheKey({ item: SpentItemSchema.parse(spentItem) }))
  if (!isERC20Asset(erc20)) {
    throw new Error('ERC20_STATS_ASSET_INVALID', {
      cause: 'Asset type for erc20 stats is invalid',
    })
  }
  const refinedERC20: ERC20 = erc20
  const totalBorrowed = erc20Stats.totalDebt
  const totalCollateral = erc20Stats.totalCollateral

  const usdValue = await fetchUSDValue({
    address: AddressSchema.parse(erc20Stats.address),
    chainId: ChainIdSchema.parse(erc20Stats.chainId),
  })
  const usdValueBorrowed = getUSDValue({
    amount: totalBorrowed,
    decimals: refinedERC20.decimals,
    usdValue,
  })
  const usdValueCollateral = getUSDValue({
    amount: totalCollateral,
    decimals: refinedERC20.decimals,
    usdValue,
  })

  const transformedAssetDetail: AssetDetail = {
    avgApy: erc20Stats.avgApy,
    erc20: refinedERC20,
    totalBorrowed,
    totalCollateral,
    usdValueBorrowed,
    usdValueCollateral,
  }
  return AssetDetailSchema.parse(transformedAssetDetail)
}
