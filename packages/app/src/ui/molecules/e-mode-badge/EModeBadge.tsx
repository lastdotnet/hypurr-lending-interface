import { cva } from 'class-variance-authority'

import { eModeCategoryIdToTranslation } from '@/domain/e-mode/constants'
import { EModeCategoryId } from '@/domain/e-mode/types'
import Flash from '@/ui/assets/flash.svg'
import { cn } from '@/ui/utils/style'
import { useLingui } from '@lingui/react'
import { msg } from '@lingui/core/macro'
export interface EModeBadgeProps {
  categoryId: EModeCategoryId
}

export function EModeBadge({ categoryId }: EModeBadgeProps) {
  const { _ } = useLingui()

  const text = categoryId === 0 ? msg`off` : eModeCategoryIdToTranslation[categoryId]
  const state = categoryId === 0 ? 'off' : 'on'

  return (
    <div className={cn(variants({ state }))}>
      {categoryId !== 0 && <Flash className="h-3.5 w-3.5" />}
      {_(text)}
    </div>
  )
}

const variants = cva(
  'flex w-fit flex-row items-center gap-1.5 rounded-sm border px-1 py-0.5 font-semibold text-xs uppercase',
  {
    variants: {
      state: {
        on: 'border-secondary bg-spark/10 text-secondary',
        off: 'border-white/10 bg-white/10 text-white/50',
      },
    },
  },
)
