import { IconCheck } from '@tabler/icons-react'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import { USDValue } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValue'
import { CommandItem } from '@/astaria/components/Command'
import { CurrencyAmount } from '@/astaria/components/CurrencyAmount'
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { SkeletonText } from '@/astaria/components/SkeletonText'

import { type ERC20Asset } from 'assets'

export const ERC20SelectorItemDisplay = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandItem> & {
    amount: bigint | undefined
    erc20: ERC20Asset | undefined
    isSelected: boolean
    skeleton?: boolean
  }
>(({ amount, erc20, isSelected, skeleton, ...rest }, ref) => (
  <CommandItem ref={ref} className="flex cursor-pointer justify-between gap-2" value={erc20?.symbol} {...rest}>
    <div className="flex items-center gap-2">
      <ERC20Image erc20={erc20} size="md" skeleton={!erc20} />
      <div>
        <div>{erc20 ? erc20.name : <SkeletonText />}</div>
        <div>{erc20 ? erc20.symbol : <SkeletonText />}</div>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <div className="text-right">
        <CurrencyAmount amount={amount} decimals={erc20?.decimals} skeleton={skeleton} usdValue={erc20?.usdValue} />
        {erc20 && amount ? <USDValue amount={amount} asset={erc20} className="text-xs text-zinc-400" /> : null}
      </div>
      <IconCheck className={clsx('h-4 w-4 shrink-0', isSelected ? 'opacity-100' : 'opacity-0')} />
    </div>
  </CommandItem>
))
ERC20SelectorItemDisplay.displayName = 'ERC20SelectorItemDisplay'
