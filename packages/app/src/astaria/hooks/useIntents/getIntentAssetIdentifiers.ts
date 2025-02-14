import { ChainIdSchema } from 'chains'
import { AddressSchema } from 'common'

import type { AssetIdentifier } from '@/app/api/_/getAssetsMetadata'
import { mapItemTypeToAssetType } from '@/astaria/utils/mapItemTypeToAssetType'

import type { BorrowIntent, LendIntent } from 'indexer/model'

export const getIntentAssetIdentifiers = (intents: (BorrowIntent | LendIntent)[]) =>
  intents.flatMap((intent) => {
    const collateralAssetIdentifiers = intent.collateral.map((item) => {
      const type = mapItemTypeToAssetType(item.itemType)

      return {
        address: AddressSchema.parse(item.token),
        chainId: ChainIdSchema.parse(intent.chainId),
        tokenId: type !== 'ERC20' ? item.identifier : undefined,
        type,
      }
    })
    const debtAssetIdentifiers = intent.borrow.map<AssetIdentifier>((item) => {
      const type = mapItemTypeToAssetType(item.itemType)

      return {
        address: AddressSchema.parse(item.token),
        chainId: ChainIdSchema.parse(intent.chainId),
        tokenId: type !== 'ERC20' ? item.identifier : undefined,
        type,
      }
    })

    return [...collateralAssetIdentifiers, ...debtAssetIdentifiers]
  })
