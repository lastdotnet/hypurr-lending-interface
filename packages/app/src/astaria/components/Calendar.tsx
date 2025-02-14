import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { type ComponentProps } from 'react'
import { DayPicker } from 'react-day-picker'

import { clsx } from 'clsx'

import { differenceInCalendarDays } from 'date-fns'

import { buttonVariants } from '@/astaria/components/Button'

export type CalendarProps = ComponentProps<typeof DayPicker>

const isPastDate = (date: Date) => differenceInCalendarDays(date, new Date()) < 0

export const Calendar = ({ className, classNames, showOutsideDays = true, ...rest }: CalendarProps) => (
  <DayPicker
    className={clsx('p-3', className)}
    classNames={{
      caption: 'flex justify-center pt-1 relative items-center',
      caption_label: 'text-sm font-medium',
      cell: 'text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
      day: clsx(buttonVariants({ emphasis: 'low' }), 'h-11 w-11 p-0 font-normal aria-selected:opacity-100'),
      day_disabled: 'text-muted-foreground opacity-50',
      day_hidden: 'invisible',
      day_outside:
        'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
      day_range_end: 'day-range-end',
      day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
      day_selected:
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      day_today: 'bg-accent text-accent-foreground',
      head_cell: 'text-muted-foreground rounded-md w-11 font-normal text-[0.8rem]',
      head_row: 'flex',
      month: 'space-y-4',
      months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
      nav: 'space-x-1 flex items-center',
      nav_button: clsx(buttonVariants({ emphasis: 'low', size: 'icon' })),
      nav_button_next: 'absolute -right-0.5',
      nav_button_previous: 'absolute -left-0.5',
      row: 'flex w-full mt-2',
      table: 'w-full border-collapse space-y-1',
      ...classNames,
    }}
    components={{
      IconLeft: ({ className, ...rest }) => <IconArrowLeft className={clsx('h-5 w-5', className)} {...rest} />,
      IconRight: ({ className, ...rest }) => <IconArrowRight className={clsx('h-5 w-5', className)} {...rest} />,
    }}
    disabled={isPastDate}
    showOutsideDays={showOutsideDays}
    {...rest}
  />
)
Calendar.displayName = 'Calendar'
