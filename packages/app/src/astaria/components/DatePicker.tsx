'use client'

import { IconCalendar } from '@tabler/icons-react'
import { type Dispatch, type ElementRef, type SetStateAction, forwardRef, useState } from 'react'
import { type ControllerRenderProps } from 'react-hook-form'

import { clsx } from 'clsx'

import { format } from 'date-fns'

import { Button } from '@/astaria/components/Button'
import { Calendar } from '@/astaria/components/Calendar'
import { FormControl, FormMessage } from '@/astaria/components/Form'
import { Popover, PopoverContent, PopoverTrigger } from '@/astaria/components/Popover'

type DatePickerButtonProps = { date: Date | undefined }

const DatePickerButton = forwardRef<ElementRef<typeof Button>, DatePickerButtonProps>(({ date, ...rest }, ref) => (
  <Button
    ref={ref}
    className={clsx('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
    emphasis="medium"
    {...rest}
  >
    <IconCalendar className="h-5 w-5" />
    {date ? format(date, 'PPP') : <span>Pick a date</span>}
  </Button>
))
DatePickerButton.displayName = 'DatePickerButton'

type DatePickerPopoverContentProps = {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>> | ControllerRenderProps['onChange']
}

const DatePickerPopoverContent = forwardRef<ElementRef<typeof PopoverContent>, DatePickerPopoverContentProps>(
  ({ date, setDate }, ref) => (
    <PopoverContent ref={ref} className="w-auto" noPadding>
      <Calendar initialFocus mode="single" onSelect={setDate} selected={date} />
    </PopoverContent>
  ),
)
DatePickerPopoverContent.displayName = 'DatePickerPopoverContent'

export const DatePicker = () => {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <DatePickerButton date={date} />
      </PopoverTrigger>
      <DatePickerPopoverContent date={date} setDate={setDate} />
    </Popover>
  )
}

export const DatePickerForm = ({
  field,
}: {
  field: {
    onChange: ControllerRenderProps['onChange']
    value: Date | undefined
  }
}) => (
  <>
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <DatePickerButton date={field.value} />
        </FormControl>
      </PopoverTrigger>
      <DatePickerPopoverContent date={field.value} setDate={field.onChange} />
    </Popover>
    <FormMessage />
  </>
)
