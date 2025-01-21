import { InputProps } from '@/ui/atoms/input/Input'
import { cn } from '@/ui/utils/style'
import { forwardRef } from 'react'

export type ReferralInputProps = {
  className?: string | undefined
  disabled?: boolean
  error?: string
  value: string
} & InputProps

export const ReferralInput = forwardRef<HTMLInputElement, ReferralInputProps>(
  ({ className, disabled, error, ...rest }, ref) => {
    return (
      <div className="w-full">
        <div
          className={cn(
            'flex h-10 flex-row items-center rounded-full border bg-input-background py-2 pr-2 pl-5',
            disabled && 'opacity-70',
            error && 'mb-1 border-error bg-error/10',
            className,
          )}
        >
          <div className="flex grow flex-col">
            <input
              type="text"
              inputMode="decimal"
              className={cn('flex bg-transparent focus:outline-none', error && 'text-error')}
              ref={ref}
              id="referral-input"
              disabled={disabled}
              size={1}
              {...rest}
            />
          </div>
        </div>
        {error && <p className="text-error">{error}</p>}
      </div>
    )
  },
)
