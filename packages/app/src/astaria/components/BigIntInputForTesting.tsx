import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { type Mock } from 'vitest'

import { BigIntInput, type BigIntInputProps } from '@/astaria/components/BigIntInput'
import { Form, FormField, FormItem } from '@/astaria/components/Form'
import { AMOUNT_VALIDATION } from '@/astaria/validation/amount'

export const testFormSchema = z.object({
  bigintField: AMOUNT_VALIDATION,
})
export type TestFormSchemaType = z.infer<typeof testFormSchema>

export const BigIntInputForTesting = ({
  onChange,
  ...rest
}: BigIntInputProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: Mock<any, any>
}) => {
  const form = useForm<TestFormSchemaType>({
    // defaultValues: { bigintField: 0n },
    mode: 'onTouched',
    resolver: zodResolver(testFormSchema),
  })
  const { control } = form

  return (
    <Form {...form}>
      <form id="testForm" noValidate>
        <FormField
          control={control}
          name="bigintField"
          render={({ field }) => (
            <FormItem>
              <BigIntInput
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
