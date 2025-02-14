import { type Meta, type StoryFn } from '@storybook/react'

import { Input } from '@/astaria/components/Input'
import { Label } from '@/astaria/components/Label'

export default {
  args: {
    disabled: false,
    type: 'text',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'radio',
      options: ['color', 'email', 'file', 'number', 'password', 'tel', 'text', 'url'],
    },
  },
  component: Input,
  title: 'Components/Input',
} as Meta<typeof Input>

const Story: StoryFn<typeof Input> = (args) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label htmlFor="input">Input</Label>
    <Input id="input" {...args} />
  </div>
)

export const input = {
  args: {},
  render: Story,
}

export const inputError = {
  args: {
    isError: true,
  },

  render: Story,
}
