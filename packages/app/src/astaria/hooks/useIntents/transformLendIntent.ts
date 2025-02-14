import { ChainIdSchema } from 'chains'
import { AddressSchema } from 'common'
import { millisecondsToSeconds } from 'date-fns'

import { getBorrowCollateralAndLTV } from '@/astaria/hooks/useIntents/getBorrowCollateralAndLTV'
import { type LendIntent, LendIntentSchema } from '@/astaria/types-internal/intent-schemas'

import { type Asset } from 'assets'
import { type LendIntent as IndexerLendIntent } from 'indexer/model'

export const transformLendIntent = async ({
  assets,
  lendIntent,
}: {
  assets: Map<string, Asset>
  lendIntent: IndexerLendIntent
}) => {
  const chainId = ChainIdSchema.parse(lendIntent.chainId)
  const { borrow, collateral, ltv } = await getBorrowCollateralAndLTV({
    assets,
    chainId,
    intent: lendIntent,
  })

  const signedCaveat = lendIntent.signedCaveat
  if (!signedCaveat) {
    throw new Error('LEND_INTENT_INVALID', { cause: 'Missing signed caveat' })
  }

  const transformedLendIntent: LendIntent = {
    ...lendIntent,
    borrow,
    chainId: ChainIdSchema.parse(lendIntent.chainId),
    collateral,
    deadline: signedCaveat.deadline,
    duration: signedCaveat.deadline - BigInt(millisecondsToSeconds(signedCaveat.createdAt.getTime())),
    ltv,
    owner: AddressSchema.parse(signedCaveat.owner),
    randomNumber: Math.random(),
    singleUse: signedCaveat.singleUse,
  }

  return LendIntentSchema.parse(transformedLendIntent)
}
