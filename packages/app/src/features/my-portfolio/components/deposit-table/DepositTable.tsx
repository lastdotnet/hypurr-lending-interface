import { sortByAPY, sortByUsdValue } from '@/domain/common/sorters'
import { OpenDialogFunction } from '@/domain/state/dialogs'
import { depositDialogConfig } from '@/features/dialogs/deposit/DepositDialog'
import { Button } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'
import { ApyTooltip } from '@/ui/molecules/apy-tooltip/ApyTooltip'
import { ActionsCell } from '@/ui/molecules/data-table/components/ActionsCell'
import { CompactValueCell } from '@/ui/molecules/data-table/components/CompactValueCell'
import { PercentageCell } from '@/ui/molecules/data-table/components/PercentageCell'
import { TokenWithLogo } from '@/ui/molecules/data-table/components/TokenWithLogo'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'
import { Deposit } from '../../logic/assets'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { CheckmarkCell } from '@/ui/molecules/data-table/components/CheckmarkCell'
import { Trans } from '@lingui/react/macro'
export interface DepositTableProps {
  assets: Deposit[]
  openDialog: OpenDialogFunction
}

export function DepositTable({ assets, openDialog }: DepositTableProps) {
  return (
    <Panel collapsibleOptions={{ collapsible: true, collapsibleAbove: 'md' }} className="bg-panel-bg md:px-3">
      <Panel.Header>
        <Panel.Title className="text-xl md:px-3" gradient>
          <Trans>Available to deposit</Trans>
        </Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <ResponsiveDataTable
          gridTemplateColumnsClassName="grid-cols-[repeat(4,_3fr)_2fr_3fr]"
          columnDefinition={{
            symbol: {
              header: <Trans>Assets</Trans>,
              renderCell: ({ token, reserveStatus, isCombinedBalance }) => (
                <TokenWithLogo token={token} reserveStatus={reserveStatus} isCombinedBalance={isCombinedBalance} />
              ),
            },
            inWallet: {
              header: <Trans>In Wallet</Trans>,
              sortable: true,
              sortingFn: (a, b) => sortByUsdValue(a.original, b.original, 'balance'),
              headerAlign: 'right',
              renderCell: ({ token, balance }, mobileViewOptions) => (
                <CompactValueCell token={token} value={balance} mobileViewOptions={mobileViewOptions} hideEmpty />
              ),
            },
            deposit: {
              header: <Trans>Deposit</Trans>,
              sortable: true,
              sortingFn: (a, b) => sortByUsdValue(a.original, b.original, 'deposit'),
              headerAlign: 'right',
              showOnMobile: true,
              renderCell: ({ token, deposit }, mobileViewOptions) => (
                <CompactValueCell token={token} value={deposit} mobileViewOptions={mobileViewOptions} hideEmpty />
              ),
            },
            apy: {
              header: (
                <ApyTooltip variant="supply">
                  <Trans>APY</Trans>
                </ApyTooltip>
              ),
              headerAlign: 'right',
              sortable: true,
              showOnMobile: true,
              sortingFn: (a, b) => sortByAPY(a.original.supplyAPY, b.original.supplyAPY),
              renderCell: ({ supplyAPY }, mobileViewOptions) => (
                <PercentageCell value={supplyAPY} mobileViewOptions={mobileViewOptions} />
              ),
            },
            collateral: {
              header: <Trans>Can be collateral</Trans>,
              headerAlign: 'right',
              renderCell: ({ usageAsCollateralEnabled }) => (
                <CheckmarkCell usageAsCollateralEnabled={usageAsCollateralEnabled} />
              ),
            },
            actions: {
              header: '',
              renderCell: ({ token, reserveStatus }) => {
                return (
                  <ActionsCell>
                    <Button
                      size="sm"
                      className="w-full md:w-fit"
                      onClick={() => {
                        openDialog(depositDialogConfig, { token })
                      }}
                      disabled={reserveStatus === 'frozen' || token.symbol === TokenSymbol('USDXL')}
                    >
                      <Trans>Deposit</Trans>
                    </Button>
                  </ActionsCell>
                )
              },
            },
          }}
          data={assets}
        />
      </Panel.Content>
    </Panel>
  )
}
