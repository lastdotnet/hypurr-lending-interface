import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import type { Meta, StoryObj } from '@storybook/react'
import { tokens } from '@storybook/tokens'
import { getMobileStory, getTabletStory } from '@storybook/viewports'
import { StablecoinsInWallet } from './StablecoinsInWallet'

const meta: Meta<typeof StablecoinsInWallet> = {
  title: 'Features/Savings/Components/StablecoinsInWallet',
  component: StablecoinsInWallet,
}

export default meta
type Story = StoryObj<typeof StablecoinsInWallet>

export const Desktop: Story = {
  name: 'Stablecoins in wallet',
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    assets: [
      {
        token: tokens.DAI,
        balance: NormalizedUnitNumber(22727),
        blockExplorerLink: '/',
      },
      {
        token: tokens.USDS,
        balance: NormalizedUnitNumber(22720),
        blockExplorerLink: '/',
      },
      {
        token: tokens.USDC,
        balance: NormalizedUnitNumber(0),
        blockExplorerLink: '/',
      },
    ],
    migrationInfo: {
      daiSymbol: tokens.DAI.symbol,
      usdsSymbol: tokens.USDS.symbol,
      daiToUsdsUpgradeAvailable: true,
      apyImprovement: Percentage(0.01),
      openDaiToUsdsUpgradeDialog: () => {},
      openUsdsToDaiDowngradeDialog: () => {},
      openSDaiToSUsdsUpgradeDialog: () => {},
    },
    openDialog: () => {},
    showConvertDialogButton: true,
  },
}

export const Mobile = getMobileStory(Desktop)
export const Tablet = getTabletStory(Desktop)
