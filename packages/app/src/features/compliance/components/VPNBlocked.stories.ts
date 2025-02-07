import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { VPNBlocked } from './VPNBlocked'

const meta: Meta<typeof VPNBlocked> = {
  title: 'Features/Compliance/Components/VPNBlocked',
  component: VPNBlocked,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof VPNBlocked>

export const Desktop: Story = {}
export const Mobile: Story = getMobileStory(Desktop)
export const Tablet: Story = getTabletStory(Desktop)
