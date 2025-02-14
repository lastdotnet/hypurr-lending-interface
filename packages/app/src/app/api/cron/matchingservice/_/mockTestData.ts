import { type Address } from 'viem'
import { base } from 'viem/chains'

import { getNowInSecondsBigInt, numberToBigInt } from 'common'

import type { BorrowerIntent, LenderIntent, LenderIntentWithCapacity } from '@/app/api/cron/matchingservice/_/types'
import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'

import { getERC20TokenBySymbol } from 'assets'
import { ItemType } from 'sdk'

const BASE_DEGEN = getERC20TokenBySymbol({
  chainId: base.id,
  symbol: 'DEGEN',
})
const BASE_USDC = getERC20TokenBySymbol({
  chainId: base.id,
  symbol: 'USDC',
})

export const mockBorrowIntent: BorrowerIntent = {
  assortmentId: 'hfgj4524',
  borrow: [
    {
      amount: numberToBigInt({ amount: 1200, decimals: BASE_USDC.decimals }),
      identifier: 123n,
      itemType: ItemType.ERC20,
      token: BASE_USDC.address,
    },
  ],
  collateral: [
    {
      amount: numberToBigInt({ amount: 500000, decimals: BASE_DEGEN.decimals }),
      identifier: 1234n,
      itemType: ItemType.ERC20,
      token: BASE_DEGEN.address,
    },
  ],
  deadline: getNowInSecondsBigInt() + TRANSMIT_INTENT_PARAMS.defaultDeadline,
  endRate: 3000000n,
  endTime: 1710510384n,
  id: '0x123' as Address,
  isRecall: false,
  maxAmount: 1n,
  minAmount: 1n,
  startRate: 1n,
  startTime: 1710424044n,
}
export const mockLendIntent: LenderIntent = {
  assortmentId: '235f23t44g',
  borrow: [
    {
      amount: numberToBigInt({ amount: 500000, decimals: BASE_DEGEN.decimals }),
      identifier: 1234n,
      itemType: ItemType.ERC20,
      token: BASE_DEGEN.address,
    },
  ],
  collateral: [
    {
      amount: numberToBigInt({ amount: 1200, decimals: BASE_USDC.decimals }),
      identifier: 123n,
      itemType: ItemType.ERC20,
      token: BASE_USDC.address,
    },
  ],
  deadline: getNowInSecondsBigInt() + TRANSMIT_INTENT_PARAMS.defaultDeadline,
  id: '0x321' as Address,
  maxAmount: 1n,
  minAmount: 1n,
  minAPY: 3000000n,
}
export const mockLendIntentWithCapacity: LenderIntentWithCapacity = {
  ...mockLendIntent,
  capacity: 1n,
  singleUse: true,
}
