import { formatPercentage } from '@/domain/common/format'
import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'

interface LegendProps {
  token: Token
  total: NormalizedUnitNumber
  utilized: NormalizedUnitNumber
  utilizationRate: Percentage
}

export function Legend({ token, total, utilized, utilizationRate }: LegendProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-white/50 text-xs leading-none">Utilization rate</p>
      <p className="font-regular text-xl leading-none">{formatPercentage(utilizationRate)}</p>
      <p className="text-white/50 text-xs leading-none">
        {token.formatUSD(utilized, { compact: true })} of {token.formatUSD(total, { compact: true })}
      </p>
    </div>
  )
}
