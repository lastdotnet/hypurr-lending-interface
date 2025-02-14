import Image from 'next/image'
import { forwardRef } from 'react'

import WarpcastLogo from '@assets/images/warpcast.svg?url'
import { Button, type ButtonProps } from '@/astaria/components/Button'
import { BASE_URL } from '@/astaria/config/config'
import { ROUTES } from '@/astaria/constants/routes'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getShareMessage } from '@/astaria/utils/getShareMessage'

export const WarpcastShareButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'children'> & {
    intent: BorrowIntent | LendIntent | undefined
    skeleton?: boolean
  }
>(({ intent, skeleton, ...rest }, ref) => (
  <Button ref={ref} asChild={!skeleton} disabled={skeleton} emphasis="low" size="icon" {...rest}>
    {skeleton ? (
      <Image alt="Warpcast logo" className="w-8" src={WarpcastLogo} />
    ) : (
      <a
        href={
          intent
            ? `https://warpcast.com/~/compose?text=${encodeURIComponent(getShareMessage({ randomNumber: intent.randomNumber }))}%20${BASE_URL}/${ROUTES.INTENT(intent?.shortId)}`
            : ''
        }
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image alt="Warpcast logo" className="w-8" src={WarpcastLogo} />
      </a>
    )}
  </Button>
))
WarpcastShareButton.displayName = 'WarpcastShareButton'
