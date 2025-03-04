import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'

export function WeeklyTable() {
  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-start gap-2 px-9 py-11">
      <Typography variant="h3" gradient>
        Weekly
      </Typography>
    </Panel.Wrapper>
  )
}
