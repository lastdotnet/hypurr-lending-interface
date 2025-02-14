import { DetailsDisplayTooltip } from '@/astaria/components/DetailsDisplayTooltip'
import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'

export const CurrencyAmount = ({
  amount,
  className,
  decimals,
  highPrecision,
  id,
  noTooltip,
  skeleton,
  suppressHydrationWarning,
  usdValue,
}: {
  amount: bigint | number | undefined
  className?: string
  decimals: number | undefined
  highPrecision?: boolean
  id?: string
  noTooltip?: boolean
  skeleton?: boolean
  suppressHydrationWarning?: boolean
  usdValue: number | null | undefined
}) => {
  if (skeleton) {
    return <SkeletonNumber suppressHydrationWarning={suppressHydrationWarning} />
  }
  if (amount === undefined) {
    return null
  }

  const { content, trigger } = formatCurrency({
    amount,
    decimals,
    highPrecision,
    usdValue,
  })

  return (
    <DetailsDisplayTooltip
      className={className}
      content={content}
      id={id}
      noTooltip={noTooltip}
      suppressHydrationWarning={suppressHydrationWarning}
      trigger={trigger}
    />
  )
}
