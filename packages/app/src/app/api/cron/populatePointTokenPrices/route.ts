import { type NextRequest } from 'next/server'

import { type ChainId } from 'chains'
import { type DataSource } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getChainIds } from '@/app/api/_/getChainId'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { getHistoricalPrices } from '@/app/api/cron/populatePointTokenPrices/_/getHistoricalPrices'
import { handleErrors } from '@/app/api/server-error'

import { getERC20TokensByChainId } from 'assets'
import { PointToken } from 'indexer/model'

export const maxDuration = 300 // This function can run for a maximum of 300 seconds

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    const chainIds = getChainIds(req)
    const chainDataSource = await initializeDataSource()

    await Promise.all(
      chainIds.map((chainId) => {
        populatePointTokenPrices(chainId, chainDataSource)
      }),
    )

    return jsonResponse('ok')
  })

const populatePointTokenPrices = async (chainId: ChainId, chainDataSource: DataSource) => {
  const tokens = getERC20TokensByChainId(chainId)

  for (const erc20Token of tokens) {
    const tokenData = await getHistoricalPrices(erc20Token, chainId, chainDataSource)
    await chainDataSource.getRepository(PointToken).save(tokenData)
  }
}
