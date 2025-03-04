import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'

export function SummaryPanel() {
  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-start gap-2 px-9 py-11">
      <span className="font-medium text-white/50 text-xs">Total Points</span>
      <Typography variant="h3" gradient>
        13,109
      </Typography>
    </Panel.Wrapper>
  )
}
