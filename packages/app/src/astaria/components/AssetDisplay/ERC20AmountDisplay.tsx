'use client'

import { IconAlertTriangleFilled } from '@tabler/icons-react'

import { USDValueDisplay } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValueDisplay'
import { isVerifiedERC20 } from '@/app/isolated/intents/_/isVerifiedERC20'
import { BlockExplorerLink } from '@/astaria/components/BlockExplorerLink'
import { Button } from '@/astaria/components/Button'
import { CurrencyAmount } from '@/astaria/components/CurrencyAmount'
import { Popover, PopoverContent, PopoverTrigger } from '@/astaria/components/Popover'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import type { ERC20 } from 'assets'

export const ERC20AmountDisplay = ({
  className,
  erc20,
  hideUSDValue,
  highPrecision,
  linkAssetToBlockExplorer,
  mock,
  noTooltip,
  skeleton,
  suppressHydrationWarning,
  triggerExtraWording,
}: {
  className?: string
  erc20: ERC20 | undefined
  hideUSDValue?: boolean
  highPrecision?: boolean
  linkAssetToBlockExplorer?: boolean
  mock?: boolean
  noTooltip?: boolean
  skeleton?: boolean
  suppressHydrationWarning?: boolean
  triggerExtraWording?: string
}) => {
  const symbol = linkAssetToBlockExplorer ? (
    <BlockExplorerLink className="whitespace-nowrap" showIcon={false} type="address" value={erc20?.address}>
      {erc20?.symbol}
    </BlockExplorerLink>
  ) : (
    erc20?.symbol
  )

  const amountDisplay = (
    <div className="flex flex-wrap items-center gap-1">
      <span className={className}>
        <CurrencyAmount
          amount={erc20?.amount}
          decimals={erc20?.decimals}
          highPrecision={highPrecision}
          noTooltip={noTooltip}
          skeleton={skeleton}
          suppressHydrationWarning={suppressHydrationWarning}
          usdValue={erc20?.usdValue}
        />
        &nbsp;
        {symbol}
        &nbsp;
        {triggerExtraWording}
      </span>
      {!mock && erc20 && !isVerifiedERC20({ erc20 }) ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button aria-label="Warning" className="align-middle" emphasis="low" size="icon-xs">
              <IconAlertTriangleFilled className="inline h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            Astaria has not verified{' '}
            <BlockExplorerLink type="address" value={erc20?.address}>
              {erc20?.symbol}
            </BlockExplorerLink>
            . Confirm its details and proceed at your own risk.
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  )

  if (hideUSDValue) {
    return amountDisplay
  }

  return (
    <div>
      {amountDisplay}
      <USDValueDisplay
        className="text-left font-normal text-xs text-zinc-400"
        skeleton={skeleton}
        suppressHydrationWarning={suppressHydrationWarning}
        usdValue={
          erc20
            ? getUSDValue({
                amount: erc20.amount,
                decimals: erc20.decimals,
                usdValue: erc20.usdValue,
              })
            : undefined
        }
      />
    </div>
  )
}
