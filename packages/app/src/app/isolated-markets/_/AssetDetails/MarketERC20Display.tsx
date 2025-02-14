import { CurrencyAmountWrapper } from '@/astaria/components/CurrencyAmountWrapper'
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { SkeletonText } from '@/astaria/components/SkeletonText'

import { type ERC20Asset } from 'assets'

export const MarketERC20Display = ({
  erc20,
  skeleton,
}: {
  erc20: ERC20Asset | undefined
  skeleton?: boolean
}) => (
  <CurrencyAmountWrapper>
    <ERC20Image erc20={erc20} skeleton={skeleton} />
    <div>
      <div className="font-medium">{skeleton ? <SkeletonText /> : erc20?.name}</div>
      <div className="text-xs font-medium text-zinc-400">{skeleton ? <SkeletonText /> : erc20?.symbol}</div>
    </div>
  </CurrencyAmountWrapper>
)
