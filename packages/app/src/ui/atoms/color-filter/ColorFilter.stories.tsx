import { Meta, StoryObj } from '@storybook/react'

import { assets } from '@/ui/assets'
import Image from 'next/image'

import { ColorFilter } from './ColorFilter'

const meta: Meta<typeof ColorFilter> = {
  title: 'Components/Atoms/ColorFilter',
  component: ColorFilter,
}

const children = (
  <div className="inline-flex max-w-[100px] gap-2">
    <Image src={assets.token.usdt} alt={''} />
    <Image src={assets.token.usdc} alt={''} />
  </div>
)

export default meta
type Story = StoryObj<typeof meta>

export const Red: Story = {
  args: {
    variant: 'red',
    children,
  },
}

export const Green: Story = {
  args: {
    variant: 'green',
    children,
  },
}

export const Blue: Story = {
  args: {
    variant: 'blue',
    children,
  },
}

export const None: Story = {
  args: {
    variant: 'none',
    children,
  },
}
