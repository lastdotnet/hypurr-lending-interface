import { Percentage } from '@/domain/types/NumericValues'
import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'
import { WelcomeDialog } from './WelcomeDialog'

const meta: Meta<typeof WelcomeDialog> = {
  title: 'Features/Savings/Components/WelcomeDialog',
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  component: WelcomeDialog,
  args: {
    open: true,
    onConfirm: () => {},
    apyImprovement: Percentage(0.01),
  },
}

export default meta
type Story = StoryObj<typeof WelcomeDialog>

export const Desktop: Story = {}
export const Mobile: Story = getMobileStory(Desktop)
export const Tablet: Story = getTabletStory(Desktop)
