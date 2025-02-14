import { useQueryClient } from '@tanstack/react-query'

import { useAccount } from 'wagmi'

import { clsx } from 'clsx'

import { DAILY_BONUS_POINTS } from 'points'

import { getCanClaimDailyPointsQueryKey } from '@/app/intents/_/IntentFeed/DailyPoints/getCanClaimDailyPointsQueryKey'
import { useClaimDailyPoints } from '@/app/intents/_/IntentFeed/DailyPoints/useClaimDailyPoints'
import { useNextClaimTime } from '@/app/intents/_/IntentFeed/DailyPoints/useNextClaimTime'
import { Button } from '@/astaria/components/Button'
import { CardBanner } from '@/astaria/components/CardBanner'
import { ConnectButton } from '@/astaria/components/ConnectButton'
import { TimeLeft } from '@/astaria/components/TimeLeft'
import { useChainId } from '@/astaria/hooks/useChainId'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'
import { TIME_HAS_PASSED_TIME, timeHasPassed } from '@/astaria/utils/timeHasPassed'

const ButtonText = ({
  canClaimDailyPoints,
  isPendingNextClaimTime,
  nextClaimTime,
}: {
  canClaimDailyPoints: boolean
  isPendingNextClaimTime: boolean
  nextClaimTime: number | undefined
}) => {
  const { address } = useAccount()
  const queryClient = useQueryClient()
  if (
    canClaimDailyPoints ||
    isPendingNextClaimTime ||
    nextClaimTime === undefined ||
    nextClaimTime === TIME_HAS_PASSED_TIME
  ) {
    return 'Claim'
  }

  return (
    <span>
      Claim in{' '}
      <TimeLeft
        endMilliseconds={nextClaimTime}
        onOutOfTime={() => {
          const queryKey = getCanClaimDailyPointsQueryKey({ address })
          queryClient.setQueryData(queryKey, TIME_HAS_PASSED_TIME)
          queryClient.invalidateQueries({
            queryKey,
          })
          queryClient.cancelQueries({
            queryKey,
          })
        }}
      />
    </span>
  )
}

export const DailyPoints = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { isPending: isPendingNextClaimTime, nextClaimTime } = useNextClaimTime()
  const { claimDailyPoints, isPending: isClaiming } = useClaimDailyPoints()

  const canClaimDailyPoints = timeHasPassed({ nextTime: nextClaimTime })

  return (
    <CardBanner
      className={clsx('flex items-center justify-between gap-2', {
        'dark bg-black bg-daily-points bg-no-repeat text-foreground': canClaimDailyPoints,
      })}
    >
      <span className="text-foreground">
        Claim <strong className="italic">{DAILY_BONUS_POINTS} points</strong> each day
      </span>
      {address ? (
        <Button
          disabled={!address || !canClaimDailyPoints}
          emphasis={canClaimDailyPoints ? 'high' : 'medium'}
          loading={isClaiming}
          onClick={() => {
            claimDailyPoints({ address, chainId })
            sendSafaryClubEvent({
              chainId,
              eventName: 'Claim Daily Points',
              eventType: 'offchain',
            })
          }}
        >
          <ButtonText
            canClaimDailyPoints={canClaimDailyPoints}
            isPendingNextClaimTime={isPendingNextClaimTime}
            nextClaimTime={nextClaimTime}
          />
        </Button>
      ) : (
        <ConnectButton />
      )}
    </CardBanner>
  )
}
