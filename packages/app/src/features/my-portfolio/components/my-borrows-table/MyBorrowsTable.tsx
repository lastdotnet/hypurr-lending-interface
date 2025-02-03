import { sortByAPY, sortByUsdValue } from '@/domain/common/sorters'
import { OpenDialogFunction } from '@/domain/state/dialogs'
import { repayDialogConfig } from '@/features/dialogs/repay/RepayDialog'
import { Button } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'
import { ApyTooltip } from '@/ui/molecules/apy-tooltip/ApyTooltip'
import { ActionsCell } from '@/ui/molecules/data-table/components/ActionsCell'
import { CompactValueCell } from '@/ui/molecules/data-table/components/CompactValueCell'
import { PercentageCell } from '@/ui/molecules/data-table/components/PercentageCell'
import { TokenWithLogo } from '@/ui/molecules/data-table/components/TokenWithLogo'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'
import { Borrow } from '../../logic/assets'

export interface MyBorrowsTableProps {
  assets: Borrow[]
  openDialog: OpenDialogFunction
}

export function MyBorrowsTable({ assets, openDialog }: MyBorrowsTableProps) {
  return (
    <Panel collapsibleOptions={{ collapsible: true, collapsibleAbove: 'md' }} className="bg-panel-bg md:px-3">
      <Panel.Header>
        <Panel.Title className="text-xl md:px-3" gradient>
          My borrows
        </Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <ResponsiveDataTable
          gridTemplateColumnsClassName="xl:grid-cols-[repeat(4,_1fr)] grid-cols-[repeat(3,_3fr)_8fr]"
          columnDefinition={{
            symbol: {
              header: 'Assets',
              renderCell: ({ token, reserveStatus }) => <TokenWithLogo token={token} reserveStatus={reserveStatus} />,
            },
            deposit: {
              header: 'Debt',
              sortable: true,
              sortingFn: (a, b) => sortByUsdValue(a.original, b.original, 'debt'),
              headerAlign: 'right',
              showOnMobile: true,
              renderCell: ({ token, debt }, mobileViewOptions) => (
                <CompactValueCell token={token} value={debt} mobileViewOptions={mobileViewOptions} hideEmpty />
              ),
            },
            apy: {
              header: <ApyTooltip variant="borrow">APY</ApyTooltip>,
              headerAlign: 'right',
              sortable: true,
              showOnMobile: true,
              sortingFn: (a, b) => sortByAPY(a.original.borrowAPY, b.original.borrowAPY),
              renderCell: ({ borrowAPY }, mobileViewOptions) => (
                <PercentageCell value={borrowAPY} mobileViewOptions={mobileViewOptions} />
              ),
            },
            actions: {
              header: '',
              renderCell: ({ token, debt }) => {
                return (
                  <ActionsCell>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full md:w-fit"
                      disabled={debt.isZero()}
                      onClick={() => {
                        openDialog(repayDialogConfig, { token })
                      }}
                    >
                      Repay
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
