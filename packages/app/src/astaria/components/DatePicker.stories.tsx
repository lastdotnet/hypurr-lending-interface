import { type Meta, type StoryFn } from '@storybook/react'

import { DatePicker } from '@/astaria/components/DatePicker'

export default {
  component: DatePicker,
  title: 'Components/DatePicker',
} as Meta<typeof DatePicker>

const Story: StoryFn<typeof DatePicker> = () => <DatePicker />

export const datePicker = {
  args: {},
  render: Story,
}
