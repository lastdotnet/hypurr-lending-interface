import { WithClassname } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { TopBanner } from './TopBanner'

const meta: Meta<typeof TopBanner> = {
  title: 'Components/Atoms/TopBanner',
  component: TopBanner,
  decorators: [WithClassname('w-full')],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof TopBanner>

export const Desktop: Story = {}
export const Mobile: Story = getMobileStory(Desktop)
export const Tablet: Story = getTabletStory(Desktop)
