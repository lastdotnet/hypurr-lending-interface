import { Panel } from '@/ui/atoms/panel/Panel'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'
import { ReferralPointsTooltip } from './ReferralPointsTooltip'
import { WeeklyPoints } from '../../logic/useWeeklyPoints'
import { formatWeeklyPoint } from '../../utils/formatWeeklyPoint'

interface Props {
  weeklyPoints?: WeeklyPoints[]
}

export function WeeklyTable({ weeklyPoints }: Props) {
  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-start gap-2 px-6 py-4">
      <ResponsiveDataTable
        gridTemplateColumnsClassName="grid-cols-[2fr_1fr_1fr]"
        columnDefinition={{
          week: {
            header: 'Week',
            headerAlign: 'left',
            renderCell: (weeklyPoint) => (
              <div>
                <div className="flex w-full flex-row justify-start pl-3 text-sm">{formatWeeklyPoint(weeklyPoint)}</div>
              </div>
            ),
          },
          points: {
            header: 'Points',
            headerAlign: 'center',
            renderCell: ({ points }) => (
              <div>
                <div className="flex w-full flex-row justify-center text-sm">{points}</div>
              </div>
            ),
          },
          referral: {
            header: <ReferralPointsTooltip>Referral Points</ReferralPointsTooltip>,
            headerAlign: 'right',
            renderCell: ({ referralPoints }) => (
              <div>
                <div className="flex w-full flex-row justify-end pr-3 text-sm">{referralPoints || 0}</div>
              </div>
            ),
          },
        }}
        data={weeklyPoints || []}
      />
    </Panel.Wrapper>
  )
}
