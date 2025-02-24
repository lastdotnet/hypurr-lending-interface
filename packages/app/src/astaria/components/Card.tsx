import { type HTMLAttributes, type ReactNode, forwardRef, useId } from 'react'

import { clsx } from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  higherEmphasis?: boolean
  receiptStyle?: boolean
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, higherEmphasis, receiptStyle, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'space-y-2 rounded shadow-sm',
        {
          'bg-stone-300': higherEmphasis,
          'border-2 bg-panel-bg p-2 backdrop-blur-sm': !receiptStyle,
        },
        className,
      )}
      {...rest}
    />
  ),
)
Card.displayName = 'Card'

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  inDialog?: boolean
}
export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(({ className, inDialog, ...rest }, ref) => (
  <div
    ref={ref}
    className={clsx(
      'rounded-sm border border-stone-300 bg-card p-3 text-card-foreground md:p-4',

      className,
    )}
    {...rest}
  />
))
CardSection.displayName = 'CardSection'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={clsx('flex flex-col space-y-1.5 p-6', className)} {...rest} />
))
CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ children, className, ...rest }, ref) => (
  <h3 ref={ref} className={clsx('font-semibold text-2xl leading-none tracking-tight', className)} {...rest}>
    {children}
  </h3>
))
CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...rest }, ref) => (
  <p ref={ref} className={clsx('text-muted-foreground text-sm', className)} {...rest} />
))
CardDescription.displayName = 'CardDescription'

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={clsx('p-6', className)} {...rest} />
))
CardContent.displayName = 'CardContent'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={clsx('flex items-center p-6 pt-0', className)} {...rest} />
))
CardFooter.displayName = 'CardFooter'

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {}
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={className} {...rest} />
))
CardActions.displayName = 'CardActions'

export interface CardLabelValueProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  orientation?: 'horizontal' | 'vertical'
  tooltip?: ReactNode
  value: ReactNode
}
export const CardLabelValue = forwardRef<HTMLDivElement, CardLabelValueProps>(
  ({ className, label, orientation = 'vertical', tooltip, value, ...rest }, ref) => {
    const id = useId()

    return (
      <div ref={ref} className={className} {...rest}>
        <label htmlFor={id}>{label}</label>
        {orientation === 'horizontal' ? ' ' : ''}
        <div className={clsx({ inline: orientation === 'horizontal' })} id={id}>
          {value}
        </div>
        {tooltip}
      </div>
    )
  },
)
CardLabelValue.displayName = 'CardLabelValue'
