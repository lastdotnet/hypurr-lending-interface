import { WithClassname } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'

import { DoughnutChart } from './DoughnutChart'

const meta: Meta<typeof DoughnutChart> = {
  title: 'Components/Atoms/DoughnutChart',
  component: DoughnutChart,
  decorators: [WithClassname('max-w-xl')],
}

export default meta
type Story = StoryObj<typeof DoughnutChart>

export const Default: Story = {
  name: 'Default',
  args: {
    data: [
      { value: 255778, color: '#627EEA', assetName: 'USDC' },
      { value: 90000, color: '#3392F8', assetName: 'USDT' },
      { value: 64856, color: '#7CC0FF', assetName: 'DAI' },
      { value: 57340, color: '#3F495B', assetName: 'USDC' },
      { value: 50000, color: '#FFC046', assetName: 'USDT' },
      { value: 45800, color: '#FD1B35', assetName: 'USDC' },
    ],
  },
}
