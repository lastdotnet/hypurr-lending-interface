import { WithClassname, WithTooltipProvider } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { getHoveredStory } from '@storybook/utils'
import { AirdropBadge } from './AirdropBadge'

const meta: Meta<typeof AirdropBadge> = {
  title: 'Features/Markets/Components/AirdropBadge',
  component: AirdropBadge,
  decorators: [WithTooltipProvider(), WithClassname('bg-white flex justify-center p-8 items-end w-96 h-64')],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof AirdropBadge>

export const Default: Story = {
  name: 'Default',
}

export const Hovered = getHoveredStory(Default, 'button')
