import { type ColumnDef } from '@tanstack/react-table'

import { toNormalizedValue } from 'common'

import { AverageAPY } from '@/app/isolated-markets/_/AssetDetails/AverageAPY'
import { MarketERC20Display } from '@/app/isolated-markets/_/AssetDetails/MarketERC20Display'
import { TokenAmountAndUSDDisplay } from '@/app/isolated-markets/_/AssetDetails/TokenAmountAndUSDDisplay'
import { SortButton } from '@/astaria/components/SortButton'
import { type AssetDetail } from '@/astaria/types-internal/market-schemas'

export const assetDetailsColumns: ColumnDef<AssetDetail>[] = [
  {
    accessorFn: (row) => row.erc20.name,
    accessorKey: 'erc20',
    cell: ({ row }) => {
      const erc20 = row.original.erc20

      return <MarketERC20Display erc20={erc20} />
    },
    header: ({ column }) => <SortButton column={column}>Asset</SortButton>,
  },
  {
    accessorFn: (row) => row.usdValueCollateral,
    accessorKey: 'totalCollateral',
    cell: ({ row }) => {
      const erc20 = row.original.erc20
      const totalCollateral = row.original.totalCollateral
      const usdValueCollateral = row.original.usdValueCollateral

      return <TokenAmountAndUSDDisplay amount={totalCollateral} erc20={erc20} usdValue={usdValueCollateral} />
    },
    header: ({ column }) => <SortButton column={column}>Total collateral</SortButton>,
    sortingFn: (rowA, rowB) => (rowB.original.usdValueCollateral || 0) - (rowA.original.usdValueCollateral || 0),
  },
  {
    accessorFn: (row) => row.usdValueBorrowed,
    accessorKey: 'totalBorrowed',
    cell: ({ row }) => {
      const erc20 = row.original.erc20
      const totalBorrowed = row.original.totalBorrowed
      const usdValueBorrowed = row.original.usdValueBorrowed

      return <TokenAmountAndUSDDisplay amount={totalBorrowed} erc20={erc20} usdValue={usdValueBorrowed} />
    },
    header: ({ column }) => <SortButton column={column}>Total borrowed</SortButton>,
    sortingFn: (rowA, rowB) => (rowB.original.usdValueBorrowed || 0) - (rowA.original.usdValueBorrowed || 0),
  },
  {
    accessorFn: (row) => toNormalizedValue(row.avgApy, row.erc20.decimals) || 0,
    accessorKey: 'avgApy',
    cell: ({ row }) => {
      const erc20 = row.original.erc20
      const avgApy = row.original.avgApy

      return (
        <div className="text-right">
          <AverageAPY avgApy={avgApy} erc20={erc20} />
        </div>
      )
    },
    header: ({ column }) => (
      <div className="text-right">
        <SortButton column={column}>Average APY</SortButton>
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const apyRowA = toNormalizedValue(rowA.original.avgApy, rowA.original.erc20.decimals) || 0
      const apyRowB = toNormalizedValue(rowB.original.avgApy, rowB.original.erc20.decimals) || 0
      return apyRowB - apyRowA
    },
  },
]
