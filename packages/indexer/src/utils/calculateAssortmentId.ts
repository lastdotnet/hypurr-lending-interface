import { type SpentItem } from '../model';

export const calculateAssortmentId = (
  collateral: SpentItem[],
  debt: SpentItem[]
) => {
  const collateralString = collateral
    .sort((a, b) => (a.token > b.token ? 1 : -1))
    .reduce(
      (accumulator, currentItem) => `${accumulator}${currentItem.token}`,
      ''
    );

  const debtString = debt
    .sort((a, b) => (a.token > b.token ? 1 : -1))
    .reduce(
      (accumulator, currentItem) => `${accumulator}${currentItem.token}`,
      ''
    );

  return `${collateralString}${debtString}`;
};
