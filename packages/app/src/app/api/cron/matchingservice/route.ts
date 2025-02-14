import { type NextRequest } from 'next/server'

import { type Chain } from 'viem'
import { createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { HexSchema } from 'common'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getChainId } from '@/app/api/_/getChainId'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { runMatchingService } from '@/app/api/cron/matchingservice/_/runMatchingService'
import { UnauthorizedError, handleErrors } from '@/app/api/server-error'
import { transports } from '@/astaria/constants/transports'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { getChain } from '@/astaria/utils/getChain'
import { getContractAddress } from '@/astaria/utils/getContractAddress'
import { getPublicClient } from '@/astaria/utils/getPublicClient'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    if (
      process.env.MATCHING_SERVICE_DISABLE_AUTH !== 'true' &&
      req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      throw new UnauthorizedError()
    }

    const account = privateKeyToAccount(HexSchema.parse(process.env.MATCHING_SERVICE_PRIVATE_KEY))

    const chainId = getChainId(req)

    const chain = getChain({ chainId }) as Chain // avoid publicClient type mismatch with Base. See https://astariaworkspace.slack.com/archives/C03DTLS4129/p1708569677599549?thread_ts=1708515435.425949&cid=C03DTLS4129

    const walletClient = createWalletClient({
      account,
      chain,
      transport: transports[chainId],
    })

    const publicClient = getPublicClient({ chainId })

    const starport = getContractAddress({
      chainId,
      contractName: Contracts.Starport,
    })

    const astariaV1Pricing = getContractAddress({
      chainId,
      contractName: Contracts.V1Pricing,
    })

    const dataSource = await initializeDataSource()
    const txHashes = await runMatchingService({
      astariaV1Pricing,
      chainId,
      dataSource,
      publicClient,
      starport,
      walletClient,
    })

    return jsonResponse({ txHashes })
  })
