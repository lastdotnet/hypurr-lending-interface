import partition from 'lodash.partition'

import { type ERC20, type ERC20Asset } from 'assets'

export const getERC20sWithBalance = ({
  balances,
  erc20s,
}: {
  balances: (Omit<ERC20, 'usdValue'> | undefined)[]
  erc20s: Omit<ERC20Asset, 'amount'>[] | undefined
}) => {
  const [erc20sWithBalance, erc20sWithoutBalance] = partition(
    erc20s?.map((erc20, index) => {
      const balance = balances.at(index)

      return {
        ...erc20,
        amount: balance?.amount ?? 0n,
      }
    }),
    (erc20) => erc20.amount > 0n,
  )

  return { erc20sWithBalance, erc20sWithoutBalance }
}
