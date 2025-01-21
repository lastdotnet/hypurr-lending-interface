export interface NavbarActionWrapperProps {
  label: string
  children: React.ReactNode
}

export function NavbarActionWrapper({ label, children }: NavbarActionWrapperProps) {
  return (
    <div className="flex w-full flex-col gap-2 xl:w-auto">
      <div className="text-basics-dark-grey text-sm xl:hidden">{label}</div>
      {children}
    </div>
  )
}
