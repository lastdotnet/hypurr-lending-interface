import { type ChainId } from 'chains'
import { AddressSchema } from 'common'

import { getLoansWithPrices } from '@/app/api/cron/marketData/_/getLoansWithPrices'
import { fetchUSDValue } from '@/astaria/utils/fetchUSDValue'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type ArchivedLoan, type Erc20Stats, type Loan } from 'indexer/model'

interface CalculateMarketDetailsResponse {
  cumulativeBorrow: number
  cumulativeCollateral: number
  totalMarketSize: number
}

interface CalculateUsdValuesParams {
  chainId: ChainId
  erc20Stat: Erc20Stats
  forCollateral: boolean
}

const calculateUsdValues = async (params: CalculateUsdValuesParams) => {
  const usdValue = await fetchUSDValue({
    address: AddressSchema.parse(params.erc20Stat.address),
    chainId: params.chainId,
  })
  return (
    getUSDValue({
      amount: params.forCollateral ? params.erc20Stat.totalCollateral : params.erc20Stat.totalDebt,
      decimals: params.erc20Stat.decimals,
      usdValue,
    }) || 0
  )
}

export const calculateMarketDetails = async (
  erc20Stats: Erc20Stats[],
  chainId: ChainId,
  loans: Array<Loan | ArchivedLoan>,
): Promise<CalculateMarketDetailsResponse> => {
  const allLoansWithPrices = await getLoansWithPrices(chainId, loans)

  const collateralUsdValuesByToken = await Promise.all(
    erc20Stats.map(async (erc20Stat) => calculateUsdValues({ chainId, erc20Stat, forCollateral: true })),
  )

  const debtUsdValuesByToken = await Promise.all(
    erc20Stats.map(async (erc20Stat) => calculateUsdValues({ chainId, erc20Stat, forCollateral: false })),
  )
  const calculateTotal = (values: number[]) => values.reduce((total, value) => total + value, 0)

  return {
    cumulativeBorrow: calculateTotal(allLoansWithPrices.map((loan) => loan.usdValueBorrow)),
    cumulativeCollateral: calculateTotal(allLoansWithPrices.map((loan) => loan.usdValueCollateral)),
    totalMarketSize: calculateTotal(collateralUsdValuesByToken) + calculateTotal(debtUsdValuesByToken),
  }
}
