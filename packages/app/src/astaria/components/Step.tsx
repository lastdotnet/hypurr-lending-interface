import { IconCheck, IconClock, IconLoader2 } from '@tabler/icons-react'
import { type HTMLAttributes, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

import { Tooltip } from '@/astaria/components/Tooltip'

export const stepVariants = cva('flex h-9 w-9 items-center justify-center rounded-full font-bold', {
  defaultVariants: {
    emphasis: 'medium',
  },
  variants: {
    emphasis: {
      high: 'bg-primary text-primary-foreground',
      medium: 'border-2 bg-background text-primary',
    },
  },
})

interface StepWrapperProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof stepVariants> {}
const StepWrapper = forwardRef<HTMLDivElement, StepWrapperProps>(({ children, className, emphasis, ...rest }, ref) => (
  <div ref={ref} className={clsx(stepVariants({ className, emphasis }))} {...rest}>
    {children}
  </div>
))
StepWrapper.displayName = 'StepWrapper'

export const Step = ({
  className,
  index,
  isActive,
  isConfirming,
  isFinished,
  isLoading,
}: {
  className?: string
  index: number
  isActive?: boolean
  isConfirming?: boolean | undefined
  isFinished?: boolean | undefined
  isLoading?: boolean | undefined
}) => {
  if (isFinished) {
    return (
      <Tooltip
        content="Complete"
        trigger={
          <StepWrapper emphasis={isActive || isFinished ? 'high' : undefined}>
            <IconCheck className={className} />
          </StepWrapper>
        }
        triggerAsChild
      />
    )
  }
  if (isConfirming) {
    return (
      <Tooltip
        content="Confirming"
        trigger={
          <StepWrapper emphasis={isActive ? 'high' : undefined}>
            <IconClock className={clsx('animate-spin', className)} />
          </StepWrapper>
        }
        triggerAsChild
      />
    )
  }
  if (isLoading) {
    return (
      <Tooltip
        content="Loading"
        trigger={
          <StepWrapper emphasis={isActive ? 'high' : undefined}>
            <IconLoader2 className={clsx('animate-spin', className)} />
          </StepWrapper>
        }
        triggerAsChild
      />
    )
  }

  return (
    <Tooltip
      content="Incomplete"
      trigger={<StepWrapper emphasis={isActive ? 'high' : undefined}>{index + 1}</StepWrapper>}
      triggerAsChild
    />
  )
}
