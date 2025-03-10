import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { assets } from '@/ui/assets'
import { WeeklyPoints } from '../../logic/useWeeklyPoints'
import { useCalculateWeeklyStats } from '../../logic/useCalculateWeeklyStats'
import { UserDetails } from '../../logic/useGetUserDetails'

interface Props {
  userDetails?: UserDetails
  weeklyPoints?: WeeklyPoints[]
  isLoading?: boolean
}

export function SummaryPanel({ weeklyPoints, userDetails }: Props) {
  const { activeWeeks } = useCalculateWeeklyStats(weeklyPoints)

  return (
    <Panel.Wrapper className="flex flex-1 justify-between gap-2 px-9 py-11">
      <SummaryItem label="Total points">
        <Typography variant="h3" gradient className="flex items-center gap-1 font-semibold text-3xl">
          <Image src={assets.hypurrPaw} alt="Points" width={32} height={26} className="block w-8 pt-1" />
          {userDetails?.points?.total_points || 0}
        </Typography>
      </SummaryItem>

      <SummaryItem label="Ranking">
        <Typography variant="h3" className="flex items-center font-semibold text-3xl">
          {userDetails?.ranking?.current_rank || '∞'}
        </Typography>
      </SummaryItem>

      <SummaryItem label="Weeks active">
        <Typography variant="h3" className="font-semibold text-3xl">
          {activeWeeks}
        </Typography>
      </SummaryItem>
    </Panel.Wrapper>
  )
}

function SummaryItem({ label, children }: { label: string } & PropsWithChildren) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="font-semibold text-white/50 text-xs">{label}</span>
      {children}
    </div>
  )
}
