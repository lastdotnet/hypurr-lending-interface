import { ERC20AmountDisplay } from '@/astaria/components/AssetDisplay/ERC20AmountDisplay'
import { CurrencyAmountWrapper } from '@/astaria/components/CurrencyAmountWrapper'
import { ERC20Image } from '@/astaria/components/ERC20Image'

import { type ERC20 } from 'assets'

export const ERC20Display = ({
  className,
  erc20,
  hideUSDValue,
  highPrecision,
  linkAssetToBlockExplorer,
  mock,
  noTooltip,
  size,
  skeleton,
  triggerExtraWording,
}: {
  className?: string
  erc20: ERC20 | undefined
  hideUSDValue?: boolean
  highPrecision?: boolean
  linkAssetToBlockExplorer?: boolean
  mock?: boolean
  noTooltip?: boolean
  size?: 'md' | 'sm' | 'xl'
  skeleton?: boolean
  triggerExtraWording?: string
}) => (
  <CurrencyAmountWrapper className={className}>
    <ERC20Image erc20={erc20} size={size} skeleton={skeleton} />
    <ERC20AmountDisplay
      erc20={erc20}
      hideUSDValue={hideUSDValue}
      highPrecision={highPrecision}
      linkAssetToBlockExplorer={linkAssetToBlockExplorer}
      mock={mock}
      noTooltip={noTooltip}
      skeleton={skeleton}
      triggerExtraWording={triggerExtraWording}
    />
  </CurrencyAmountWrapper>
)
