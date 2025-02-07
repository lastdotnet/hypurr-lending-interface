import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { NotFound } from './NotFound'

const meta: Meta<typeof NotFound> = {
  title: 'Features/Errors/NotFound',
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  component: NotFound,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Mobile: Story = getMobileStory(Default)
export const Tablet: Story = getTabletStory(Default)
