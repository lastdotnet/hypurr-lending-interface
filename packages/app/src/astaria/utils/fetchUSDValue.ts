import { type Address } from 'viem'
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'
import { z } from 'zod'

import { type ChainId } from 'chains'
import { AddressSchema } from 'common'

import type { AssetIdentifier } from '@/app/api/_/getAssetsMetadata'
import { addressesAreEqual } from '@/astaria/utils/address'

import { getERC20TokenBySymbol } from 'assets'

const CACHE_DURATION_SECONDS = 10
const DEFAULT_BATCH_SIZE = 150
const DELAY_BATCH_REQUESTS = 200

const API_KEY = process.env.DEFILLAMA_API_KEY

const chainIdToName = {
  [base.id]: 'base',
  [foundry.id]: 'foundry',
  [mainnet.id]: 'ethereum',
  [mode.id]: 'mode',
  [sepolia.id]: 'sepolia',
}

const MAINNET_WETH = getERC20TokenBySymbol({
  chainId: mainnet.id,
  symbol: 'WETH',
})
const SEPOLIA_WETH = getERC20TokenBySymbol({
  chainId: sepolia.id,
  symbol: 'WETH',
})
const MAINNET_USDC = getERC20TokenBySymbol({
  chainId: mainnet.id,
  symbol: 'USDC',
})
const SEPOLIA_USDC = getERC20TokenBySymbol({
  chainId: sepolia.id,
  symbol: 'USDC',
})
const SEPOLIA_USDT = getERC20TokenBySymbol({
  chainId: sepolia.id,
  symbol: 'USDT',
})
const MAINNET_USDT = getERC20TokenBySymbol({
  chainId: mainnet.id,
  symbol: 'USDT',
})
const MAINNET_UNI = getERC20TokenBySymbol({
  chainId: mainnet.id,
  symbol: 'UNI',
})
const SEPOLIA_UNI = getERC20TokenBySymbol({
  chainId: sepolia.id,
  symbol: 'UNI',
})
const SEPOLIA_TST20 = getERC20TokenBySymbol({
  chainId: sepolia.id,
  symbol: 'TST20',
})
const BASE_WETH = getERC20TokenBySymbol({
  chainId: base.id,
  symbol: 'WETH',
})
const BASE_USDC = getERC20TokenBySymbol({
  chainId: base.id,
  symbol: 'USDC',
})

const TESTNET_TOKEN_TO_MAINNET_TOKEN = {
  [SEPOLIA_TST20.address]: MAINNET_WETH.address, // Map TEST20 and WETH to Mainnet WETH
  [SEPOLIA_WETH.address]: MAINNET_WETH.address, // Map Sepolia WETH to Mainnet WETH
  [SEPOLIA_USDC.address]: MAINNET_USDC.address, // Map Sepolia USDC to Mainnet USDC
  [SEPOLIA_USDT.address]: MAINNET_USDT.address, // Map Sepolia USDT to Mainnet USDT
  [SEPOLIA_UNI.address]: MAINNET_UNI.address, // Map Sepolia UNI to Mainnet UNI
  [BASE_WETH.address]: MAINNET_WETH.address, // Map Base WETH to Mainnet WETH
  [BASE_USDC.address]: MAINNET_USDC.address, // Map Base USDC to Mainnet USDC
}

const formatChainAndAddress = ({
  address,
  chainId,
}: {
  address: Address
  chainId: ChainId
}) => {
  const testnetTokenRemapping = TESTNET_TOKEN_TO_MAINNET_TOKEN[address]

  if (testnetTokenRemapping) {
    return `ethereum:${testnetTokenRemapping}`
  }
  return `${chainIdToName[chainId]}:${address}`
}

const DefiLlamaResponseSchema = z.object({
  coins: z.record(z.string(), z.object({ price: z.number() }).optional()),
})

const DefiLlamaBatchResponseSchema = z.object({
  coins: z.record(
    z.string(),
    z
      .object({
        prices: z.object({ price: z.number(), timestamp: z.number() }).array(),
      })
      .optional(),
  ),
})

export const fetchUSDValue = async ({
  address,
  chainId,
  timestamp, // Optional timestamp parameter for historical data
}: {
  address: Address
  chainId: ChainId
  timestamp?: number
}): Promise<number | null> => {
  const chainAndAddress = formatChainAndAddress({
    address,
    chainId,
  })
  let url: URL
  if (timestamp) {
    url = new URL(`https://coins.llama.fi/prices/historical/${timestamp}/${chainAndAddress}?apikey=${API_KEY}`)
  } else {
    url = new URL(`https://coins.llama.fi/prices/current/${chainAndAddress}?apikey=${API_KEY}`)
  }
  const response = await fetch(url, {
    next: { revalidate: CACHE_DURATION_SECONDS },
  })

  const data = await response.json()
  const defiLlamaResponse = DefiLlamaResponseSchema.parse(data)
  return defiLlamaResponse.coins[chainAndAddress]?.price ?? null
}

