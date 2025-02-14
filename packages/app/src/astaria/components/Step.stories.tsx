import { type Meta } from '@storybook/react'

import { Step } from '@/astaria/components/Step'

export default {
  component: Step,
  title: 'Components/Step',
} as Meta<typeof Step>

export const isConfirming = {
  args: { isConfirming: true },
}

export const isFinished = {
  args: { isFinished: true },
}

export const isLoading = {
  args: { isLoading: true },
}
