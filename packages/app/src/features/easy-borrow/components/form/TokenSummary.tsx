import { USD_MOCK_TOKEN } from '@/domain/types/Token'
import { getTokenImage } from '@/ui/assets'
import { Typography } from '@/ui/atoms/typography/Typography'
import { IconStack } from '@/ui/molecules/icon-stack/IconStack'
import { msg } from '@lingui/core/macro'

import { ExistingPosition } from '../../logic/types'
import { useLingui } from '@lingui/react'

export interface TokenSummaryProps {
  position: ExistingPosition
  type: 'borrow' | 'deposit'
  maxSymbols?: number
}

export function TokenSummary({ position, type, maxSymbols = 3 }: TokenSummaryProps) {
  const { _ } = useLingui()
  const summary = type === 'borrow' ? msg`Already borrowed` : msg`Already deposited`
  const amount = `~${USD_MOCK_TOKEN.formatUSD(position.totalValueUSD)}`

  const tokenIconPaths = position.tokens.map((token) => getTokenImage(token.symbol))

  return (
    <div className="flex items-center rounded-xl bg-white/4 p-4">
      <IconStack paths={tokenIconPaths} maxIcons={maxSymbols} />
      <Typography className="ml-3 font-semibold text-secondary tracking-wide" variant="prompt">
        {_(summary)} {amount}
      </Typography>
    </div>
  )
}
