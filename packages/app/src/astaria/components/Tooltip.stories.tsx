import { type Meta, type StoryFn } from '@storybook/react'

import { Button } from '@/astaria/components/Button'
import { Tooltip } from '@/astaria/components/Tooltip'

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
} as Meta<typeof Tooltip>

const Story: StoryFn<typeof Tooltip> = () => (
  <Tooltip
    content={<p>Add to library</p>}
    trigger={<Button emphasis="medium">Hover</Button>}
    triggerAsChild
    underline
  />
)

export const tooltip = {
  args: {},
  render: Story,
}
