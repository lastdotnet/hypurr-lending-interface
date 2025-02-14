import { type ChainId } from 'chains'
import { AddressSchema } from 'common'

import { getAssetsMetadata } from '@/app/api/_/getAssetsMetadata/getAssetsMetadata'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { isERC20Asset } from 'assets'
import { type SpentItem } from 'indexer/model'
import { ItemType } from 'sdk'

export const calculateIntentUsdValues = async ({
  chainId,
  token,
}: {
  chainId: ChainId
  token: SpentItem | undefined
}) => {
  if (!token || token.itemType !== ItemType.ERC20) {
    return 0
  }

  const assets = await getAssetsMetadata({
    assets: [{ address: AddressSchema.parse(token.token), chainId }],
  })

  const result = assets.get(token.token.toLowerCase())
  if (!result || !isERC20Asset(result)) {
    return 0
  }

  const usdValueAsset = getUSDValue({
    amount: token.amount,
    decimals: result.decimals,
    usdValue: result.usdValue,
  })

  return usdValueAsset || 0
}
