'use client'

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { type ReactNode, useState } from 'react'

import { clsx } from 'clsx'

import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/astaria/components/Table'

const NUMBER_OF_INITIAL_SKELETON_ROWS_TO_SHOW = 3

const loadingArray = [...Array(NUMBER_OF_INITIAL_SKELETON_ROWS_TO_SHOW).keys()]

export const DataTable = <TData, TValue>({
  className,
  columns,
  data,
  defaultSorting = [],
  infoMessage,
  isFetchingNextPage,
  isPending,
  isRefetching,
  size,
  ...rest
}: {
  className?: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  defaultSorting?: SortingState
  infoMessage?: ReactNode
  isFetchingNextPage?: boolean
  isPending?: boolean
  isRefetching?: boolean
  size?: 'narrow' | 'wide'
}) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting)
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <Table className={className} size={size} {...rest}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} bordered={false}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {infoMessage ? (
          <tr>
            <td colSpan={table.getAllColumns().length}>{infoMessage}</td>
          </tr>
        ) : null}
        {(() => {
          if (!isPending) {
            return table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : null}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }

          if (!table.getRowModel().rows.length && !isFetchingNextPage && !isPending) {
            return (
              <TableRow>
                <TableCell className="h-[76px] text-center" colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )
          }

          if (isPending) {
            return loadingArray.map((id) => (
              <TableRow key={id}>
                {table.getAllColumns().map((cell) => (
                  <TableCell key={cell.id} className={clsx('h-[76px]', cell.columnDef.meta?.className)}>
                    <SkeletonNumber />
                  </TableCell>
                ))}
              </TableRow>
            ))
          }

          return null
        })()}
        {isFetchingNextPage || isRefetching ? (
          <TableRow>
            {table.getAllColumns().map((cell) => (
              <TableCell key={cell.id} className="h-[76px]">
                <SkeletonNumber />
              </TableCell>
            ))}
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  )
}
