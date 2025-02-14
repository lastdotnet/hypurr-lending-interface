import { type ColumnDef } from '@tanstack/react-table'

import { MarketERC20Display } from '@/app/markets/_/AssetDetails/MarketERC20Display'
import { TokenAmountAndUSDDisplay } from '@/app/markets/_/AssetDetails/TokenAmountAndUSDDisplay'
import { Button } from '@/astaria/components/Button'
import { SortButton } from '@/astaria/components/SortButton'
import { type Vault } from '@/astaria/types-internal/vault-schemas'

export const vaultsColumns: ColumnDef<Vault>[] = [
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
    accessorFn: (row) => row.balance,
    accessorKey: 'balance',
    cell: ({ row }) => {
      const erc20 = row.original.erc20
      const balance = row.original.balance
      const usdValueBalance = row.original.usdValueBalance

      return <TokenAmountAndUSDDisplay amount={balance} erc20={erc20} usdValue={usdValueBalance} />
    },
    header: ({ column }) => <SortButton column={column}>Balance</SortButton>,
    sortingFn: (rowA, rowB) => (rowB.original.usdValueBalance || 0) - (rowA.original.usdValueBalance || 0),
  },
  {
    accessorFn: (row) => row.usage,
    accessorKey: 'usage',
    cell: ({ row }) => {
      const erc20 = row.original.erc20
      const usage = row.original.usage
      const usdValueUsage = row.original.usdValueUsage

      return <TokenAmountAndUSDDisplay amount={usage} erc20={erc20} usdValue={usdValueUsage} />
    },
    header: ({ column }) => <SortButton column={column}>Usage</SortButton>,
    sortingFn: (rowA, rowB) => (rowB.original.usdValueUsage || 0) - (rowA.original.usdValueUsage || 0),
  },
  {
    accessorKey: 'actions',
    cell: () => (
      <div className="flex justify-end">
        <Button emphasis="medium">Add more</Button>
      </div>
    ),
    header: () => null,
  },
]
