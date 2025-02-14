import { isAddressEqual } from 'viem'
import { foundry, mainnet } from 'viem/chains'

import { milliseconds } from 'date-fns'

import { warmAssetsMetadataCache } from '@/app/api/_/getAssetsMetadata'
import { jsonResponse } from '@/app/api/_/jsonResponse'

import {
  type ERC20WithChainIdAndStartPointsTimestamp,
  erc20Tokens as allErc20Tokens,
  getERC20TokenBySymbol,
} from 'assets'

export const maxDuration = 80

export const dynamic = 'force-dynamic' // forces the route handler to be dynamic

const PROBLEMATIC_MAKER_TOKEN = getERC20TokenBySymbol({
  chainId: mainnet.id,
  symbol: 'MKR',
})
const CHUNK_SIZE = 50

const warmAssetsMetadataCacheByChunks = async (
  erc20Tokens: ERC20WithChainIdAndStartPointsTimestamp[],
): Promise<void> => {
  for (let iter = 0; iter < erc20Tokens.length; iter += CHUNK_SIZE) {
    await warmAssetsMetadataCache({
      assets: erc20Tokens.slice(iter, iter + CHUNK_SIZE),
    })
  }
}

export const GET = async () => {
  const erc20Tokens = allErc20Tokens.filter(
    (token) => token.chainId !== foundry.id && !isAddressEqual(token.address, PROBLEMATIC_MAKER_TOKEN.address),
  )

  warmAssetsMetadataCacheByChunks(erc20Tokens)
  await delay(milliseconds({ seconds: 15 }))
  warmAssetsMetadataCacheByChunks(erc20Tokens)
  await delay(milliseconds({ seconds: 15 }))
  warmAssetsMetadataCacheByChunks(erc20Tokens)

  return jsonResponse('ok')
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
