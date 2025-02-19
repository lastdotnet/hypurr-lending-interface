import { QueryClient } from '@tanstack/react-query'
import { type ColumnDef } from '@tanstack/react-table'

import { clsx } from 'clsx'

import { toNormalizedValue } from 'common'

import { IntentAction } from '@/app/intents/_/IntentAction'
import { IntentMenu } from '@/app/intents/_/IntentMenu'
import { getCurrentAPYForBorrowIntent } from '@/app/intents/_/getCurrentAPY'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { CurrentBorrowAPYWithMaxTooltip } from '@/astaria/components/CurrentBorrowAPYWithMaxTooltip'
import { FillIntentBonusPoints } from '@/astaria/components/FillIntentBonusPoints'
import { LTVDisplay } from '@/astaria/components/LTVDisplay'
import { Percent } from '@/astaria/components/Percent'
import { SortButton } from '@/astaria/components/SortButton'
import { TimeLeft } from '@/astaria/components/TimeLeft'
import { removeBorrowIntentFromQuery } from '@/astaria/hooks/useIntents/removeBorrowIntentFromQuery'
import { removeLendIntentFromQuery } from '@/astaria/hooks/useIntents/removeLendIntentFromQuery'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'
import { isLendIntent } from '@/astaria/utils/intentStates'

import { type Asset, isERC20Asset, isERC721Asset } from 'assets'

export const intentFeedColumns: ColumnDef<BorrowIntent | LendIntent>[] = [
  {
    accessorKey: 'collateral',
    cell: ({ row }) => {
      const collateral = row.getValue<Asset>('collateral')

      const style = getIntentCopy({
        borrow: 'border bg-diagonal-lines',
        intent: row.original,
        lend: 'bg-black',
      })

      return (
        <>
          <div className={clsx('absolute bottom-0 left-0 top-0 w-2 rounded-bl-sm rounded-tl-sm', style)} />
          <AssetDisplay asset={collateral} />
        </>
      )
    },
    header: ({ column }) => <SortButton column={column}>Collateral</SortButton>,
    meta: {
      className: 'whitespace-nowrap relative pl-4 md:pl-4',
    },
    sortingFn: (rowA, rowB) => {
      if (isERC20Asset(rowA.original.collateral) && isERC20Asset(rowB.original.collateral)) {
        const amountRowA = toNormalizedValue(rowA.original.collateral.amount, rowA.original.collateral.decimals) || 0
        const amountRowB = toNormalizedValue(rowB.original.collateral.amount, rowB.original.collateral.decimals) || 0
        const usdValueRowA = amountRowA * (rowA.original.collateral.usdValue || 0)
        const usdValueRowB = amountRowB * (rowB.original.collateral.usdValue || 0)

        return usdValueRowB - usdValueRowA
      }
      return 0
    },
  },
  {
    accessorKey: 'ltv',
    cell: ({ row }) => {
      const borrow = row.original.borrow
      const ltv = row.getValue<number | undefined>('ltv')
      const collateral = row.original.collateral

      if (isERC721Asset(collateral)) {
        return '?'
      }
      return <LTVDisplay className="font-mono" conciseDisplay decimals={borrow.decimals} ltv={ltv} />
    },
    header: ({ column }) => (
      <div className="flex justify-end">
        <SortButton column={column}>LTV</SortButton>
      </div>
    ),
    meta: {
      className: 'text-right',
    },
  },
  {
    accessorKey: 'apy',
    cell: ({ row }) => {
      if (isLendIntent(row.original)) {
        return (
          <Percent
            className="font-mono"
            decimals={row.original.borrow.decimals}
            percent={row.original.minAPY}
            standardDecimals
          />
        )
      }
      return <CurrentBorrowAPYWithMaxTooltip borrowIntent={row.original} className="font-mono" standardDecimals />
    },
    header: ({ column }) => (
      <div className="flex justify-end">
        <SortButton column={column}>APY</SortButton>
      </div>
    ),
    meta: {
      className: 'text-right',
    },
    sortingFn: (rowA, rowB) => {
      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let apyRowA
      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let apyRowB
      if (isLendIntent(rowA.original)) {
        apyRowA = toNormalizedValue(rowA.original.minAPY, rowA.original.borrow.decimals) || 0
      } else {
        const currentRateRowA = getCurrentAPYForBorrowIntent(rowA.original)
        apyRowA = toNormalizedValue(currentRateRowA, rowA.original.borrow.decimals) || 0
      }
      if (isLendIntent(rowB.original)) {
        apyRowB = toNormalizedValue(rowB.original.minAPY, rowB.original.borrow.decimals) || 0
      } else {
        const currentRateRowB = getCurrentAPYForBorrowIntent(rowB.original)
        apyRowB = toNormalizedValue(currentRateRowB, rowB.original.borrow.decimals) || 0
      }

      return apyRowB - apyRowA
    },
  },
  {
    accessorKey: 'deadline',
    cell: ({ row }) => {
      const intent = row.original

      const queryClient = new QueryClient()

      return (
        <TimeLeft
          className="font-mono"
          endSeconds={intent.deadline}
          onOutOfTime={() => {
            isLendIntent(intent)
              ? removeLendIntentFromQuery({
                  intentLocation: 'intent-feed',
                  lendIntent: intent,
                  queryClient,
                })
              : removeBorrowIntentFromQuery({
                  borrowIntent: intent,
                  intentLocation: 'intent-feed',
                  queryClient,
                })
          }}
        />
      )
    },
    header: ({ column }) => (
      <div className="flex justify-center">
        <SortButton column={column}>Ends in</SortButton>
      </div>
    ),
    meta: {
      className: 'text-center min-w-20',
    },
  },
  {
    accessorKey: 'bonus-points',
    cell: ({ row }) => {
      const intent = row.original
      return <FillIntentBonusPoints className="font-mono" intent={intent} />
    },
    header: ({ column }) => (
      <div className="flex justify-center">
        <SortButton column={column}>
          Bonus
          <br />
          points
        </SortButton>
      </div>
    ),
    meta: {
      className: 'text-center',
    },
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="hidden" data-shortid={row.original.shortId} />
        <IntentAction intent={row.original} intentLocation="intent-feed" />
        <IntentMenu intent={row.original} />
      </div>
    ),
    header: () => null,
  },
]
