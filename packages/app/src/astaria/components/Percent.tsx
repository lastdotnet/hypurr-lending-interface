import { DetailsDisplayTooltip } from '@/astaria/components/DetailsDisplayTooltip'
import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { formatPercent } from '@/astaria/utils/formatPercent'

export const Percent = ({
  className,
  conciseDisplay,
  decimals,
  id,
  noTooltip,
  percent,
  skeleton,
  standardDecimals,
  suppressHydrationWarning,
  useDashForZero,
  ...rest
}: {
  className?: string
  conciseDisplay?: boolean
  decimals: number | undefined
  id?: string
  noTooltip?: boolean
  percent: bigint | number | undefined
  skeleton?: boolean
  standardDecimals?: boolean
  suppressHydrationWarning?: boolean
  useDashForZero?: boolean
}) => {
  if (skeleton) {
    return (
      <>
        <SkeletonNumber suppressHydrationWarning={suppressHydrationWarning} {...rest} />%
      </>
    )
  }
  if (percent === undefined) {
    return null
  }

  const { content, trigger } = formatPercent({
    conciseDisplay,
    decimals,
    percent,
    standardDecimals,
    useDashForZero,
  })

  if (noTooltip) {
    return (
      <span className={className} id={id} suppressHydrationWarning={suppressHydrationWarning} {...rest}>
        {trigger}
      </span>
    )
  }

  return (
    <DetailsDisplayTooltip
      className={className}
      content={content}
      id={id}
      suppressHydrationWarning={suppressHydrationWarning}
      trigger={trigger}
      {...rest}
    />
  )
}
