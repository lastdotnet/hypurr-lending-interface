import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { testAddresses } from '@/test/integration/constants'

import { AddressBlocked } from './AddressBlocked'

const meta: Meta<typeof AddressBlocked> = {
  title: 'Features/Compliance/Components/AddressBlocked',
  component: AddressBlocked,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    address: testAddresses.alice,
    disconnect: () => {},
  },
}

export default meta
type Story = StoryObj<typeof AddressBlocked>

export const Desktop: Story = {}
export const Mobile: Story = getMobileStory(Desktop)
export const Tablet: Story = getTabletStory(Desktop)
