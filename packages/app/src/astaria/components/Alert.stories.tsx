import { type Meta, type StoryFn } from '@storybook/react'
import { IconTerminal } from '@tabler/icons-react'

import { Alert, AlertDescription, AlertTitle } from '@/astaria/components/Alert'

export default {
  component: Alert,
  title: 'Components/Alert',
} as Meta<typeof Alert>

const Story: StoryFn<typeof Alert> = (args) => (
  <Alert {...args}>
    <IconTerminal className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>You can add components to your app using the cli.</AlertDescription>
  </Alert>
)

export const alert = {
  args: {},
  render: Story,
}
