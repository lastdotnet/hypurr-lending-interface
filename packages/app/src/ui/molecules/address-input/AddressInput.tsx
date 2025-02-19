import { X } from 'lucide-react'
import { forwardRef } from 'react'

import { Button } from '@/ui/atoms/button/Button'
import { type InputProps } from '@/ui/atoms/input/Input'
import { Typography } from '@/ui/atoms/typography/Typography'
import { cn } from '@/ui/utils/style'
import { testIds } from '@/ui/utils/testIds'

export type AddressInputProps = {
  className?: string | undefined
  onRemove?: () => void
  disabled?: boolean
  error?: string
  value: string
} & InputProps

export const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  ({ className, onRemove, disabled, error, value, onChange, ...rest }, ref) => {
    return (
      <div className="flex-1">
        <div
          className={cn(
            'flex h-14 min-w-[10rem] flex-row rounded-sm border bg-input-background py-2 pr-2 pl-4',
            disabled && 'opacity-70',
            error && 'mb-1 border-error bg-error/10',
            className,
          )}
        >
          <div className="flex grow flex-col justify-center">
            <input
              type="text"
              inputMode="text"
              className={cn('flex bg-transparent focus:outline-none', error && 'text-error')}
              ref={ref}
              placeholder="0x..."
              id="asset-input"
              disabled={disabled}
              size={1}
              value={value}
              data-testid={testIds.component.AssetInput.input}
              {...rest}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, '')

                e.target.value = e.target.value.toLowerCase()

                const value = e.target.value
                if (!value || ethAddressRegex.test(value)) {
                  onChange?.(e)
                }
              }}
            />
          </div>
          <div className="flex flex-row">
            {onRemove && (
              <Button
                onClick={disabled ? undefined : onRemove}
                className={cn('p-1 text-icon-foreground')}
                variant="text"
              >
                <X />
              </Button>
            )}
          </div>
        </div>
        {error && (
          <Typography data-testid={testIds.component.AssetInput.error} variant="prompt" className="text-error">
            {error}
          </Typography>
        )}
      </div>
    )
  },
)

AddressInput.displayName = 'AddressInput'

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
