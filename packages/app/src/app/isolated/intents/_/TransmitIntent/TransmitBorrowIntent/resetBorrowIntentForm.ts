import { type BorrowIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { BORROW_INTENT_APY_DEFAULT } from '@/astaria/constants/constants'

import { type ERC20Asset, type ERC721 } from 'assets'

export const resetBorrowIntentForm = ({
  borrowAsset,
  collateralAsset,
}: {
  borrowAsset: ERC20Asset
  collateralAsset: ERC20Asset | ERC721
}): BorrowIntentFormSchema => ({
  apy: BORROW_INTENT_APY_DEFAULT,
  borrowAmount: 0n,
  borrowAsset,
  collateralAmount: 0n,
  collateralAsset,
  ltv: 0,
})
