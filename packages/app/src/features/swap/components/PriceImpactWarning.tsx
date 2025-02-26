import { formatPercentage } from '@/domain/common/format'
import { Percentage } from '@/domain/types/NumericValues'
import { cva } from 'class-variance-authority'
import { AlertTriangle } from 'lucide-react'

interface PriceImpactWarningProps {
  percentage: Percentage
}

export function PriceImpactWarning({ percentage }: PriceImpactWarningProps) {
  const impactLevel = getImpactLevel(percentage)
  const impactLevelTitle = impactLevel === 'very-high' ? 'Very high' : 'High'

  return (
    <div>
      <div className={itemVariants({ variant: impactLevel })}>
        <AlertTriangle className="h-4 w-4" />
        <p>
          {impactLevelTitle} price impact ({formatPercentage(percentage)})
        </p>
      </div>
    </div>
  )
}

function getImpactLevel(percentage: Percentage) {
  if (percentage.gt(0.1)) {
    return 'very-high'
  }
  if (percentage.gt(0.05)) {
    return 'high'
  }
  return 'low'
}

const itemVariants = cva('flex items-center gap-1 text-xs', {
  variants: {
    variant: {
      high: 'text-product-orange',
      'very-high': 'text-product-red',
      low: 'hidden',
    },
  },
})
