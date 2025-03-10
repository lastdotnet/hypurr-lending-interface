import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { MarketPriceOracleInfo, YieldingFixedOracleInfo } from '@/domain/oracles/types'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { WithClassname, WithTooltipProvider, ZeroAllowanceWagmiDecorator } from '@storybook/decorators'
import { tokens } from '@storybook/tokens'
import { OraclePanel } from './OraclePanel'

const meta: Meta<typeof OraclePanel> = {
  title: 'Features/MarketDetails/Components/OraclePanel',
  component: OraclePanel,
  decorators: [WithTooltipProvider(), ZeroAllowanceWagmiDecorator(), WithClassname('max-w-2xl')],
  args: {
    isLoading: false,
    error: undefined,
  },
}

export default meta
type Story = StoryObj<typeof OraclePanel>

export const FixedDesktop: Story = {
  args: {
    data: {
      type: 'fixed',
      token: tokens.DAI,
      price: NormalizedUnitNumber(1),
      chainId: 1,
      priceOracleAddress: CheckedAddress('0x1234567890123456789012345678901234567890'),
    },
  },
}
export const FixedMobile = getMobileStory(FixedDesktop)
export const FixedTablet = getTabletStory(FixedDesktop)

const marketPriceData: MarketPriceOracleInfo = {
  type: 'market-price',
  providedBy: ['redstone'],
  token: tokens.WETH,
  price: NormalizedUnitNumber(2235.0672),
  chainId: 1,
  priceOracleAddress: CheckedAddress('0x1234567890123456789012345678901234567890'),
}
export const MarketPriceDesktop: Story = {
  args: {
    data: marketPriceData,
  },
}
export const MarketPriceRedundantDesktop: Story = {
  args: {
    data: {
      ...marketPriceData,
      providedBy: ['redstone'],
    },
  },
}
export const MarketPriceMobile = getMobileStory(MarketPriceDesktop)
export const MarketPriceTablet = getTabletStory(MarketPriceDesktop)

export const UnderlyingAssetDesktop: Story = {
  args: {
    data: {
      type: 'underlying-asset',
      asset: 'EUR (FIAT)',
      token: tokens.EURe,
      price: NormalizedUnitNumber(1.24),
      chainId: 1,
      priceOracleAddress: CheckedAddress('0x1234567890123456789012345678901234567890'),
    },
  },
}
export const UnderlyingAssetMobile = getMobileStory(UnderlyingAssetDesktop)
export const UnderlyingAssetTablet = getTabletStory(UnderlyingAssetDesktop)

const yieldingFixedData: YieldingFixedOracleInfo = {
  type: 'yielding-fixed',
  baseAssetSymbol: TokenSymbol('ETH'),
  providedBy: ['redstone'],
  ratio: NormalizedUnitNumber(2.137),
  price: NormalizedUnitNumber(4776.34),
  token: tokens.weETH,
  chainId: 1,
  priceOracleAddress: CheckedAddress('0x28897036f8459bFBa886083dD6b4Ce4d2f14a57F'),
  baseAssetOracle: CheckedAddress('0xb20A1374EfCaFa32F701Ab14316fA2E5b3400eD5'),
  baseAssetPrice: tokens.WETH.unitPriceUsd,
}

export const YieldingFixedDesktop: Story = {
  args: {
    data: yieldingFixedData,
  },
}
export const YieldingFixedRedundantDesktop: Story = {
  args: {
    data: {
      ...yieldingFixedData,
      providedBy: ['redstone'],
    },
  },
}
export const YieldingFixedMobile = getMobileStory(YieldingFixedDesktop)
export const YieldingFixedTablet = getTabletStory(YieldingFixedDesktop)

export const UnknownDesktop: Story = {
  args: {
    data: {
      type: 'unknown',
      price: NormalizedUnitNumber(1.06),
      token: tokens.sDAI,
      chainId: 1,
      priceOracleAddress: CheckedAddress('0x1234567890123456789012345678901234567890'),
    },
  },
}

export const UnknownMobile = getMobileStory(UnknownDesktop)
export const UnknownTablet = getTabletStory(UnknownDesktop)

export const LoadingDesktop: Story = {
  args: {
    data: undefined,
    isLoading: true,
  },
}
