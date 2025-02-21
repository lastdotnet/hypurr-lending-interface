import { type ChainId } from 'chains'
import { getNowInSecondsBigInt, numberToBigInt, numberToPercent } from 'common'
import { secondsInDay } from 'date-fns/constants'

import { DEFAULT_CHAIN } from '@/astaria/constants/chains'
import { type Loan, SourceType } from '@/astaria/types-internal/loan-schemas'

import { getERC20TokenBySymbol } from 'assets'
import { LoanType, ProviderType } from 'sdk'

export const getMockRecallLoan = ({ chainId }: { chainId: ChainId }): Loan => {
  const startTime = getNowInSecondsBigInt()
  const USDC = getERC20TokenBySymbol({
    chainId,
    symbol: 'USDC',
  })
  const WETH = getERC20TokenBySymbol({
    chainId,
    symbol: 'WETH',
  })

  return {
    apy: numberToBigInt({
      // eslint-disable-next-line no-magic-numbers
      amount: numberToPercent(22),
      decimals: USDC.decimals,
    }),
    asset: {
      ...WETH,
      amount: numberToBigInt({
        amount: 2.1234,
        decimals: WETH.decimals,
      }),
      usdValue: 3347.3,
    },
    chainId: DEFAULT_CHAIN.id,
    debt: {
      ...USDC,
      amount: numberToBigInt({
        amount: 3178.29,
        decimals: USDC.decimals,
      }),
      usdValue: 1,
    },
    duration: startTime + BigInt(secondsInDay),
    id: '3453g4554y54h54h4h',
    isClaimable: false,
    isRecall: false,
    isRecallable: true,
    loanType: LoanType.ASTARIA,
    provider: ProviderType.ASTARIA,
    recallableAt: 1n,
    source: SourceType.LENDER,
    startTime,
  }
}
