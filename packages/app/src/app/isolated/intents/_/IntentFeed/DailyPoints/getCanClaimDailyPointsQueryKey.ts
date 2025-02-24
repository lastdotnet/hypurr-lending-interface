import { type Address } from 'viem'

export const getCanClaimDailyPointsQueryKey = ({
  address,
}: {
  address: Address | undefined
}) => ['can-claim-daily-points', { address }]
