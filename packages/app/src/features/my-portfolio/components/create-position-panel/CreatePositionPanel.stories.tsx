import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { CreatePositionPanel } from './CreatePositionPanel'

const meta: Meta<typeof CreatePositionPanel> = {
  title: 'Features/MyPortfolio/Components/CreatePositionPanel',
  component: CreatePositionPanel,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof CreatePositionPanel>

export const Desktop: Story = {}
export const Mobile = getMobileStory(Desktop)
export const Tablet = getTabletStory(Desktop)
