import { type ColumnDef } from '@tanstack/react-table'

import { formatDate, formatNumber, toNormalizedValue } from 'common'
import { secondsToMilliseconds } from 'date-fns'
import { POINTS_DECIMALS } from 'points'

import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { ChainLogo } from '@/astaria/components/ChainLogo'
import { SortButton } from '@/astaria/components/SortButton'
import { EventType, type PointsEvent } from '@/astaria/types-internal/points-schemas'

const eventTypeToText = {
  [EventType.BORROW]: 'Borrowed',
  [EventType.LEND]: 'Lent',
  [EventType.IntentSubmission]: 'Intent transmitted',
  [EventType.CheckedIntentFeed]: 'Daily points',
  [EventType.IntentFill]: 'Intent filled',
  [EventType.Special]: 'Bonus',
}

export const pointsHistoryColumns: ColumnDef<PointsEvent>[] = [
  {
    accessorKey: 'eventType',
    cell: ({ row }) => {
      const eventType = row.getValue<PointsEvent['eventType']>('eventType')
      const asset = row.original.asset
      const chainId = row.original.chainId

      return (
        <div className="flex flex-wrap items-center gap-1">
          {eventTypeToText[eventType]} <AssetDisplay asset={asset} hideUSDValue size="sm" />
          {chainId ? (
            <>
              {' '}
              on <ChainLogo chainId={chainId} height="20" width="20" />
            </>
          ) : null}
        </div>
      )
    },
    header: ({ column }) => <SortButton column={column}>Event</SortButton>,
  },
  {
    accessorKey: 'date',
    cell: ({ row }) => {
      const startTime = row.original.startTime

      return formatDate({
        date: secondsToMilliseconds(Number(startTime)),
      })
    },
    header: ({ column }) => <SortButton column={column}>Date</SortButton>,
  },
  {
    accessorKey: 'points',
    cell: ({ row }) => {
      const points = row.getValue<PointsEvent['points']>('points')
      return (
        <div className="text-right font-bold font-mono">
          {formatNumber({
            amount: toNormalizedValue(points, POINTS_DECIMALS),
            maxDecimals: 2,
            signDisplay: 'always',
          })}
        </div>
      )
    },
    header: ({ column }) => (
      <div className="flex justify-end">
        <SortButton column={column}>Points</SortButton>
      </div>
    ),
  },
]
