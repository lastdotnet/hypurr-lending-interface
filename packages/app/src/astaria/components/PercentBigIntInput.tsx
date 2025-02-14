import { forwardRef } from 'react'

import { BigIntInput, type BigIntInputProps } from '@/astaria/components/BigIntInput'

export const PercentBigIntInput = forwardRef<HTMLInputElement, BigIntInputProps>(({ ...rest }, ref) => (
  <BigIntInput ref={ref} decimalScale={2} suffix="%" {...rest} />
))
PercentBigIntInput.displayName = 'PercentBigIntInput'
