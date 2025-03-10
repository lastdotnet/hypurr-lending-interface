import { WithClassname, WithTooltipProvider } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { NormalizedUnitNumber } from '@/domain/types/NumericValues'

import { DebtCeilingProgress } from './DebtCeilingProgress'

const meta: Meta<typeof DebtCeilingProgress> = {
  title: 'Features/Markets/Components/DebtCeilingProgress',
  component: DebtCeilingProgress,
  decorators: [WithTooltipProvider(), WithClassname('max-w-2xl')],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof DebtCeilingProgress>

export const Default: Story = {
  args: {
    debt: NormalizedUnitNumber(37_896_154),
    debtCeiling: NormalizedUnitNumber(50_000_000),
  },
}

export const Full: Story = {
  args: {
    debt: NormalizedUnitNumber(50_000_000),
    debtCeiling: NormalizedUnitNumber(50_000_000),
  },
}

export const Mobile = getMobileStory(Default)
export const Tablet = getTabletStory(Default)
