import { ItemType } from 'sdk';

export const mapItemTypeToAssetType = (
  itemType: ItemType.ERC20 | ItemType.ERC721 | ItemType.ERC721_WITH_CRITERIA
) => {
  const assetType = (
    {
      [ItemType.ERC20]: 'ERC20',
      [ItemType.ERC721]: 'ERC721',
      [ItemType.ERC721_WITH_CRITERIA]: 'ERC721',
    } as Partial<Record<typeof itemType, 'ERC20' | 'ERC721'>>
  )[itemType];

  if (!assetType) {
    throw new Error('INTENT_INVALID', {
      cause: 'Invalid item type',
    });
  }

  return assetType;
};
