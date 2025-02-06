import { Meta, StoryObj } from '@storybook/react'

import { RegionBlocked } from './RegionBlocked'

const meta: Meta<typeof RegionBlocked> = {
  title: 'Features/Compliance/Components/RegionBlocked',
  component: RegionBlocked,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    countryCode: 'IR',
  },
}

export default meta
type Story = StoryObj<typeof RegionBlocked>

export const Desktop: Story = {}
