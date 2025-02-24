import { paths } from '@/config/paths'
import { formatPercentage } from '@/domain/common/format'
import { eModeCategoryIdToTranslation } from '@/domain/e-mode/constants'
import { EModeCategoryId } from '@/domain/e-mode/types'
import { Percentage } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { assets } from '@/ui/assets'
import { DocsLink } from '@/ui/atoms/docs-link/DocsLink'
import { Panel } from '@/ui/atoms/panel/Panel'
import { links } from '@/ui/constants/links'
import { EModeBadge } from '@/ui/molecules/e-mode-badge/EModeBadge'
import { cn } from '@/ui/utils/style'

import { InfoTile } from '@/ui/molecules/info-tile/InfoTile'
import { Header } from './components/Header'
import { InfoTilesGrid } from './components/InfoTilesGrid'
import { StatusPanelGrid } from './components/StatusPanelGrid'
import { StatusIcon } from './components/status-icon/StatusIcon'
import { TokenBadge } from './components/token-badge/TokenBadge'
import { Trans } from '@lingui/react/macro'
import { useLingui } from '@lingui/react'

export interface EModeStatusPanelProps {
  maxLtv: Percentage
  liquidationThreshold: Percentage
  liquidationPenalty: Percentage
  categoryId: EModeCategoryId
  eModeCategoryTokens: TokenSymbol[]
  token?: Token
}

export function EModeStatusPanel({
  maxLtv,
  liquidationThreshold,
  liquidationPenalty,
  categoryId,
  eModeCategoryTokens,
  token,
}: EModeStatusPanelProps) {
  const { _ } = useLingui()
  const categoryName = _(eModeCategoryIdToTranslation[categoryId])

  return (
    <Panel.Wrapper>
      <StatusPanelGrid>
        <StatusIcon status="yes" />
        <Header status="yes" variant="e-mode" />
        {token && <TokenBadge symbol={token.symbol} />}
        <InfoTilesGrid>
          <InfoTile>
            <InfoTile.Label>
              <Trans>Max LTV</Trans>
            </InfoTile.Label>
            <InfoTile.Value>
              <WithArrow>{formatPercentage(maxLtv)}</WithArrow>
            </InfoTile.Value>
          </InfoTile>
          <InfoTile>
            <InfoTile.Label>
              <Trans>Liquidation threshold</Trans>
            </InfoTile.Label>
            <InfoTile.Value>
              <WithArrow>{formatPercentage(liquidationThreshold)}</WithArrow>
            </InfoTile.Value>
          </InfoTile>
          <InfoTile>
            <InfoTile.Label>
              <Trans>Liquidation penalty</Trans>
            </InfoTile.Label>
            <InfoTile.Value>
              <WithArrow reverseArrow>{formatPercentage(liquidationPenalty)}</WithArrow>
            </InfoTile.Value>
          </InfoTile>
          <InfoTile>
            <InfoTile.Label>
              <Trans>Category</Trans>
            </InfoTile.Label>
            <InfoTile.Value>
              <EModeBadge categoryId={categoryId} />
            </InfoTile.Value>
          </InfoTile>
          <p className="col-span-1 text-white/50 text-xs sm:col-span-3">
            <Trans>
              E-Mode for {categoryName} assets increases your LTV within the {categoryName} category. This means that
              when E-Mode is enabled, you will have higher borrowing power for assets in this category
            </Trans>
            : {eModeCategoryTokens.join(', ')}.
            <Trans>
              You can enter E-Mode from your <DocsLink href={paths.dashboard}>Dashboard</DocsLink>. To learn more about
              E-Mode and its applied restrictions, visit the{' '}
              <DocsLink href={links.aaveTechnicalPaper} external>
                Aave V3 Technical Paper
              </DocsLink>
              .
            </Trans>
          </p>
        </InfoTilesGrid>
      </StatusPanelGrid>
    </Panel.Wrapper>
  )
}

interface WithArrowProps {
  children: React.ReactNode
  reverseArrow?: boolean
}
function WithArrow({ children, reverseArrow }: WithArrowProps) {
  return (
    <div className="flex min-w-[72px] flex-row justify-between gap-1 sm:min-w-fit">
      <img src={assets.greenArrowUp} className={cn('h-4 w-4', reverseArrow && 'rotate-180')} />
      {children}
    </div>
  )
}
