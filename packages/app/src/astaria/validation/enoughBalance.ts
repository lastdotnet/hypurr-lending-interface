import { wagmiConfig } from '@/astaria/config/wagmi'
import { zeroAddress } from 'viem'
import { getAccount, getBalance } from 'wagmi/actions'
import { z } from 'zod'

import { getFormattedBalance } from '@/astaria/validation/getFormattedBalance'

import { type IntentAsset, isERC20Asset } from 'assets'

export const enoughBalance = async (
  { amount, asset, fieldName }: { amount: bigint | undefined; asset: IntentAsset; fieldName: string },
  ctx: z.RefinementCtx,
) => {
  if (isERC20Asset(asset)) {
    if (amount) {
      const account = getAccount(wagmiConfig)
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (account && account.address) {
        const balance = await getBalance(wagmiConfig, {
          address: account.address || zeroAddress,
          token: asset.address,
        })
        if (balance) {
          const formattedBalance = getFormattedBalance({
            balance,
            erc20: asset,
          })
          if (balance.value === 0n) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `You have ${formattedBalance} ${asset.symbol}`,
              path: [fieldName],
            })
            return z.NEVER
            // biome-ignore lint/style/noUselessElse: <explanation>
          } else if (amount > balance.value) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Enter ${formattedBalance} ${asset.symbol} or less`,
              path: [fieldName],
            })
            return z.NEVER
          }
        }
      }
    }
  }
}
