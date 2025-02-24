import { getBigIntPercentBasedOnDecimals, getSecondsBigInt } from 'common'

import { type ERC20 } from 'assets'

export const TRANSMIT_INTENT_PARAMS = {
  carryRate: (borrow: ERC20) =>
    getBigIntPercentBasedOnDecimals({
      decimals: borrow.decimals,
      percent: 10n, // 10%
    }),
  defaultDeadline: getSecondsBigInt({ days: 2 }),
  defaultEndTime: getSecondsBigInt({ hours: 1 }),
  endTimeBuffer: 60n, // buffer after which the auction will end but the final rate is valid
  erc721Amount: 1n, // default amount for when it is an ERC721 (necessary for signature types-internal)
  fallbackTokenId: 0n, // default tokenId for when it is an ERC20 (necessary for signature types-internal)
  honeymoonPeriod: getSecondsBigInt({ days: 1 }), // Period at the beginning of a loan in which the loan cannot be recalled
  loanStart: 0n, // we cannot predict when the transaction is processed (necessary for signature types-internal)
  maximumRecall: (borrow: ERC20) =>
    getBigIntPercentBasedOnDecimals({
      decimals: borrow.decimals,
      percent: 1000n, // 1000%
    }), // Maximum rate of the recall before failure (relative to decimals). 1000% in the decimals of the debt asset
  recallStakeDuration: getSecondsBigInt({ days: 0 }), // Days of interest a permisionless recaller must stake
  recallWindow: getSecondsBigInt({ days: 1 }), // Period for which the recall is active (after a recall is initiated)
  startRate: 1n, // rate at which a borrow intent auction begins
}
