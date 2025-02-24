import { useQuery } from '@tanstack/react-query'

import { type Address } from 'viem'

import hash from 'object-hash'
import { useIsClient } from 'usehooks-ts'

import { getBorrowIntentSignaturePayload } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getBorrowIntentSignaturePayload'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type BorrowIntentRequest } from '@/astaria/types-internal/intent-schemas'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { type Asset, type ERC20 } from 'assets'

const DOUBLE_BIGINT = 2n
const double = (amount: bigint) => amount * DOUBLE_BIGINT

export const useBorrowIntentRequest = ({
  apy,
  borrow,
  collateral,
  enabled,
}: {
  apy: bigint
  borrow: ERC20
  collateral: Asset
  enabled: boolean
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()

  const borrowIntentRequest: BorrowIntentRequest = {
    apy,
    borrow,
    borrowMaxAmount: double(borrow.amount),
    borrowMinAmount: borrow.amount,
    collateral,
  }

  const { data: borrowIntentPayload, ...rest } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && enabled && !!address && !!chainId,
    // getBorrowIntentSignaturePayload uses current time and random salt. Disable cache for this query
    gcTime: 0,
    queryFn: () =>
      getBorrowIntentSignaturePayload({
        borrower: address as Address,
        borrowIntentRequest,
        chainId,
      }),
    queryKey: [
      'transmit-intent',
      {
        borrower: address,
        chainId,
        intentRequest: hash(borrowIntentRequest),
      },
    ],
  })

  return { borrowIntentPayload, ...rest }
}
