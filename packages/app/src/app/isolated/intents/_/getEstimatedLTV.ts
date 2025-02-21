import { DECIMALS_MULTIPLIER_FOR_PERCENTAGES } from '@/astaria/constants/notifications'

export const getEstimatedLTV = ({
  usdValueBorrow,
  usdValueCollateral,
}: {
  usdValueBorrow: number
  usdValueCollateral: number
}) => {
  const estimatedLTV = Math.round((usdValueBorrow / usdValueCollateral) * DECIMALS_MULTIPLIER_FOR_PERCENTAGES)

  return Number.isNaN(estimatedLTV) || !Number.isFinite(estimatedLTV) ? undefined : `${estimatedLTV}`
}
