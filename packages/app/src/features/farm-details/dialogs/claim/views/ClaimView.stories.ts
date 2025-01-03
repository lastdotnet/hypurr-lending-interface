import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { WithClassname, ZeroAllowanceWagmiDecorator } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { tokens } from '@storybook/tokens'
import { getMobileStory, getTabletStory } from '@storybook/viewports'
import { ClaimView } from './ClaimView'

const meta: Meta<typeof ClaimView> = {
  title: 'Features/FarmDetails/Dialogs/Claim/Views/ClaimView',
  component: ClaimView,
  decorators: [WithClassname('max-w-xl'), ZeroAllowanceWagmiDecorator()],
  args: {
    txOverview: {
      reward: {
        token: tokens.SKY,
        value: NormalizedUnitNumber(500.89),
      },
    },
    objectives: [
      {
        type: 'claimFarmRewards',
        farm: tokens.USDS.address,
        rewardToken: tokens.SKY,
        rewardAmount: NormalizedUnitNumber(500.89),
      },
    ],
    pageStatus: {
      state: 'form',
      actionsEnabled: true,
      goToSuccessScreen: () => {},
    },
    actionsContext: {},
  },
}

export default meta
type Story = StoryObj<typeof ClaimView>

export const Desktop: Story = {}
export const Mobile = getMobileStory(Desktop)
export const Tablet = getTabletStory(Desktop)

export const NoApiData: Story = {
  args: {
    txOverview: {
      reward: {
        token: tokens.SKY.clone({ unitPriceUsd: NormalizedUnitNumber(0) }),
        value: NormalizedUnitNumber(500.89),
      },
    },
  },
}
export const NoApiDataMobile = getMobileStory(NoApiData)
export const NoApiDataTablet = getTabletStory(NoApiData)
