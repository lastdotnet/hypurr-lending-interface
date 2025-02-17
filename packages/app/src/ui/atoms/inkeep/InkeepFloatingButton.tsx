'use client'

import { useInkeep } from '@/domain/hooks/useInkeep'
import { Button, buttonVariants } from '@/ui/atoms/button/Button'
import { cn } from '@/ui/utils/style'
import { MessagesSquareIcon } from 'lucide-react'

export function InkeepFloatingButton() {
  const { handleOpen } = useInkeep()
  return (
    <Button
      className={cn(buttonVariants({ variant: 'floating' }), 'fixed right-4 bottom-4 z-50 p-5')}
      onClick={handleOpen}
    >
      <MessagesSquareIcon className="h-4 w-4" />
      Ask AI
    </Button>
  )
}
