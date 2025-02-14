import { IconExclamationCircle } from '@tabler/icons-react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { type LendIntentFormSchema } from '@/app/intents/_/TransmitIntent/TransmitLendIntent/lendIntentFormSchema'
import { CardSection } from '@/astaria/components/Card'
import { FormLabel } from '@/astaria/components/Form'
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverInfoTrigger } from '@/astaria/components/PopoverInfoTrigger'
import { Switch } from '@/astaria/components/Switch'

export const RepeatFillSection = () => {
  const { control } = useFormContext<LendIntentFormSchema>()
  const repeatFill = useWatch({
    control,
    name: 'repeatFill',
  })

  return (
    <CardSection>
      <div className="flex items-center justify-between gap-2">
        <FormLabel above={false} className="font-medium">
          Repeat fill{' '}
          <Popover>
            <PopoverInfoTrigger />
            <PopoverContent>
              Turn off to only fill a loan with these parameters once. Leave on to fill repeatedly until assets are
              depleted.
            </PopoverContent>
          </Popover>
        </FormLabel>
        <Controller
          control={control}
          name="repeatFill"
          render={({ field: { onBlur, onChange, ref, value } }) => (
            <Switch ref={ref} checked={value} onBlur={onBlur} onCheckedChange={onChange} />
          )}
        />
      </div>
      {repeatFill ? (
        <div className="mt-2 flex items-center gap-1 bg-muted p-2 text-sm font-medium">
          <IconExclamationCircle className="h-4 w-4" />
          Set the spending cap to the max
        </div>
      ) : null}
    </CardSection>
  )
}
