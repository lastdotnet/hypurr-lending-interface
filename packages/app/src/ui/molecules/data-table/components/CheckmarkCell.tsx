import { cn } from '@/ui/utils/style'
import { CheckIcon } from 'lucide-react'

interface CheckmarkCellWrapperProps {
  usageAsCollateralEnabled: boolean
}

export function CheckmarkCell({ usageAsCollateralEnabled }: CheckmarkCellWrapperProps) {
  return (
    <div className="flex justify-end">
      <CheckIcon
        className={cn('h-4 w-4 text-white/35', {
          'text-primary': usageAsCollateralEnabled,
        })}
      />
    </div>
  )
}
