import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { assets } from '@/ui/assets'
import { MoveUpIcon } from 'lucide-react'
import { WeeklyPoints } from '../../logic/useWeeklyPoints'
import { useCalculateWeeklyStats } from '../../logic/useCalculateWeeklyStats'

interface Props {
  weeklyPoints?: WeeklyPoints[]
  isLoading?: boolean
}

export function SummaryPanel({ weeklyPoints }: Props) {
  const { totalPoints, activeWeeks } = useCalculateWeeklyStats(weeklyPoints)

  return (
    <Panel.Wrapper className="flex flex-1 justify-between gap-2 px-9 py-11">
      <SummaryItem label="Total points">
        <Typography variant="h3" gradient className="flex items-center gap-1 font-semibold text-3xl">
          <Image src={assets.hypurrPaw} alt="Points" width={32} height={26} className="block w-8 pt-1" />
          {totalPoints}
        </Typography>
      </SummaryItem>

      <SummaryItem label="Ranking">
        <Typography variant="h3" className="flex items-center font-semibold text-3xl">
          <MoveUpIcon className="h-5 w-5 text-primary" />
          18
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
