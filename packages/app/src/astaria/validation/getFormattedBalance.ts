import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'

import { type ERC20 } from 'assets'

export const getFormattedBalance = ({
  balance,
  erc20,
}: {
  balance: { value: bigint }
  erc20: ERC20
}) =>
  formatCurrency({
    amount: balance.value || 0,
    decimals: erc20.decimals,
    usdValue: erc20.usdValue,
  }).trigger
