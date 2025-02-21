import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { wagmiConfig } from '@/astaria/config/wagmi'
import { getToken } from 'wagmi/actions'
import { type Address, type Chain, formatUnits } from 'viem'

import { EVENT } from 'notifications'
import { useIsClient } from 'usehooks-ts'

import { getEstimatedLTV } from '@/app/intents/_/getEstimatedLTV'
import { getRefinanceTransaction } from '@/app/intents/_/getRefinanceTransaction'
import {
  DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
  NotificationChannel,
  NotificationType,
} from '@/astaria/constants/notifications'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type BorrowIntentWithRecall } from '@/astaria/types-internal/intent-schemas'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'
import { getChain } from '@/astaria/utils/getChain'
import { sendNotification } from '@/astaria/utils/sendNotification'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'
import { trackInternalEvent } from '@/astaria/utils/trackInternalEvent'

import { type ERC20Asset, getERC20TokenByAddress, isERC20Asset } from 'assets'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const useWriteRecallBorrowIntent = ({
  borrowIntentWithRecall,
  enabled,
  isFinishedApprove,
  isFinishedRecallIntent,
  onConfirmed,
  showError,
}: {
  borrowIntentWithRecall: BorrowIntentWithRecall
  enabled: boolean
  isFinishedApprove: boolean
  isFinishedRecallIntent: boolean
  onConfirmed?: () => void
  showError: boolean
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()
  const chain = getChain({ chainId }) as Chain
  const [isFillingIntent, setisFillingIntent] = useState(false)

  const { data: refinanceData } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && !!address,
    // getRefinanceTransaction computes the current rate at block time. Disable cache for this query
    gcTime: 0,
    queryFn: () =>
      getRefinanceTransaction({
        chainId,
        intentId: borrowIntentWithRecall.id,
        lender: address as Address,
      }),
    queryKey: ['getRefinanceTransaction', { caveatId: borrowIntentWithRecall.id, chainId }],
  })

  const loanAmount = formatCurrency({
    amount: borrowIntentWithRecall.borrow.amount,
    decimals: borrowIntentWithRecall.borrow.decimals,
    usdValue: borrowIntentWithRecall.borrow.usdValue,
  }).trigger

  const { writeContract: fillIntent, ...rest } = useSimulateAndWriteTransaction({
    enabled: enabled && Boolean(!!refinanceData && !isFillingIntent && !isFinishedRecallIntent && isFinishedApprove),
    onConfirmed: () => {
      onConfirmed?.()
      setisFillingIntent(false)
    },
    onMutate: () => {
      setisFillingIntent(true)
    },
    onSuccessWrite: async () => {
      trackInternalEvent({
        name: EVENT.RECALL_BORROW_INTENT_FILLED,
        payload: {
          description: `Borrow intent with recall filled for ${loanAmount} ${borrowIntentWithRecall.borrow.symbol}`,
          title: 'Recall Borrow Intent Filled',
          values: {
            account: `${chain.blockExplorers?.default.url}/address/${address}`,
            caveatId: borrowIntentWithRecall.id.toString(),
            chainId,
          },
        },
      })
      sendSafaryClubEvent({
        chainId,
        eventName: 'Refinance a Loan',
        eventType: 'onchain',
      })

      // NB: Leaving plumbing in place for future filled intent notifications
      // but currently disabled, returns early intentionally
      if (!process.env.NEVER_GONNA_GIVE_YOU_UP_NEVER_GONNA_HAVE_A_VALUE) {
        return
      }

      if (!(isERC20Asset(borrowIntentWithRecall.borrow) && isERC20Asset(borrowIntentWithRecall.collateral))) {
        return
      }

      let [borrowData, collateralData] = await Promise.all([
        getERC20TokenByAddress({
          address: borrowIntentWithRecall.borrow.address as Address,
        }),
        getERC20TokenByAddress({
          address: borrowIntentWithRecall.collateral.address as Address,
        }),
      ])

      if (!borrowData) {
        borrowData = {
          ...(await getToken(wagmiConfig, {
            address: borrowIntentWithRecall.borrow.address as Address,
            chainId,
          })),
          chainId,
        } as ERC20Asset
      }

      if (!collateralData) {
        collateralData = {
          ...(await getToken(wagmiConfig, {
            address: borrowIntentWithRecall.collateral.address as Address,
            chainId,
          })),
          chainId,
        } as ERC20Asset
      }

      const usdValueBorrow = borrowIntentWithRecall.borrow.usdValue ?? 0
      const usdValueCollateral = borrowIntentWithRecall.collateral.usdValue ?? 0

      await sendNotification({
        channels: [NotificationChannel.TELEGRAM],
        payload: {
          apy: formatUnits(borrowIntentWithRecall.endRate, borrowData.decimals - DECIMALS_SUBTRACTION_FOR_PERCENTAGES),
          borrowAmount: formatUnits(borrowIntentWithRecall.borrow.amount, borrowIntentWithRecall.borrow.decimals),
          borrowSymbol: borrowIntentWithRecall.borrow.symbol,
          chainId,
          collateralAmount: formatUnits(
            borrowIntentWithRecall.collateral.amount,
            borrowIntentWithRecall.collateral.decimals,
          ),
          collateralSymbol: borrowIntentWithRecall.collateral.symbol,
          intentType: 'BORROW RECALL',
          ltv: getEstimatedLTV({ usdValueBorrow, usdValueCollateral }),
          raw: refinanceData,
          status: 'FILLED',
          usdValue: usdValueBorrow === 0 ? undefined : usdValueBorrow,
        },
        type: NotificationType.INTENT_FILLED,
      })
    },
    showError,
    simulateData: refinanceData?.functionData,
    title: `Lend ${loanAmount} ${borrowIntentWithRecall.borrow.symbol}`,
  })

  return { fillIntent, ...rest }
}
