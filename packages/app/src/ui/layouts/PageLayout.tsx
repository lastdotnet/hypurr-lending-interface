import { cn } from '../utils/style'

export interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn('mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-3 pt-12 pb-16 lg:px-0', className)}>
      {children}
    </div>
  )
}
