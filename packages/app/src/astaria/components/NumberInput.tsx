import { forwardRef } from 'react'
import { type ControllerRenderProps } from 'react-hook-form'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'

import { ETHER_DECIMALS } from 'common'

import { Input, type InputProps } from '@/astaria/components/Input'
import { getDecimalAndThousandSeparators } from '@/astaria/utils/getDecimalAndThousandSeparators'

export type NumberInputProps = Partial<Omit<ControllerRenderProps, 'value' | 'ref' | 'onChange'>> &
  Omit<NumericFormatProps<InputProps>, 'onChange'> & {
    decimals?: number
    defaultValue?: number | string
    onChange?: (value: number | string | undefined) => void
    value?: number | undefined
    valueAsNumericString?: string
  }

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      allowLeadingZeros = false,
      allowNegative = false,
      decimals = ETHER_DECIMALS,
      defaultValue,
      emphasis,
      max,
      min = 0,
      onBlur,
      onChange,
      step = 1,
      value,
      valueAsNumericString,
      ...rest
    },
    ref,
  ) => {
    const { decimalSeparator, thousandSeparator } = getDecimalAndThousandSeparators()

    return (
      <NumericFormat
        allowLeadingZeros={allowLeadingZeros}
        allowNegative={allowNegative}
        customInput={Input}
        decimalScale={decimals}
        decimalSeparator={decimalSeparator}
        defaultValue={defaultValue}
        emphasis={emphasis}
        getInputRef={ref}
        inputMode="decimal"
        max={max}
        min={min}
        onBlur={(event) => {
          if (!max && !min) {
            if (onBlur) {
              return onBlur()
            }
            return
          }
          const value = Number(event.target.value)
          const maxNumber = max ? Number(max) : undefined
          const minNumber = min ? Number(min) : undefined

          if (maxNumber && value > maxNumber) {
            onChange?.(maxNumber)
          }
          if (minNumber && value < minNumber) {
            onChange?.(minNumber)
          }
          if (onBlur) {
            return onBlur()
          }
        }}
        onValueChange={(values) => {
          if (valueAsNumericString) {
            return onChange?.(values.value)
          }
          if (values.floatValue === undefined) {
            return onChange?.(undefined)
          }
          if ((values.value.startsWith('.0') || values.value.startsWith('0.0')) && !values.floatValue) {
            return
          }
          return onChange?.(values.floatValue)
        }}
        pattern="[0-9\.,]*"
        step={step}
        thousandSeparator={thousandSeparator}
        type="text"
        value={valueAsNumericString ? valueAsNumericString : value}
        valueIsNumericString={!!valueAsNumericString}
        {...rest}
      />
    )
  },
)
NumberInput.displayName = 'NumberInput'
