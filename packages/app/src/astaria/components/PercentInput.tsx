import { forwardRef } from 'react'

import { NumberInput, type NumberInputProps } from '@/astaria/components/NumberInput'

export const PercentInput = forwardRef<HTMLInputElement, NumberInputProps>(({ ...rest }, ref) => (
  <NumberInput ref={ref} decimalScale={2} suffix="%" {...rest} />
))
PercentInput.displayName = 'PercentInput'
