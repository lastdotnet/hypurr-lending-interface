import { BadRequestError } from '@/app/api/server-error'

import { ItemType, type SpentItem } from 'sdk'

export const validateSpentItems = ({
  collateralList,
  debtList,
}: {
  collateralList: ReadonlyArray<SpentItem>
  debtList: ReadonlyArray<SpentItem>
}) => {
  const collateral = collateralList.at(0)
  const debt = debtList.at(0)

  if (!collateral) {
    throw new BadRequestError('Missing collateral in signed caveat')
  }
  if (!debt) {
    throw new BadRequestError('Missing debt in signed caveat')
  }

  validateItemTypes({ collateral, debt })
}

const validateItemTypes = ({
  collateral,
  debt,
}: {
  collateral: SpentItem
  debt: SpentItem
}) => {
  if (collateral.itemType === ItemType.ERC1155) {
    throw new BadRequestError(`Unsupported collateral with type ERC1155. Address of token: ${collateral.token}`)
  }

  if (debt.itemType === ItemType.ERC1155) {
    throw new BadRequestError(`Unsupported debt with type ERC1155. Address of token: ${debt.token}`)
  }

  if (debt.itemType === ItemType.ERC721) {
    throw new BadRequestError(`Unsupported debt with type ERC721. Address of token: ${debt.token}`)
  }
}
