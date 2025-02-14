import { type ChainId } from 'chains'

import { AddWalletAssetsMessage } from '@/astaria/components/AddWalletAssetsMessage'
import { Tooltip } from '@/astaria/components/Tooltip'

export const NotEnoughBalance = ({
  amountNeeded,
  balance,
  chainId,
  decimals,
  extraWords,
  symbol,
}: {
  amountNeeded: bigint
  balance: bigint | undefined
  chainId: ChainId
  decimals: number
  extraWords?: string
  symbol: string
}) => (
  <Tooltip
    content={
      <AddWalletAssetsMessage
        amountNeeded={amountNeeded}
        balance={balance}
        chainId={chainId}
        decimals={decimals}
        symbol={symbol}
      />
    }
    trigger={`Add ${symbol}${extraWords ? ` ${extraWords}` : ''}`}
    underline
  />
)
