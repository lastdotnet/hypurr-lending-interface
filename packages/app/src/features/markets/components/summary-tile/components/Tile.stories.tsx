import { WithTooltipProvider } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { assets } from '@/ui/assets'
import { msg } from '@lingui/core/macro'

import { Tile } from './Tile'

const meta: Meta<typeof Tile> = {
  title: 'Features/Markets/Components/SummaryTile/Components/Tile',
  component: Tile,
  decorators: [WithTooltipProvider()],
  args: {
    icon: assets.markets.lock,
    title: msg`Total value locked`,
    USDValue: NormalizedUnitNumber(12_300_000_000),
    description: 'Total value locked lengthy description',
  },
}

export default meta
type Story = StoryObj<typeof Tile>

export const Default: Story = {
  name: 'Default',
}

export const Mobile = getMobileStory(Default)
export const Tablet = getTabletStory(Default)
