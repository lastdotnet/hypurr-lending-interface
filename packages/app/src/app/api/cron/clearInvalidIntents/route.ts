import { type NextRequest } from 'next/server'

import { type ChainId } from 'chains'
import { type DataSource } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getChainIds } from '@/app/api/_/getChainId'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { borrowIntentsClean } from '@/app/api/cron/clearInvalidIntents/_/borrowIntentsClean'
import { removeExpiredBorrowIntents, removeExpiredLendIntents } from '@/app/api/cron/clearInvalidIntents/_/common'
import { lendIntentsClean } from '@/app/api/cron/clearInvalidIntents/_/lendIntentsClean'
import { handleErrors } from '@/app/api/server-error'
import { getPublicClient } from '@/astaria/utils/getPublicClient'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    const chainIds = getChainIds(req)
    const chainDataSource = await initializeDataSource()

    await Promise.all(
      chainIds.map((chainId) => {
        clearInvalidIntents(chainId, chainDataSource)
      }),
    )

    return jsonResponse('ok')
  })

const clearInvalidIntents = async (chainId: ChainId, chainDataSource: DataSource) => {
  const publicClient = getPublicClient({ chainId })

  await Promise.all([
    removeExpiredBorrowIntents({
      chainDataSource,
      chainId,
    }),
    removeExpiredLendIntents({
      chainDataSource,
      chainId,
    }),
  ])

  await Promise.all([
    borrowIntentsClean({
      chainDataSource,
      chainId,
      publicClient,
    }),
    lendIntentsClean({
      chainDataSource,
      chainId,
      publicClient,
    }),
  ])
}
