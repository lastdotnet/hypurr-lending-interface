import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { type Mock } from 'vitest'

import { Form, FormField, FormItem } from '@/astaria/components/Form'
import { NumberInput, type NumberInputProps } from '@/astaria/components/NumberInput'
import { NUMBER_VALIDATION } from '@/astaria/validation/number'

export const testFormSchema = z.object({
  numberField: NUMBER_VALIDATION,
})
export type TestFormSchemaType = z.infer<typeof testFormSchema>

export const NumberInputForTesting = ({
  onChange,
  ...rest
}: NumberInputProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: Mock<any, any>
}) => {
  const form = useForm<TestFormSchemaType>({
    // defaultValues: { numberField: 0 },
    mode: 'onTouched',
    resolver: zodResolver(testFormSchema),
  })
  const { control } = form

  return (
    <Form {...form}>
      <form id="testForm" noValidate>
        <FormField
          control={control}
          name="numberField"
          render={({ field }) => (
            <FormItem>
              <NumberInput
                {...rest}
                {...field}
                onChange={(value) => {
                  onChange(value)
                  field.onChange(value)
                }}
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
