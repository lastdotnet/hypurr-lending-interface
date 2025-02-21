import { useFormContext } from 'react-hook-form'

import { type BorrowIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/astaria/components/Form'
import { PercentInput } from '@/astaria/components/PercentInput'
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverInfoTrigger } from '@/astaria/components/PopoverInfoTrigger'
import { INTENTS_APY_MAXIMUM } from '@/astaria/constants/constants'

export const APYSection = ({
  label,
  tooltip,
}: {
  label: string
  tooltip: string
}) => {
  const { control } = useFormContext<BorrowIntentFormSchema>()

  return (
    <FormField
      control={control}
      name="apy"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}{' '}
            <Popover>
              <PopoverInfoTrigger />
              <PopoverContent>{tooltip}</PopoverContent>
            </Popover>
          </FormLabel>
          <FormControl>
            <PercentInput {...field} emphasis="low" max={INTENTS_APY_MAXIMUM} placeholder="0%" textSize="3xl" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
