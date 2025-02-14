import { type Meta, type StoryFn } from '@storybook/react'
import { IconCheck } from '@tabler/icons-react'

import { Button } from '@/astaria/components/Button'
import { Toast } from '@/astaria/components/Toast'
import { useToast } from '@/astaria/components/Toast/useToast'

export default {
  component: Toast,
  title: 'Components/Toast',
} as Meta<typeof Toast>

const Story: StoryFn<typeof Toast> = () => {
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-3">
      <Button
        emphasis="medium"
        onClick={() => {
          toast({
            description: 'Friday, February 10, 2023 at 5:57 PM',
            title: 'Scheduled: Catch up',
          })
        }}
      >
        Add to calendar
      </Button>
      <Button
        emphasis="medium"
        onClick={() => {
          toast({
            description: 'Friday, February 10, 2023 at 5:57 PM',
            icon: <IconCheck />,
            title: 'Scheduled: Catch up',
          })
        }}
      >
        With icon
      </Button>
      <Button
        emphasis="medium"
        onClick={() => {
          toast({
            description: 'Destructive description',
            title: 'Destructive title',
            tone: 'destructive',
          })
        }}
      >
        Destructive
      </Button>
    </div>
  )
}

export const toast = {
  args: {},
  render: Story,
}
