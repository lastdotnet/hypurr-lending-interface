import { IconLink } from '@tabler/icons-react'
import { forwardRef } from 'react'

import { type ButtonProps } from '@/astaria/components/Button'
import { CopyToClipboardButton } from '@/astaria/components/CopyToClipboardButton'
import { BASE_URL } from '@/astaria/config/config'
import { ROUTES } from '@/astaria/constants/routes'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'

export const IntentShareButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'children'> & {
    intent: BorrowIntent | LendIntent | undefined
    skeleton?: boolean
  }
>(({ intent, skeleton, ...rest }, ref) => (
  <CopyToClipboardButton
    ref={ref}
    contentToCopy={`${BASE_URL}/${ROUTES.INTENT(intent?.shortId)}`}
    disabled={skeleton}
    emphasis="low"
    size="icon"
    {...rest}
  >
    <IconLink aria-label="link" />
  </CopyToClipboardButton>
))
IntentShareButton.displayName = 'IntentShareButton'
