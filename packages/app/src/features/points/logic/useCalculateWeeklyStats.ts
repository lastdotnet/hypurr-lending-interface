import { WeeklyPoints } from './useWeeklyPoints'

export function useCalculateWeeklyStats(weeklyPoints?: WeeklyPoints[]): { totalPoints: number; activeWeeks: number } {
  const totalPoints = weeklyPoints?.reduce((sum, week) => sum + week.points, 0)
  const activeWeeks = weeklyPoints?.filter((week) => week.points > 0).length

  return {
    totalPoints: totalPoints || 0,
    activeWeeks: activeWeeks || 0,
  }
}
