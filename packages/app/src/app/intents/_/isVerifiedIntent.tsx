import { isVerifiedCollection } from '@/app/intents/_/isVerifiedCollection'
import { isVerifiedERC20 } from '@/app/intents/_/isVerifiedERC20'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'

import { isERC20Asset, isERC721Asset } from 'assets'

const getIsSupportedCollateralToken = ({
  intent,
}: {
  intent: BorrowIntent | LendIntent
}) => {
  if (isERC20Asset(intent.collateral)) {
    return isVerifiedERC20({
      erc20: intent.collateral,
    })
  }
  if (isERC721Asset(intent.collateral)) {
    return isVerifiedCollection(intent.collateral)
  }
  return true
}

export const isVerifiedIntent = ({
  intent,
}: {
  intent: BorrowIntent | LendIntent
}) => {
  const isSupportedCollateralToken = getIsSupportedCollateralToken({
    intent,
  })
  const isVerifiedBorrowToken = isVerifiedERC20({
    erc20: intent.borrow,
  })

  return isSupportedCollateralToken && isVerifiedBorrowToken
}
