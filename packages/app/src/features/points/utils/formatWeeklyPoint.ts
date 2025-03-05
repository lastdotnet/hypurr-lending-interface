import { WeeklyPoints } from '../logic/useWeeklyPoints'

export const formatWeeklyPoint = (week: WeeklyPoints): string => {
  const startStr = week.startDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const endStr = week.endDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return `${startStr} - ${endStr}`
}
