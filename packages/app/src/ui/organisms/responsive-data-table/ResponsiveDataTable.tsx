import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/atoms/table/Table'
import { ColumnDefinition } from '@/ui/molecules/data-table/types'
import { testIds } from '@/ui/utils/testIds'
import { useBreakpoint } from '@/ui/utils/useBreakpoint'
import { Fragment } from 'react'
import { DataTable } from '../../molecules/data-table/DataTable'
import { CollapsibleCell } from './components/CollapsibleCell'
import { cn } from '@/ui/utils/style'
import { Trans } from '@lingui/react/macro'

export interface ResponsiveDataTableProps<T> {
  columnDefinition: { [key: string]: ColumnDefinition<T> }
  scroll?: {
    height: number
  }
  hideTableHeader?: boolean
  gridTemplateColumnsClassName?: string
  data: T[]
  'data-testid'?: string
}

interface DefinitionGroups<T> {
  collapsedDefinitions: ColumnDefinition<T>[]
  visibleDefinitions: ColumnDefinition<T>[]
}

function groupDefinitionsByVisibility<T>(definitions: ColumnDefinition<T>[]): DefinitionGroups<T> {
  return definitions.reduce(
    (acc, def) => {
      if (!def.showOnMobile) {
        acc.collapsedDefinitions.push(def)
      } else {
        acc.visibleDefinitions.push(def)
      }
      return acc
    },
    { collapsedDefinitions: [], visibleDefinitions: [] } as DefinitionGroups<T>,
  )
}

export function ResponsiveDataTable<T extends { [k: string]: any }>({
  columnDefinition,
  data,
  scroll,
  gridTemplateColumnsClassName,
  hideTableHeader = false,
  'data-testid': dataTestId,
}: ResponsiveDataTableProps<T>) {
  const desktop = useBreakpoint('md')

  if (desktop) {
    return (
      <DataTable
        columnDef={columnDefinition}
        data={data}
        scroll={scroll}
        gridTemplateColumnsClassName={gridTemplateColumnsClassName}
        hideTableHeader={hideTableHeader}
        data-testid={dataTestId}
      />
    )
  }

  const [rowHeaderDefinition, ...contentDefinitions] = Object.values(columnDefinition)
  const { collapsedDefinitions, visibleDefinitions } = groupDefinitionsByVisibility(contentDefinitions)

  const headerDefs = [rowHeaderDefinition, ...visibleDefinitions].map((def) => def?.header ?? '')

  return (
    <Table data-testid={dataTestId}>
      {!hideTableHeader && (
        <TableHeader className="static">
          <TableRow className="flex justify-between">
            {[...headerDefs].map((header, index) => (
              <TableHead
                className={cn('flex-1 py-2 text-white text-xs', index !== 0 && 'flex justify-center px-2')}
                key={index}
              >
                {header}
              </TableHead>
            ))}
            <TableHead className="py-2 text-white text-xs">
              <Trans>More</Trans>
            </TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {data.map((value, index) => (
          <TableRow key={index} data-testid={testIds.component.DataTable.row(index)}>
            <CollapsibleCell>
              {[rowHeaderDefinition, ...visibleDefinitions].map((def, index) => (
                <div className={cn('flex-1', index !== 0 && 'px-2')} key={index}>
                  {def?.renderCell(value, {
                    isMobileView: true,
                    rowTitle: def.header,
                    showOnMobile: def.showOnMobile,
                  })}
                </div>
              ))}
              {collapsedDefinitions.map((def, index) => (
                <Fragment key={index}>{def.renderCell(value, { isMobileView: true, rowTitle: def.header })}</Fragment>
              ))}
            </CollapsibleCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
