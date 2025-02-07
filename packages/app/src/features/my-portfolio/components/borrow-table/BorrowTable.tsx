import { sortByAPY, sortByUsdValue } from '@/domain/common/sorters'
import { EModeCategoryId } from '@/domain/e-mode/types'
import { OpenDialogFunction } from '@/domain/state/dialogs'
import { borrowDialogConfig } from '@/features/dialogs/borrow/BorrowDialog'
import { eModeDialogConfig } from '@/features/dialogs/e-mode/EModeDialog'
import { Button } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'
import { ApyTooltip } from '@/ui/molecules/apy-tooltip/ApyTooltip'
import { ActionsCell } from '@/ui/molecules/data-table/components/ActionsCell'
import { CompactValueCell } from '@/ui/molecules/data-table/components/CompactValueCell'
import { PercentageCell } from '@/ui/molecules/data-table/components/PercentageCell'
import { TokenWithLogo } from '@/ui/molecules/data-table/components/TokenWithLogo'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'
import { Borrow } from '../../logic/assets'
import { EModeIndicator } from './components/EModeIndicator'

export interface BorrowTableProps {
  assets: Borrow[]
  openDialog: OpenDialogFunction
  eModeCategoryId: EModeCategoryId
}

export function BorrowTable({ assets, openDialog, eModeCategoryId }: BorrowTableProps) {
  return (
    <Panel collapsibleOptions={{ collapsible: true, collapsibleAbove: 'md' }} className="bg-panel-bg md:px-3">
      <Panel.Header>
        <Panel.Title className="text-xl md:px-3" gradient>
          Available to borrow
        </Panel.Title>
        <EModeIndicator
          eModeCategoryId={eModeCategoryId}
          onButtonClick={() => {
            openDialog(eModeDialogConfig, { userEModeCategoryId: eModeCategoryId })
          }}
        />
      </Panel.Header>

      <Panel.Content>
        <ResponsiveDataTable
          gridTemplateColumnsClassName="grid-cols-[repeat(4,_3fr)_5fr]"
          columnDefinition={{
            symbol: {
              header: 'Assets',
              renderCell: ({ token, reserveStatus }) => <TokenWithLogo token={token} reserveStatus={reserveStatus} />,
            },
            inWallet: {
              header: 'Available',
              sortable: true,
              sortingFn: (a, b) => sortByUsdValue(a.original, b.original, 'available'),
              headerAlign: 'right',
              renderCell: ({ token, available }, mobileViewOptions) => (
                <CompactValueCell token={token} value={available} mobileViewOptions={mobileViewOptions} hideEmpty />
              ),
            },
            deposit: {
              header: 'Your borrow',
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
              renderCell: ({ token, reserveStatus, available }) => {
                return (
                  <ActionsCell>
                    <Button
                      size="sm"
                      className="w-full md:w-fit"
                      onClick={() => {
                        openDialog(borrowDialogConfig, { token })
                      }}
                      disabled={reserveStatus === 'frozen' || available.isZero()}
                    >
                      Borrow
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
