import { type Meta, type StoryFn } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { BigIntInput } from '@/astaria/components/BigIntInput'
import { Form, FormField, FormItem, FormMessage } from '@/astaria/components/Form'
import { Label } from '@/astaria/components/Label'
import { NUMBER_VALIDATION } from '@/astaria/validation/number'

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
  },
  component: BigIntInput,
  title: 'Components/BigIntInput',
} as Meta<typeof BigIntInput>

const Story: StoryFn<typeof BigIntInput> = (args) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label htmlFor="input">Input</Label>
    <BigIntInput id="input" {...args} />
  </div>
)

export const bigIntInput = {
  args: {},
  render: Story,
}

export const testFormSchema = z.object({
  percent: NUMBER_VALIDATION,
})
export type TestFormSchemaType = z.infer<typeof testFormSchema>

const ControlledStory: StoryFn<typeof BigIntInput> = (args) => {
  const form = useForm<TestFormSchemaType>({
    mode: 'onTouched',
    resolver: zodResolver(testFormSchema),
  })
  const { control } = form

  return (
    <Form {...form}>
      <form id="testForm" noValidate>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="input">Input</Label>
          <FormField
            control={control}
            name="percent"
            render={({ field }) => (
              <FormItem>
                <BigIntInput {...field} id="input" {...args} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export const controlledBigIntInput = {
  args: {},
  render: ControlledStory,
}
