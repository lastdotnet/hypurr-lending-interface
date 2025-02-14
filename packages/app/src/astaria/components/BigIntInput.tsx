import { forwardRef } from 'react'

import { formatUnits, parseUnits } from 'viem'

import { ETHER_DECIMALS } from 'common'

import { NumberInput, type NumberInputProps } from '@/astaria/components/NumberInput'
import { JS_MAX_SAFE_DECIMALS_STEP } from '@/astaria/constants/constants'

export type BigIntInputProps = Omit<NumberInputProps, 'value' | 'min' | 'max' | 'onChange'> & {
  decimals?: number
  max?: bigint
  min?: bigint
  onChange?: (value: bigint | undefined) => void
  value: bigint | undefined
}

export const BigIntInput = forwardRef<HTMLInputElement, BigIntInputProps>(
  (
    {
      allowNegative = false,
      decimals = ETHER_DECIMALS,
      max,
      min,
      onChange,
      step = JS_MAX_SAFE_DECIMALS_STEP,
      value,
      ...rest
    },
    ref,
  ) => {
    const getValue = () => {
      if (value === undefined) {
        return ''
      }
      return formatUnits(value, decimals)
    }

    return (
      <NumberInput
        ref={ref}
        allowNegative={allowNegative}
        decimals={decimals}
        max={max?.toString()}
        min={min?.toString()}
        onChange={(value) => {
          if (value === undefined || value === '') {
            return onChange?.(undefined)
          }
          return onChange?.(parseUnits(value.toString(), decimals))
        }}
        step={step}
        valueAsNumericString={getValue()}
        {...rest}
      />
    )
  },
)
BigIntInput.displayName = 'BigIntInput'
