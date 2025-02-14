import { Tooltip } from '@/astaria/components/Tooltip'

export const DetailsDisplayTooltip = ({
  className,
  content,
  id,
  noTooltip,
  suppressHydrationWarning,
  trigger,
  ...rest
}: {
  className?: string
  content: string | undefined
  id?: string
  noTooltip?: boolean
  suppressHydrationWarning?: boolean
  trigger: string
}) => {
  if (noTooltip || trigger === content) {
    return (
      <span className={className} id={id} suppressHydrationWarning={suppressHydrationWarning} {...rest}>
        {content}
      </span>
    )
  }

  return (
    <Tooltip
      className={className}
      content={content}
      id={id}
      trigger={<span suppressHydrationWarning={suppressHydrationWarning}>{trigger}</span>}
      triggerAsChild
      underline
      {...rest}
    />
  )
}
