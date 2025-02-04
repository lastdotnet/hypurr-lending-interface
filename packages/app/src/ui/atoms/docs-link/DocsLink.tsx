import { Link, LinkProps } from '@/ui/atoms/link/Link'

export function DocsLink({ href, children, ...rest }: LinkProps) {
  return (
    <Link href={href} external className="text-slate-500 underline hover:text-slate-700" {...rest}>
      {children}
    </Link>
  )
}
