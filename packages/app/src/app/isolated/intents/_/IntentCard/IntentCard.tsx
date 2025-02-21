import { forwardRef } from 'react'

import { IntentAction } from '@/app/isolated/intents/_/IntentAction'
import { IntentDetails } from '@/app/isolated/intents/_/IntentDetails'
import { type IntentLocation } from '@/app/isolated/intents/_/constants'
import { AssetCard } from '@/astaria/components/AssetCard'
import { CardActions } from '@/astaria/components/Card'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'

export const IntentCard = forwardRef<
  HTMLDivElement,
  {
    className?: string
    intent?: BorrowIntent | LendIntent
    intentLocation: IntentLocation
    isArchived?: boolean
    skeleton?: boolean
  }
>(({ className, intent, intentLocation, isArchived, skeleton, ...rest }, ref) => (
  <AssetCard ref={ref} className={className} data-id={intent?.id} data-shortid={intent?.shortId} {...rest}>
    <IntentDetails intent={intent} isArchived={isArchived} skeleton={skeleton} />
    {!isArchived ? (
      <CardActions>
        <IntentAction intent={intent} intentLocation={intentLocation} skeleton={skeleton} />
      </CardActions>
    ) : null}
  </AssetCard>
))
IntentCard.displayName = 'IntentCard'
