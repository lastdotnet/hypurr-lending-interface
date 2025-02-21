import { IconDotsVertical } from '@tabler/icons-react'

import { IntentShareButton } from '@/app/isolated/intents/_/IntentCard/IntentShareButton'
import { WarpcastShareButton } from '@/app/isolated/intents/_/IntentCard/WarpcastShareButton'
import { XShareButton } from '@/app/isolated/intents/_/IntentCard/XShareButton'
import { IntentViewOnExplorer } from '@/app/isolated/intents/_/IntentViewOnExplorer'
import { Button } from '@/astaria/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/astaria/components/DropdownMenu'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'

export const IntentMenu = ({
  intent,
}: {
  intent: BorrowIntent | LendIntent | undefined
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button emphasis="low" size="icon">
        <IconDotsVertical />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        <IntentViewOnExplorer asset={intent?.collateral} chainId={intent?.chainId} />
      </DropdownMenuItem>
      <DropdownMenuItem>
        <IntentViewOnExplorer asset={intent?.borrow} chainId={intent?.chainId} />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Share</DropdownMenuLabel>
      <DropdownMenuItem className="flex gap-2">
        <XShareButton intent={intent} />
        <WarpcastShareButton intent={intent} />
        <IntentShareButton intent={intent} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
