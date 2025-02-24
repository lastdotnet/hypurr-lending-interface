import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { type Address, type Chain, formatUnits } from 'viem'

import { EVENT } from 'notifications'
import { useIsClient } from 'usehooks-ts'

import { getOriginationTransactionBorrow } from '@/app/isolated/intents/_/IntentAction/FillIntent/getOriginationTransactionBorrow'
import { getOriginationTransactionLend } from '@/app/isolated/intents/_/IntentAction/FillIntent/getOriginationTransactionLend'
import { insertIntentFillPoints } from '@/app/isolated/intents/_/IntentAction/FillIntent/insertIntentFillPoints'
import { getEstimatedLTV } from '@/app/isolated/intents/_/getEstimatedLTV'
import {
  DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
  NotificationChannel,
  NotificationType,
} from '@/astaria/constants/notifications'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'
import { getChain } from '@/astaria/utils/getChain'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'
import { isLendIntent, isRecallIntent } from '@/astaria/utils/intentStates'
import { sendNotification } from '@/astaria/utils/sendNotification'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'
import { trackInternalEvent } from '@/astaria/utils/trackInternalEvent'

import { useAccount } from '@/domain/hooks/useAccount'
import { isERC20Asset } from 'assets'

export const useWriteFillIntent = ({
  enabled,
  intent,
  isFinishedApprove,
  isFinishedFillIntent,
  onConfirmed,
  showError,
}: {
  enabled: boolean
  intent: BorrowIntent | LendIntent
  isFinishedApprove: boolean
  isFinishedFillIntent: boolean
  onConfirmed?: () => void
  showError: boolean
}) => {
  const address = useAccount()
  const chainId = useChainId()
  const chain = getChain({ chainId }) as Chain
  const [isFillingIntent, setisFillingIntent] = useState(false)

  const { data: originationTransaction } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && enabled && !!address,
    // getOriginationTransactionLend computes the current rate at block time. Disable cache for this query
    gcTime: 0,
    queryFn: () =>
      isLendIntent(intent)
        ? getOriginationTransactionLend({
            address: address as Address,
            caveatId: intent.id,
            chainId,
          })
        : getOriginationTransactionBorrow({
            address: address as Address,
            caveatId: intent.id,
            chainId,
          }),
    queryKey: ['getOriginationTransaction', { caveatId: intent.id, chainId }],
  })

  const loanAmount = formatCurrency({
    amount: intent.borrow.amount,
    decimals: intent.borrow.decimals,
    usdValue: intent.borrow.usdValue,
  }).trigger

  const { writeContract: fillIntent, ...rest } = useSimulateAndWriteTransaction({
    enabled:
      enabled && Boolean(!isFillingIntent && isFinishedApprove && !isFinishedFillIntent && originationTransaction),
    onConfirmed: () => {
      onConfirmed?.()
      setisFillingIntent(false)
    },
    onMutate: () => {
      setisFillingIntent(true)
    },
    onSuccessWrite: () => {
      if (intent.id) {
        insertIntentFillPoints({
          address: address as Address,
          chainId,
          intent,
        })
        trackInternalEvent({
          name: EVENT.BORROW_INTENT_FILLED,
          payload: {
            description: `Borrow intent filled for ${loanAmount} ${intent.borrow.symbol}`,
            title: 'Borrow Intent Filled',
            values: {
              account: `${chain.blockExplorers?.default.url}/address/${address}`,
              caveatId: intent.id.toString(),
              chainId,
            },
          },
        })
        if (isLendIntent(intent)) {
          sendSafaryClubEvent({
            chainId,
            eventName: 'Borrow a token (fill)',
            eventType: 'onchain',
          })
        } else {
          sendSafaryClubEvent({
            chainId,
            eventName: 'Lend a token (fill)',
            eventType: 'onchain',
          })
        }

        // NB: Leaving plumbing in place for future filled intent notifications
        // but currently disabled, returns early intentionally
        if (!process.env.NEVER_GONNA_GIVE_YOU_UP_NEVER_GONNA_HAVE_A_VALUE) {
          return
        }

        const getNotificationType = (intent: BorrowIntent | LendIntent) => {
          if (isLendIntent(intent)) {
            return 'LENDING'
          }

          if (isRecallIntent(intent)) {
            return 'BORROW RECALL'
          }

          return 'BORROW'
        }

        if (isERC20Asset(intent.borrow) && isERC20Asset(intent.collateral)) {
          const usdValueBorrow = intent.borrow.usdValue ?? 0
          const usdValueCollateral = intent.collateral.usdValue ?? 0

          sendNotification({
            channels: [NotificationChannel.TELEGRAM],
            payload: {
              apy: formatUnits(
                isLendIntent(intent) ? intent.minAPY : intent.endRate,
                intent.borrow.decimals - DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
              ),
              borrowAmount: formatUnits(intent.borrow.amount, intent.borrow.decimals),
              borrowSymbol: intent.borrow.symbol,
              chainId,
              collateralAmount: formatUnits(intent.collateral.amount, intent.collateral.decimals),
              collateralSymbol: intent.collateral.symbol,
              intentType: getNotificationType(intent),
              ltv: getEstimatedLTV({ usdValueBorrow, usdValueCollateral }),
              raw: intent,
              status: 'FILLED',
              usdValue: usdValueBorrow === 0 ? undefined : usdValueBorrow,
            },
            type: NotificationType.INTENT_FILLED,
          })
        }
      }
    },
    showError,
    simulateData: originationTransaction,
    title: `${getIntentCopy({ borrow: 'Lend', intent, lend: 'Borrow' })} ${loanAmount} ${intent.borrow.symbol}`,
  })

  return { fillIntent, ...rest }
}
