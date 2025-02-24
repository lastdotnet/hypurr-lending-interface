import { type ReactNode } from 'react'

export const AssetSelectorValueSelectWrapper = ({
  children,
  ...rest
}: {
  children: ReactNode
}) => (
  <div className="flex w-full justify-between gap-2" {...rest}>
    {children}
  </div>
)
