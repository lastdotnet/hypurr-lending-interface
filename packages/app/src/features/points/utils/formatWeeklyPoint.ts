import { WeeklyPoints } from '../logic/useWeeklyPoints'

export function formatWeeklyPoint(week: WeeklyPoints): { short: string; long: string } {
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

  const startStrMobile = week.startDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  })
  const endStrMobile = week.endDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  })

  return {
    short: `${startStr} - ${endStr}`,
    long: `${startStrMobile} - ${endStrMobile}`,
  }
}
