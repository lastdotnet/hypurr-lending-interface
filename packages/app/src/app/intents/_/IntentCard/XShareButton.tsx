import { IconBrandX } from '@tabler/icons-react'
import { forwardRef } from 'react'

import { Button, type ButtonProps } from '@/astaria/components/Button'
import { BASE_URL } from '@/astaria/config/config'
import { ROUTES } from '@/astaria/constants/routes'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getShareMessage } from '@/astaria/utils/getShareMessage'

export const XShareButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'children'> & {
    intent: BorrowIntent | LendIntent | undefined
    skeleton?: boolean
  }
>(({ intent, skeleton, ...rest }, ref) => (
  <Button ref={ref} asChild={!skeleton} disabled={skeleton} emphasis="low" size="icon" {...rest}>
    {skeleton ? (
      <IconBrandX aria-label="X" />
    ) : (
      <a
        href={
          intent
            ? `https://x.com/intent/tweet?text=${encodeURIComponent(getShareMessage({ randomNumber: intent.randomNumber }))}%20${BASE_URL}/${ROUTES.INTENT(intent?.shortId)}`
            : ''
        }
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconBrandX aria-label="X" />
      </a>
    )}
  </Button>
))
XShareButton.displayName = 'XShareButton'
