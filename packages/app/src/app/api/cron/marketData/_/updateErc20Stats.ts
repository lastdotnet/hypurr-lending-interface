import { type ChainId } from 'chains'
import { addOrRemoveDecimals, calculateCompoundInterest, getNowInSecondsBigInt } from 'common'
import { type DataSource } from 'typeorm'

import { InternalServerError } from '@/app/api/server-error'

import { Erc20Stats, type Loan } from 'indexer/model'

export const updateERC20Stats = async ({
  activeLoans,
  chainId,
  dataSource,
}: {
  activeLoans: Loan[]
  chainId: ChainId
  dataSource: DataSource
}) => {
  const now = getNowInSecondsBigInt()

  const loansWithInterest = activeLoans.map((loan) => ({
    ...loan,
    interest: calculateCompoundInterest({
      amount: loan.amount,
      apy: loan.rate,
      decimals: Number(loan.decimals),
      delta: now - loan.start,
    }),
  }))
  const uniqueTokensFromLiveLoans = new Set<string>(loansWithInterest.map(({ address }) => address))
  const erc20StatsRepo = dataSource.getRepository(Erc20Stats)
  const erc20Stats = await erc20StatsRepo.findBy({ chainId })
  const tokensToUpdateFromLiveLoans = Array.from(uniqueTokensFromLiveLoans).map((address) => {
    const loansForToken = loansWithInterest.filter((loan) => loan.address === address)
    const totalDebtForToken = loansForToken.reduce((sum, loan) => sum + loan.amount, 0n)
    const interestOnAllDebtLoans = loansForToken.reduce((sum, loan) => sum + loan.interest, 0n)
    const loansForTokenAsCollateral = loansWithInterest.filter(
      (loan) => loan.collateral.findIndex((spentItem) => spentItem.token === address) !== -1,
    )
    const rateOnAllLoansAsCollateral = loansForTokenAsCollateral.reduce((sum, loan) => {
      const erc20Stat = erc20Stats.find((erc20Stat) => erc20Stat.address === loan.collateral.at(0)?.token)
      if (erc20Stat) {
        const adjustedRate = addOrRemoveDecimals({
          newDecimals: erc20Stat.decimals,
          oldDecimals: Number(loan.decimals),
          value: loan.rate,
        })
        return sum + adjustedRate
      }
      throw new InternalServerError(
        `Loan collateral token is missing from erc20stats table: ${loan.collateral.at(0)?.token}`,
      )
    }, 0n)
    return {
      address,
      avgApy:
        loansForTokenAsCollateral.length !== 0
          ? rateOnAllLoansAsCollateral / BigInt(loansForTokenAsCollateral.length)
          : 0n,
      interest: interestOnAllDebtLoans,
      totalDebt: totalDebtForToken + interestOnAllDebtLoans,
    }
  })
  // Update in erc20 stats table
  tokensToUpdateFromLiveLoans.forEach(async (updateToken) => {
    const erc20Stat = erc20Stats.find((erc20Stat) => erc20Stat.address === updateToken.address)
    if (!erc20Stat) {
      throw new Error('ERC20_STATS_MISSING', {
        cause: `Token in live loan missing from erc20 stats table: ${updateToken.address} on chain: ${chainId}`,
      })
    }
    erc20Stat.avgApy = updateToken.avgApy
    erc20Stat.totalDebt = updateToken.totalDebt
    erc20Stat.cronUpdatedAt = now
    await erc20StatsRepo.save(erc20Stat)
  })
  // reset statistics for tokens outside of active loans
  const tokensNotFoundInLoans = erc20Stats.filter(
    (erc20Stat) =>
      !tokensToUpdateFromLiveLoans.map((liveLoanToken) => liveLoanToken.address).includes(erc20Stat.address),
  )
  const tokensToReset = tokensNotFoundInLoans.map((missingToken) => ({
    ...missingToken,
    avgApy: 0n,
    cronUpdatedAt: now,
    totalCollateral: 0n,
    totalDebt: 0n,
  }))
  await erc20StatsRepo.save(tokensToReset)
}
