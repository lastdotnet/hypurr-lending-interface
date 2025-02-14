import { type Meta } from '@storybook/react'

import { Button } from '@/astaria/components/Button'

export default {
  args: {
    children: 'Button',
    disabled: false,
  },
  argTypes: {
    emphasis: {
      control: { type: 'radio' },
      options: ['high', 'medium', 'low'],
    },
  },
  component: Button,
  title: 'Components/Button',
} as Meta<typeof Button>

export const button = {
  args: {},
}
