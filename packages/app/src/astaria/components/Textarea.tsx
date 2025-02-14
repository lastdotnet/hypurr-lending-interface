import { type TextareaHTMLAttributes, forwardRef } from 'react'

import { clsx } from 'clsx'

import { inputVariants } from '@/astaria/components/Input'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isError?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, isError, ...rest }, ref) => (
  <textarea ref={ref} className={clsx(inputVariants({ isError }), 'min-h-[80px]', className)} {...rest} />
))
Textarea.displayName = 'Textarea'

export { Textarea }