export const fetchAssetsUSDValue = async ({
  assets,
}: {
  assets: AssetIdentifier[]
}): Promise<(number | null)[]> => {
  const chainAndAddresses = assets.map(({ address, chainId }) =>
    formatChainAndAddress({
      address,
      chainId,
    }),
  )
  const url = new URL(`https://coins.llama.fi/prices/current/${chainAndAddresses.join(',')}?apikey=${API_KEY}`)
  const response = await fetch(url, {
    next: { revalidate: CACHE_DURATION_SECONDS },
  })
  const data = await response.json()

  const defiLlamaResponse = DefiLlamaResponseSchema.parse(data)

  return chainAndAddresses.map((chainAndAddress) => defiLlamaResponse.coins[chainAndAddress]?.price ?? null)
}

export interface USDValuesBatchResponse {
  address: Address
  prices: Array<{ price: number; timestamp: number }> | null
}

const splitMap = (map: Map<string, number[]>, chunkSize: number): Map<string, number[]>[] => {
  const result = []
  for (const [key, value] of map.entries()) {
    for (let iter = 0; iter < value.length; iter += chunkSize) {
      result.push(new Map().set(key, [...value.slice(iter, iter + chunkSize)]))
    }
  }
  return result
}

export const fetchUSDValuesBatch = async ({
  addressesWithTimestamps,
  chainId,
  chunkSize = DEFAULT_BATCH_SIZE,
}: {
  addressesWithTimestamps: Map<Address, number[]>
  chainId: ChainId
  chunkSize?: number
}): Promise<USDValuesBatchResponse[]> => {
  const chunks = splitMap(addressesWithTimestamps, chunkSize)

  return await processChunks(chunks, chainId)
}

const makeBatchRequest = async (
  addressWithTimestamp: Map<string, number[]>,
  chainId: ChainId,
): Promise<USDValuesBatchResponse[]> => {
  const query = new Map<string, number[]>()

  addressWithTimestamp.forEach((value, key) => {
    query.set(
      formatChainAndAddress({
        address: AddressSchema.parse(key),
        chainId,
      }),
      value,
    )
  })

  const queryParam = encodeURIComponent(JSON.stringify(Object.fromEntries(query)))
    .replaceAll('%3A', ':')
    .replaceAll('%2C', ',')
  const url = new URL(`https://coins.llama.fi/batchHistorical?coins=${queryParam}&apikey=${API_KEY}`)
  const response = await fetch(url, {
    next: { revalidate: CACHE_DURATION_SECONDS },
  })
  const data = await response.json()
  const defiLlamaResponse = DefiLlamaBatchResponseSchema.parse(data)
  const addressesWithTimestampAndPrices: USDValuesBatchResponse[] = []

  addressWithTimestamp.forEach((_timestamps, address) => {
    const parsedAddress = AddressSchema.parse(address)

    addressesWithTimestampAndPrices.push({
      address: parsedAddress,
      prices:
        defiLlamaResponse.coins[
          formatChainAndAddress({
            address: parsedAddress,
            chainId,
          })
        ]?.prices ?? null,
    })
  })
  return addressesWithTimestampAndPrices
}

const concatenateByAddress = (responsesByToken: USDValuesBatchResponse[], address: Address): USDValuesBatchResponse => {
  const concatenatedData: USDValuesBatchResponse = {
    address,
    prices: [],
  }

  // biome-ignore lint/complexity/noForEach: <explanation>
  responsesByToken.forEach((entry) => {
    if (concatenatedData.prices) {
      concatenatedData.prices = concatenatedData.prices.concat(entry.prices ?? [])
    }
  })

  return concatenatedData
}

const processChunks = async (chunks: Map<string, number[]>[], chainId: ChainId) => {
  let results: USDValuesBatchResponse[] = []

  for (const chunk of chunks) {
    const result = await makeBatchRequest(chunk, chainId)
    results = results.concat(result)
    await new Promise((resolve) => setTimeout(resolve, DELAY_BATCH_REQUESTS))
  }

  const uniqueTokensAddresses = new Set(results.map((item) => item.address))
  let concatenatedByAddress: USDValuesBatchResponse[] = []
  // biome-ignore lint/complexity/noForEach: <explanation>
  uniqueTokensAddresses.forEach((address) => {
    concatenatedByAddress = concatenatedByAddress.concat(
      concatenateByAddress(
        results.filter((price) => addressesAreEqual(price.address, address)),
        address,
      ),
    )
  })
  return concatenatedByAddress
}
