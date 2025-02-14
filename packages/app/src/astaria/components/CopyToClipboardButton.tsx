import { forwardRef } from 'react'

import { Button, type ButtonProps } from '@/astaria/components/Button'
import { useToast } from '@/astaria/components/Toast/useToast'

export const CopyToClipboardButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    contentToCopy: string
  }
>(({ children, contentToCopy, ...rest }, ref) => {
  const { toast } = useToast()
  return (
    <Button
      ref={ref}
      onClick={() => {
        toast({
          description: 'Copied to clipboard',
        })
        navigator.clipboard.writeText(contentToCopy)
      }}
      {...rest}
    >
      {children}
    </Button>
  )
})
CopyToClipboardButton.displayName = 'CopyToClipboardButton'
