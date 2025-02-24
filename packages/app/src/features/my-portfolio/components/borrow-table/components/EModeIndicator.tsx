import { EModeCategoryId } from '@/domain/e-mode/types'
import { Info } from '@/ui/molecules/info/Info'

import { EModeButton } from './EModeButton'
import { Trans } from '@lingui/react/macro'

interface EModeIndicatorProps {
  eModeCategoryId: EModeCategoryId
  onButtonClick: () => void
}

export function EModeIndicator({ eModeCategoryId, onButtonClick }: EModeIndicatorProps) {
  return (
    <div className="mt-1.5 ml-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-row items-center gap-0.5">
        <p className="text-white/50 text-xs">
          <Trans>E-Mode</Trans>
        </p>
        <Info>
          <Trans>Efficiency mode (E-Mode) increases your LTV for a selected category of assets up to 97%.</Trans>
        </Info>
      </div>
      <EModeButton categoryId={eModeCategoryId} onClick={onButtonClick} />
    </div>
  )
}
