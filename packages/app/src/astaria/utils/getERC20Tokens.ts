import { type ChainId } from 'chains'

import { fetchUSDValue } from '@/astaria/utils/fetchUSDValue'

import { type ERC20Asset, SYMBOLS_RESTRICTED_FROM_BORROWING, getERC20TokensByChainId } from 'assets'

const sorted: { [key: string]: number } = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  TST20: 1,
  WETH: 10,
  WBTC: 11,
  USDC: 12,
  USDT: 13,
  DAI: 14,
  /* eslint-enable sort-keys-fix/sort-keys-fix */
}

const UNSORTED_INDEX = 99

const getIndex = (symbol: string) => {
  if (sorted[symbol]) {
    return sorted[symbol]
  }
  return UNSORTED_INDEX
}

// This should only be used for UI. If you need the tokens for other reasons then get ERC_20_TOKENS from the assets package.
export const getERC20Tokens = async ({
  chainId,
  type,
}: {
  chainId: ChainId
  type: 'borrow' | 'collateral' | 'deposit'
}) => {
  const erc20s = getERC20TokensByChainId(chainId)
    .map((token) => ({
      ...token,
      index: getIndex(token.symbol),
    }))
    .sort((a, b) => a.index - b.index) as ERC20Asset[]
  const filteredERC20s =
    type === 'borrow'
      ? erc20s.filter(
          (token) =>
            !SYMBOLS_RESTRICTED_FROM_BORROWING.some((symbol) => symbol.toLowerCase() === token.symbol.toLowerCase()),
        )
      : erc20s

  const tokensWithUSDValue = await Promise.all(
    filteredERC20s.map(async (erc20) => {
      const usdValue = await fetchUSDValue({
        address: erc20.address,
        chainId,
      })

      return {
        ...erc20,
        usdValue,
      }
    }),
  )

  return tokensWithUSDValue
}
