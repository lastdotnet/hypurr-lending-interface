import { WithTooltipProvider } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'

import { EModeIndicator } from './EModeIndicator'

const meta: Meta<typeof EModeIndicator> = {
  title: 'Features/MyPortfolio/Components/BorrowTable/Components/EModeIndicator',
  decorators: [WithTooltipProvider()],
  component: EModeIndicator,
  args: {
    onButtonClick: () => {},
  },
}

export default meta
type Story = StoryObj<typeof EModeIndicator>

export const EModeOff: Story = {
  name: 'E-Mode Off',
  args: {
    eModeCategoryId: 0,
  },
}

export const EModeHYPECorrelated: Story = {
  name: 'E-Mode HYPE Correlated',
  args: {
    eModeCategoryId: 1,
  },
}

export const EModeStablecoins: Story = {
  name: 'E-Mode Stablecoins',
  args: {
    eModeCategoryId: 2,
  },
}
