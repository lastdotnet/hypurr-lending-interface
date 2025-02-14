import { AssetDisplay } from '@/astaria/components/AssetDisplay'

import { type Asset, type ERC20 } from 'assets'

export const MockIntent = ({
  asking,
  collateral,
}: {
  asking: ERC20
  collateral: Asset
}) => (
  <div className="flex shrink-0 items-center gap-2 rounded-sm border bg-background p-2 md:p-4 md:text-xl">
    <span className="shrink-0 italic">Borrowing</span>{' '}
    <AssetDisplay asset={asking} className="shrink-0 whitespace-nowrap font-bold" hideUSDValue mock noTooltip />
    <span className="shrink-0 italic">for</span>{' '}
    <AssetDisplay asset={collateral} className="shrink-0 whitespace-nowrap font-bold" hideUSDValue mock noTooltip />
  </div>
)
