import { WithClassname, WithTooltipProvider } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { tokens } from '@storybook/tokens'

import { Percentage } from '@/domain/types/NumericValues'

import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { ApyWithRewardsCell } from './ApyWithRewardsCell'

const meta: Meta<typeof ApyWithRewardsCell> = {
  title: 'Features/Markets/Components/MarketsTable/Components/ApyWithRewardsCell',
  component: ApyWithRewardsCell,
  decorators: [WithTooltipProvider(), WithClassname('w-56')],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    apyDetails: {
      apy: Percentage(0.157),
      incentives: [],
      airdrops: [],
    },
    incentivizedReserve: tokens.ETH,
    reserveStatus: 'active',
  },
}

export default meta
type Story = StoryObj<typeof ApyWithRewardsCell>

export const WithoutIncentives: Story = {
  name: 'WithoutIncentives',
}

export const WithAirdrop: Story = {
  name: 'WithAirdrop',
  args: {
    apyDetails: {
      apy: Percentage(0.157),
      incentives: [],
      airdrops: [TokenSymbol('SPK')],
    },
  },
}

export const WithRewards: Story = {
  name: 'WithRewards',
  args: {
    apyDetails: {
      apy: Percentage(0.157),
      incentives: [{ token: tokens.stETH, APR: Percentage(0.1) }],
      airdrops: [],
    },
  },
}

export const WithAirdropAndRewards: Story = {
  name: 'WithAirdropAndRewards',
  args: {
    apyDetails: {
      apy: Percentage(0.157),
      airdrops: [TokenSymbol('SPK')],
      incentives: [{ token: tokens.stETH, APR: Percentage(0.1) }],
    },
  },
}
