import { existsSync, writeFileSync } from 'node:fs'

import { type ChainId } from 'chains'
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

import aaveTokens from '../data/aave-missing-tokens.json'
import baseTokens from '../data/base-tokens.json'
import coinGeckoTokens from '../data/coingecko-tokens.json'
import { CONTRACT_BASED_TOKENS } from '../data/contract-based-tokens'
import mainnetTokens from '../data/mainnet-tokens.json'
import modeTokens from '../data/mode-tokens.json'
import sepoliaTokens from '../data/sepolia-tokens.json'
import uniswapTokens from '../data/uniswap-tokens.json'
import { convertToEnum } from './convertToEnum'

const S3_BUCKET_URL_BASE = 'https://d1il7bw1n2yreo.cloudfront.net/erc20'

const filterOutSomeTokens = (symbol: string) => {
  // PAX doesn't exist on CoinGecko
  if (symbol === 'PAX') {
    return false
  }
  // REPv2 doesn't exist on CoinGecko
  if (symbol === 'REPv2') {
    return false
  }

  return true
}

const getCoinGeckoSymbol = (symbol: string) => {
  if (symbol === 'EUROC') {
    // https://www.coinbase.com/price/euro-coin
    return 'eurc'
  }
  if (symbol === 'PRO') {
    return 'propy'
  }

  return symbol
}

const getCoinGeckoData = (symbol: string) => {
  const coinGeckoSymbol = getCoinGeckoSymbol(symbol)

  const coinGeckoToken = coinGeckoTokens.tokens.find(
    (token) =>
      !token.name.includes('Bridged') &&
      !token.id.includes('bridged') &&
      token.id !== 'reth' &&
      token.id !== 'upsidedowncat' &&
      token.symbol.toLowerCase() === coinGeckoSymbol.toLowerCase(),
  )

  if (coinGeckoToken) {
    return {
      name: coinGeckoToken.name,
    }
  }

  return undefined
}

const getLogoURI = ({
  logoURI,
  symbol,
}: {
  logoURI: string
  symbol: string
}) => {
  const fileExists = existsSync(`data/images/erc20/${symbol.toLowerCase()}.svg`)
  if (fileExists) {
    return `${S3_BUCKET_URL_BASE}/${symbol.toLowerCase()}.svg`
  }

  if (logoURI) {
    return logoURI
  }

  if (logoURI === undefined) {
    throw new Error(`Missing logoURI for ${symbol}.`)
  }

  if (logoURI && !logoURI.startsWith('https://assets.coingecko.com/coins/images')) {
    throw new Error(
      `${symbol} has a logoURI from a source other than CoinGecko. All logoURIs must come from CoinGecko for next/image. Find the source on CoinGecko or provide a SVG.`,
    )
  }

  return logoURI
}

const combinedTokens = [
  ...aaveTokens.tokens,
  ...baseTokens.tokens,
  ...mainnetTokens.tokens,
  ...sepoliaTokens.tokens,
  ...modeTokens.tokens,
  ...CONTRACT_BASED_TOKENS,
  ...uniswapTokens.tokens
    .filter(
      ({ chainId, symbol }) =>
        (chainId === base.id ||
          chainId === foundry.id ||
          chainId === mainnet.id ||
          chainId === mode.id ||
          chainId === sepolia.id) &&
        filterOutSomeTokens(symbol),
    )
    .map(({ logoURI, name, symbol, ...rest }) => {
      const coinGeckoData = getCoinGeckoData(symbol)

      return {
        ...rest,
        logoURI,
        name: coinGeckoData?.name ?? name,
        symbol,
      }
    }),
].sort((a, b) => a.symbol.localeCompare(b.symbol) || a.name.localeCompare(b.name)) as {
  address: string
  chainId: number
  decimals: number
  logoURI: string
  name: string
  symbol: string
}[]

const cleanTokens = combinedTokens.map(({ address, chainId, decimals, logoURI, name, symbol }) => {
  const cleanLogoURI = getLogoURI({ logoURI, symbol })

  return {
    address: address.toLowerCase(),
    chainId,
    decimals,
    logoURI: cleanLogoURI,
    name,
    symbol,
  }
})

writeFileSync('src/constants/erc20Tokens.json', `{\n  "tokens": ${JSON.stringify(cleanTokens)}\n}\n`)

const erc20Lookup = cleanTokens
  .sort((a, b) => a.address.localeCompare(b.address))
  .reduce((obj, token) => Object.assign(obj, { [token.address]: token }), {})
const exportERC20Lookup = `export const ERC20_LOOKUP: { [key: Address]: ERC20Asset } = ${JSON.stringify(erc20Lookup)};`

writeFileSync(
  'src/constants/erc20Lookup.ts',
  `/* eslint-disable sort-keys-fix/sort-keys-fix */\nimport { type Address } from 'viem';\n\nimport { type ERC20Asset } from '../types/erc20';\n\n${exportERC20Lookup}\n`,
)

const getSupportedSymbols = (chainId: ChainId) =>
  cleanTokens
    .filter((token) => token.chainId === chainId)
    .map(({ symbol }) => symbol)
    .sort()

const supportedSymbolsMainnetEnum = convertToEnum(getSupportedSymbols(mainnet.id))
const exportSymbolsMainnet = `export enum SupportedSymbolsMainnet ${supportedSymbolsMainnetEnum};`
const supportedSymbolsSepoliaEnum = convertToEnum(getSupportedSymbols(sepolia.id))
const exportSymbolsSepolia = `export enum SupportedSymbolsSepolia ${supportedSymbolsSepoliaEnum};`
const supportedSymbolsBaseEnum = convertToEnum(getSupportedSymbols(base.id))
const exportSymbolsBase = `export enum SupportedSymbolsBase ${supportedSymbolsBaseEnum};`
const supportedSymbolsModeEnum = convertToEnum(getSupportedSymbols(mode.id))
const exportSymbolsMode = `export enum SupportedSymbolsMode ${supportedSymbolsModeEnum};`

writeFileSync(
  'src/types/supported-symbols.ts',
  `${exportSymbolsMainnet}\n\n${exportSymbolsSepolia}\n\n${exportSymbolsBase}\n\n${exportSymbolsMode}\n`,
)
