import { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'
import { assets } from '@/ui/assets'
import { Sparkles } from './Sparkles'

const meta: Meta<typeof Sparkles> = {
  title: 'Components/Atoms/Sparkles',
  component: Sparkles,
}

export default meta
type Story = StoryObj<typeof Sparkles>

export const SparklesOnText: Story = {
  name: 'Sparkles on text',
  render: () => <Sparkles>Text</Sparkles>,
}

export const SparklesOnImage: Story = {
  name: 'Sparkles on image',
  render: () => (
    <Sparkles sizeRange={[8, 12]}>
      <Image src={assets.token.usdxl} className="h-5 w-5" alt={''} />
    </Sparkles>
  ),
}
