import { type ChainId } from 'chains'
import { ETHER_DECIMALS } from 'common'

import { ChainLogo } from '@/astaria/components/ChainLogo'
import { CurrencyAmount } from '@/astaria/components/CurrencyAmount'
import { DEFAULT_SYMBOL } from '@/astaria/constants/constants'

export const AddWalletAssetsMessage = ({
  amountNeeded,
  balance = 0n,
  chainId,
  decimals = ETHER_DECIMALS,
  symbol = DEFAULT_SYMBOL,
  ...rest
}: {
  amountNeeded: bigint
  balance: bigint | undefined
  chainId: ChainId
  decimals: number
  symbol: string
}) => (
  <p {...rest}>
    Add{' '}
    <strong>
      <CurrencyAmount amount={amountNeeded - balance} decimals={decimals} noTooltip usdValue={null} /> {symbol}
    </strong>{' '}
    to your <ChainLogo chainId={chainId} /> wallet or connect a different wallet.
  </p>
)
