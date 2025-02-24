import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // Allow className to be added to columns
  // see https://github.com/TanStack/table/discussions/4157
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  interface ColumnMeta {
    className?: string
  }
}
