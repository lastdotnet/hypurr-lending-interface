import { type NextRequest } from 'next/server'

import { type Chain } from 'viem'

import { type ChainId } from 'chains'
import { ETHER_DECIMALS } from 'common'
import { sendInternalWarning } from 'notifications'

import { getChainIds } from '@/app/api/_/getChainId'
import { jsonResponse } from '@/app/api/_/jsonResponse'
import { getThresholdByChainId } from '@/app/api/cron/ethBalanceMatchingServiceWallet/_/getThresholdByChainId'
import { handleErrors } from '@/app/api/server-error'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'
import { getChain } from '@/astaria/utils/getChain'
import { getPublicClient } from '@/astaria/utils/getPublicClient'

const MATCHING_SERVICE_WALLET_ADDRESS = '0x89F1F58a7F11d3931dcf829c145b745d999d133c'

export const GET = async (req: NextRequest) =>
  handleErrors(req, async () => {
    const chainIds = getChainIds(req)

    await Promise.all(
      chainIds.map((chainId) => {
        ethBalanceMatchingServiceWallet(chainId)
      }),
    )

    return jsonResponse('ok')
  })

const ethBalanceMatchingServiceWallet = async (chainId: ChainId) => {
  const chain = getChain({ chainId }) as Chain
  const publicClient = getPublicClient({ chainId })

  const balance = await publicClient.getBalance({
    address: MATCHING_SERVICE_WALLET_ADDRESS,
  })

  const threshold = getThresholdByChainId(chainId)

  if (balance < threshold) {
    await sendInternalWarning({
      description: 'The balance of a matchmaking service wallet is bellow the minimum threshold:',
      title: 'Insufficient Balance',
      values: {
        Balance: formatCurrency({
          amount: balance,
          decimals: ETHER_DECIMALS,
          usdValue: undefined,
        }).content,
        'Chain ID': String(chainId),
        Keeper: `${chain.blockExplorers?.default.url}/address/${MATCHING_SERVICE_WALLET_ADDRESS}`,
        Threshold: formatCurrency({
          amount: threshold,
          decimals: ETHER_DECIMALS,
          usdValue: undefined,
        }).content,
      },
    })
  }
}
