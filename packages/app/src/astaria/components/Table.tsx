import { type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes, forwardRef } from 'react'

import { clsx } from 'clsx'

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  banner?: ReactNode
  size?: 'narrow' | 'wide'
}
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, size = 'wide', ...rest }, ref) => (
    <div className={clsx('relative text-sm', className)}>
      <table
        ref={ref}
        className="-my-0.5 md:-my-2 w-full caption-bottom border-separate border-spacing-y-1 md:border-spacing-y-2"
        {...rest}
      >
        {children}
      </table>
    </div>
  ),
)
Table.displayName = 'Table'

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...rest }, ref) => <thead ref={ref} className={clsx('sticky top-0 z-10 ', className)} {...rest} />,
)
TableHeader.displayName = 'TableHeader'

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...rest }, ref) => <tbody ref={ref} className={className} {...rest} />,
)
TableBody.displayName = 'TableBody'

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...rest }, ref) => (
    <tfoot ref={ref} className={clsx('bg-primary font-medium text-primary-foreground', className)} {...rest} />
  ),
)
TableFooter.displayName = 'TableFooter'

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  bordered?: boolean
}
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ bordered = true, className, ...rest }, ref) => (
    <tr
      ref={ref}
      className={clsx(
        'rounded-sm bg-panel-bg backdrop-blur-sm transition-colors data-[state=selected]:bg-muted hover:bg-muted/50',
        { '': bordered },
        className,
      )}
      {...rest}
    />
  ),
)
TableRow.displayName = 'TableRow'

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...rest }, ref) => (
    <th
      ref={ref}
      className={clsx(
        'h-12 px-1 text-left align-middle font-medium first:rounded-tl-sm last:rounded-tr-sm last:rounded-br-sm first:rounded-bl-sm [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...rest}
    />
  ),
)
TableHead.displayName = 'TableHead'

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...rest }, ref) => (
    <td
      ref={ref}
      className={clsx(
        'px-1 py-2 align-middle first:rounded-tl-sm last:rounded-tr-sm last:rounded-br-sm first:rounded-bl-sm md:px-2 md:py-3 [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...rest}
    />
  ),
)
TableCell.displayName = 'TableCell'

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...rest }, ref) => (
    <caption ref={ref} className={clsx('mt-4 text-muted-foreground text-sm', className)} {...rest} />
  ),
)
TableCaption.displayName = 'TableCaption'
