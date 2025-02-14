import { forwardRef } from 'react'

import { Button } from '@/astaria/components/Button'
import { FormControl } from '@/astaria/components/Form'
import { NumberInput, type NumberInputProps } from '@/astaria/components/NumberInput'
import { JS_MAX_SAFE_DECIMALS_STEP } from '@/astaria/constants/constants'

export type CurrencyInputProps = NumberInputProps

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ emphasis, step = JS_MAX_SAFE_DECIMALS_STEP, ...rest }, ref) => (
    <NumberInput ref={ref} emphasis={emphasis} step={step} {...rest} />
  ),
)
CurrencyInput.displayName = 'CurrencyInput'

export const CurrencyInputControl = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ emphasis = 'medium', max, onChange, ...rest }, ref) => (
    <div className="flex">
      <FormControl>
        <CurrencyInput ref={ref} emphasis={emphasis} max={max} onChange={onChange} {...rest} />
      </FormControl>
      {max ? (
        <Button className="-ml-px" emphasis={emphasis} onClick={() => onChange?.(max)} size="md">
          Max
        </Button>
      ) : null}
    </div>
  ),
)
CurrencyInputControl.displayName = 'CurrencyInputControl'
