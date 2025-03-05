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
            showOnMobile: true,
            renderCell: (weeklyPoint) => {
              const { short, long } = formatWeeklyPoint(weeklyPoint)

              return (
                <div>
                  <div className="flex w-full flex-row justify-start text-sm md:pl-3">
                    <span className="hidden md:block">{short}</span>
                    <span className="block md:hidden">{long}</span>
                  </div>
                </div>
              )
            },
          },
          points: {
            header: 'Points',
            headerAlign: 'center',
            showOnMobile: true,
            renderCell: ({ points }) => (
              <div>
                <div className="flex w-full flex-row justify-center text-sm">{points}</div>
              </div>
            ),
          },
          referral: {
            header: <ReferralPointsTooltip>Referral Points</ReferralPointsTooltip>,
            headerAlign: 'right',
            showOnMobile: true,
            renderCell: ({ referralPoints }) => (
              <div>
                <div className="flex w-full flex-row justify-end text-sm md:pr-3">{referralPoints || 0}</div>
              </div>
            ),
          },
        }}
        data={weeklyPoints || []}
      />
    </Panel.Wrapper>
  )
}
