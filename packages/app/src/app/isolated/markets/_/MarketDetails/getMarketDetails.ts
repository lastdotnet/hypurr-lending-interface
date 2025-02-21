'use server'

import { sepolia } from 'viem/chains'

import { Uint256Schema } from 'common'
import { Not } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { type GETMarketDetailsResponse, GETMarketDetailsResponseSchema } from '@/astaria/types-internal/market-schemas'

import { ArchivedBorrowIntent, ArchivedLendIntent, BorrowIntent, LendIntent, Loan, MarketDetails } from 'indexer/model'

export const getMarketDetails = async ({
  isTestnet,
}: {
  isTestnet: boolean
}) => {
  const dataSource = await initializeDataSource()
  const activeLoans = await dataSource.manager
    .getRepository(Loan)
    .count({ where: { chainId: isTestnet ? sepolia.id : Not(sepolia.id) } })

  const activeIntents = await dataSource.manager
    .getRepository(BorrowIntent)
    .count({ where: { chainId: isTestnet ? sepolia.id : Not(sepolia.id) } })

  const archivedBorrowIntents = await dataSource.manager
    .getRepository(ArchivedBorrowIntent)
    .count({ where: { chainId: isTestnet ? sepolia.id : Not(sepolia.id) } })

  const archivedLendIntents = await dataSource.manager
    .getRepository(ArchivedLendIntent)
    .count({ where: { chainId: isTestnet ? sepolia.id : Not(sepolia.id) } })

  const lendIntents = await dataSource.manager
    .getRepository(LendIntent)
    .count({ where: { chainId: isTestnet ? sepolia.id : Not(sepolia.id) } })

  const marketDetailsPerChain = await dataSource.manager.getRepository(MarketDetails).findBy({
    chainId: isTestnet ? sepolia.id : Not(sepolia.id),
  })

  const marketDetails = marketDetailsPerChain.reduce(
    (acc, chainDetails) => {
      acc.cumulativeBorrow += chainDetails.cumulativeBorrow
      acc.totalMarketSize += chainDetails.totalMarketSize
      acc.cumulativeCollateral += chainDetails.cumulativeCollateral
      acc.totalIntentVolume += chainDetails.totalIntentVolume
      return acc
    },
    {
      cumulativeBorrow: 0,
      cumulativeCollateral: 0,
      totalIntentVolume: 0,
      totalMarketSize: 0,
    },
  )

  const intentsCount: number = activeIntents + archivedBorrowIntents + archivedLendIntents + lendIntents
  const transformedIntentsCount = Uint256Schema.parse(intentsCount)
  const transformedResponse: GETMarketDetailsResponse = {
    activeLoans,
    cumulativeBorrow: marketDetails?.cumulativeBorrow ?? 0,
    cumulativeCollateral: marketDetails?.cumulativeCollateral ?? 0,
    intentsCount: transformedIntentsCount,
    intentVolume: marketDetails?.totalIntentVolume ?? 0,
    marketSize: marketDetails?.totalMarketSize ?? 0,
  }

  return GETMarketDetailsResponseSchema.parse(transformedResponse)
}
