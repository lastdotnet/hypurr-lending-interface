import { type LendIntentFormSchema } from '@/app/intents/_/TransmitIntent/TransmitLendIntent/lendIntentFormSchema'
import { LEND_INTENT_APY_DEFAULT } from '@/astaria/constants/constants'

import { type ERC20Asset, type ERC721 } from 'assets'

export const resetLendIntentForm = ({
  borrowAsset,
  collateralAsset,
}: {
  borrowAsset: ERC20Asset
  collateralAsset: ERC20Asset | ERC721
}): LendIntentFormSchema => ({
  apy: LEND_INTENT_APY_DEFAULT,
  borrowAmount: 0n,
  borrowAsset,
  collateralAmount: 0n,
  collateralAsset,
  ltv: 0,
  repeatFill: false,
})
