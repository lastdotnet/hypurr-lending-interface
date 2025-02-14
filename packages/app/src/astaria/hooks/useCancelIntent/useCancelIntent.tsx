import { pad, zeroHash } from 'viem'

import { HexSchema } from 'common'

import { useSaltByIntentId } from '@/astaria/hooks/useCancelIntent/useSaltByIntentId'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'
import { getContractAddress } from '@/astaria/utils/getContractAddress'
import { isLendIntent } from '@/astaria/utils/intentStates'

import { StarportABI } from 'sdk/abi/StarportABI'

export const useCancelIntent = ({
  enabled,
  intent,
  onConfirmed,
  showError,
}: {
  enabled: boolean
  intent: BorrowIntent | LendIntent
  onConfirmed?: () => void
  showError: boolean
}) => {
  const chainId = useChainId()
  const { salt } = useSaltByIntentId({
    enabled,
    id: intent?.id,
  })
  const parsedSalt = salt ? HexSchema.parse(salt) : zeroHash

  const askingAmount = formatCurrency({
    amount: intent?.borrow.amount || 0n,
    decimals: intent?.borrow.decimals,
    usdValue: intent?.borrow.usdValue,
  }).trigger

  const { writeContract: cancel, ...rest } = useSimulateAndWriteTransaction({
    enabled: enabled && Boolean(salt),
    onConfirmed: () => {
      onConfirmed?.()
    },
    showError,
    simulateData: {
      abi: StarportABI,
      address: getContractAddress({
        chainId,
        contractName: Contracts.Starport,
      }),
      args: [pad(parsedSalt, { size: 32 })],
      functionName: 'invalidateCaveatSalt',
    },
    title: `Cancel the ${isLendIntent(intent) ? 'lend intent' : 'borrow intent'} asking for ${askingAmount} ${intent?.borrow.symbol}`,
  })

  return { cancel, ...rest }
}
