import { type NextRequest, NextResponse } from 'next/server'

import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'
import { StatusCodes } from 'http-status-codes'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getChainId } from '@/app/api/_/getChainId'
import { getPublicClient } from '@/astaria/utils/getPublicClient'

import { getStateSchema } from 'indexer/utils'

const maxBlockDistances = {
  [base.id]: 80,
  [foundry.id]: 50,
  [mainnet.id]: 100,
  [mode.id]: 80,
  [sepolia.id]: 80,
}

export const GET = async (req: NextRequest) => {
  const chainId: ChainId = getChainId(req)
  const stateSchema = getStateSchema({ chainId })

  const chainDataSource = await initializeDataSource()

  const [state] = await chainDataSource.transaction('SERIALIZABLE', (entityManager) =>
    entityManager.query(`SELECT height FROM ${chainDataSource.driver.escape(stateSchema)}.status WHERE id = 0`),
  )

  const client = getPublicClient({ chainId })
  const rpcLatestBlock = Number(await client.getBlockNumber())
  const maxBlockDistance = maxBlockDistances[chainId]
  const blockDistance = rpcLatestBlock - state.height
  if (blockDistance > maxBlockDistance) {
    return NextResponse.json(
      {
        data: {
          distance: blockDistance,
          height: state.height,
          msg: `${stateSchema} status height is less then rpc hot block number by more then ${maxBlockDistance}`,
          result: 'error',
          rpcLatestBlock,
        },
        success: false,
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    )
  }

  return NextResponse.json({ status: 'gucci' })
}
