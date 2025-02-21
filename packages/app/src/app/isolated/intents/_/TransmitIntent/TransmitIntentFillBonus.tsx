import { formatNumber } from 'common'
import { INTENT_FILL_BONUS_POINTS_MAX } from 'points'

import { CardBanner } from '@/astaria/components/CardBanner'
import { Tooltip } from '@/astaria/components/Tooltip'

export const TransmitIntentFillBonus = () => (
  <CardBanner className="dark bg-black bg-small-galaxy bg-no-repeat text-foreground">
    Earn <Tooltip content="The sooner the intent is filled, the more points" trigger="up to" underline />{' '}
    <strong className="italic">
      {formatNumber({
        amount: INTENT_FILL_BONUS_POINTS_MAX,
        maxDecimals: 0,
      })}{' '}
      points
    </strong>{' '}
    if it is filled
  </CardBanner>
)
