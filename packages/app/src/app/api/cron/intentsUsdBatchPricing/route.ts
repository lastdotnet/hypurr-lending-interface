import { type NextRequest } from 'next/server'

import { base, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { putIntentsUsdValue } from '@/app/api/cron/intentsUsdBatchPricing/_/putIntentsUsdValue'
import { handleErrors } from '@/app/api/server-error'

import { ArchivedBorrowIntent, ArchivedLendIntent, BorrowIntent, LendIntent } from 'indexer/model'

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    const forSepolia = req.nextUrl.searchParams.get('forSepolia')

    let chains: ChainId[] = []
    if (forSepolia === 'true') {
      chains = [sepolia.id]
    } else {
      chains = [base.id, mainnet.id, mode.id]
    }

    const dataSource = await initializeDataSource()

    await Promise.all(
      chains.map((chainId) => {
        putIntentsUsdValue({ chainId, dataSource, modelType: BorrowIntent })
        putIntentsUsdValue({
          chainId,
          dataSource,
          modelType: ArchivedBorrowIntent,
        })
        putIntentsUsdValue({ chainId, dataSource, modelType: LendIntent })
        putIntentsUsdValue({
          chainId,
          dataSource,
          modelType: ArchivedLendIntent,
        })
      }),
    )

    return jsonResponse('ok')
  })
