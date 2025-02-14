import { CurrentBorrowAPY } from '@/astaria/components/CurrentBorrowAPY'
import { Percent } from '@/astaria/components/Percent'
import { Tooltip } from '@/astaria/components/Tooltip'
import { type BorrowIntent } from '@/astaria/types-internal/intent-schemas'

export const CurrentBorrowAPYWithMaxTooltip = ({
  borrowIntent,
  className,
  standardDecimals,
  ...rest
}: {
  borrowIntent: BorrowIntent
  className?: string
  standardDecimals?: boolean
}) => (
  <Tooltip
    {...rest}
    className={className}
    content={
      <>
        Max APY:{' '}
        <Percent decimals={borrowIntent.borrow.decimals} percent={borrowIntent.endRate} suppressHydrationWarning />
      </>
    }
    trigger={<CurrentBorrowAPY borrowIntent={borrowIntent} standardDecimals={standardDecimals} />}
    underline
  />
)
