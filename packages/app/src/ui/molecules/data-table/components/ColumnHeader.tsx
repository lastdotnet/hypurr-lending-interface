import { Column } from '@tanstack/react-table'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/ui/atoms/button/Button'
import { cn } from '@/ui/utils/style'

import { ColumnDefinition } from '../types'

interface ColumnHeaderProps<T> {
  column: Column<T>
  columnDefinition: ColumnDefinition<T> | undefined
}

export function ColumnHeader<T>({ column, columnDefinition }: ColumnHeaderProps<T>) {
  const { headerAlign, sortable, header } = columnDefinition ?? {}
  return (
    <div
      className={cn(
        'flex flex-row',
        headerAlign === 'center' && 'justify-center',
        headerAlign === 'right' && 'justify-end',
      )}
    >
      <Button
        variant="text"
        className={cn(
          'h-4 cursor-auto p-0 font-bold text-white text-xs',
          sortable && 'cursor-pointer hover:text-secondary-foreground',
        )}
        onClick={() => sortable && column.toggleSorting(column.getIsSorted() === 'asc')}
        postfixIcon={
          sortable &&
          (column.getIsSorted() !== false ? (
            <>
              {column.getIsSorted() === 'asc' ? (
                <ChevronDown className="text-white/35" size={16} />
              ) : (
                <ChevronUp className="text-white/35" size={16} />
              )}
            </>
          ) : (
            <ChevronsUpDown className="text-white/35" size={16} />
          ))
        }
      >
        {header}
      </Button>
    </div>
  )
}
