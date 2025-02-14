import { ItemType, type SpentItem } from 'sdk';

export const getSpentItemCacheKey = ({ item }: { item: SpentItem }) => {
  if (item.itemType === ItemType.ERC20) {
    return `${item.token.toLowerCase()}`;
  }

  return `${item.token.toLowerCase()}.${item.identifier.toString()}`;
};
