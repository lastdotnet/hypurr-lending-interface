import { type NextRequest } from 'next/server'

import { base, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'
import { In } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { calculateIntentVolume } from '@/app/api/cron/marketData/_/calculateIntentVolume'
import { calculateMarketDetails } from '@/app/api/cron/marketData/_/calculateMarketDetails'
import { updateERC20Stats } from '@/app/api/cron/marketData/_/updateErc20Stats'
import { handleErrors } from '@/app/api/server-error'

import { ArchivedLoan, Erc20Stats, Loan, MarketDetails } from 'indexer/model'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const maxDuration = 300 // This function can run for a maximum of 300 seconds

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    const forSepolia = req.nextUrl.searchParams.get('forSepolia')
    const dataSource = await initializeDataSource()

    let chains: ChainId[] = []
    if (forSepolia === 'true') {
      chains = [sepolia.id]
    } else {
      chains = [base.id, mainnet.id, mode.id]
    }

    const [activeLoans, archivedLoans] = await Promise.all([
      await dataSource.manager.getRepository(Loan).findBy({ chainId: In(chains) }),
      await dataSource.manager.getRepository(ArchivedLoan).findBy({ chainId: In(chains) }),
    ])
    const loans = activeLoans.concat(archivedLoans)
    await Promise.all(
      chains.map(async (chainId) => {
        await updateERC20Stats({
          activeLoans: activeLoans.filter((loan) => loan.chainId === chainId),
          chainId,
          dataSource,
        })
      }),
    )

    const erc20Stats = await dataSource.getRepository(Erc20Stats).findBy({ chainId: In(chains) })

    await Promise.all(
      chains.map(async (chainId) => {
        const marketDetails = await calculateMarketDetails(
          erc20Stats.filter((erc20Stat) => erc20Stat.chainId === chainId),
          chainId,
          loans.filter((loan) => loan.chainId === chainId),
        )
        const intentVolume = await calculateIntentVolume({
          chainId,
          dataSource,
        })

        const resultMarketDetails: MarketDetails = {
          chainId,
          id: chainId.toString(),
          ...marketDetails,
          ...intentVolume,
        }
        await dataSource.getRepository(MarketDetails).save(resultMarketDetails)
      }),
    )
    return jsonResponse('ok')
  })
