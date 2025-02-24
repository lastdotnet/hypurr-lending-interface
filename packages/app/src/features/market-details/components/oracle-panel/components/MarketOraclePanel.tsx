import { MarketPriceOracleInfo } from '@/domain/oracles/types'
import { USD_MOCK_TOKEN } from '@/domain/types/Token'
import { Panel } from '@/ui/atoms/panel/Panel'
import { BlockExplorerAddressLink } from '@/ui/molecules/block-explorer-address-link/BlockExplorerAddressLink'
import { InfoTile } from '@/ui/molecules/info-tile/InfoTile'
import { testIds } from '@/ui/utils/testIds'
import { ProvidersList } from './ProvidersList'
import { Trans } from '@lingui/react/macro'

export function MarketOraclePanel({ providedBy, chainId, price, priceOracleAddress, token }: MarketPriceOracleInfo) {
  return (
    <Panel.Wrapper className="flex flex-col gap-4 p-4 sm:px-8 sm:py-6">
      <div>
        <div className="mb-1 text-sm text-white/50 leading-none sm:text-xs sm:leading-none">
          <Trans>Oracle type</Trans>
        </div>
        <Panel.Header className="flex items-center gap-2">
          <Panel.Title className="text-xl">
            <Trans>Market Price</Trans>{' '}
            {providedBy.length > 1 && <span className="font-medium text-white/30">(Redundant)</span>}
          </Panel.Title>
        </Panel.Header>
      </div>
      <Panel.Content className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
          <InfoTile>
            <InfoTile.Label>
              <Trans>Price</Trans>
            </InfoTile.Label>
            <InfoTile.Value data-testid={testIds.marketDetails.oraclePanel.price}>
              {USD_MOCK_TOKEN.formatUSD(price)}
            </InfoTile.Value>
          </InfoTile>
          <InfoTile>
            <InfoTile.Label>
              <Trans>Asset</Trans>
            </InfoTile.Label>
            <InfoTile.Value data-testid={testIds.marketDetails.oraclePanel.asset}>{token.symbol}</InfoTile.Value>
          </InfoTile>
          <InfoTile>
            <InfoTile.Label>
              <Trans>Contract</Trans>
            </InfoTile.Label>
            <InfoTile.Value className="w-full">
              <BlockExplorerAddressLink
                address={priceOracleAddress}
                chainId={chainId}
                data-testid={testIds.marketDetails.oraclePanel.oracleContract}
              />
            </InfoTile.Value>
          </InfoTile>
        </div>
        <ProvidersList providers={providedBy} />
      </Panel.Content>
    </Panel.Wrapper>
  )
}
