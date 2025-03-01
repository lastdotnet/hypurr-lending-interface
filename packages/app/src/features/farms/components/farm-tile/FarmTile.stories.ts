import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import { WithClassname } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { tokens } from '@storybook/tokens'
import { getMobileStory, getTabletStory } from '@storybook/viewports'
import { FarmTile } from './FarmTile'

const meta: Meta<typeof FarmTile> = {
  title: 'Features/Farms/Components/FarmTile',
  component: FarmTile,
  decorators: [WithClassname('flex w-80')],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    apy: Percentage(0.05),
    staked: NormalizedUnitNumber(0),
    rewardToken: tokens.weETH,
    stakingToken: tokens.USDS,
    detailsLink: 'farm-details/1/0x1234567890123456789012345678901234567890',
    entryAssetsGroup: {
      type: 'stablecoins',
      name: 'Stablecoins',
      assets: [tokens.DAI.symbol, tokens.sDAI.symbol, tokens.USDC.symbol, tokens.USDS.symbol, tokens.sUSDS.symbol],
    },
    isPointsFarm: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
export const Mobile = getMobileStory(Desktop)
export const Tablet = getTabletStory(Desktop)

export const WithDeposit: Story = {
  args: {
    staked: NormalizedUnitNumber(100),
  },
}

export const GovernanceEntryAssets: Story = {
  args: {
    rewardToken: tokens.USDS,
    stakingToken: tokens.weETH,
    apy: Percentage(0.05),
    staked: NormalizedUnitNumber(0),
    detailsLink: 'farm-details/1/0x1234567890123456789012345678901234567890',
    entryAssetsGroup: {
      type: 'governance',
      name: 'Governance Tokens',
      assets: [tokens.SKY.symbol, tokens.GNO.symbol],
    },
  },
}

export const WithZeroApy: Story = {
  args: {
    apy: Percentage(0),
  },
}
