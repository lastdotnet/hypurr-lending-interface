import { useQuery } from '@tanstack/react-query'

import { type Address } from 'viem'

import hash from 'object-hash'
import { useIsClient } from 'usehooks-ts'

import { getLendIntentSignaturePayload } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getLendIntentSignaturePayload'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type LendIntentRequest } from '@/astaria/types-internal/intent-schemas'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { type Asset, type ERC20 } from 'assets'

const DOUBLE_BIGINT = 2n
const half = (amount: bigint) => amount / DOUBLE_BIGINT

export const useLendIntentRequest = ({
  apy,
  borrow,
  collateral,
  enabled,
  repeatFill,
}: {
  apy: bigint
  borrow: ERC20
  collateral: Asset
  enabled: boolean
  repeatFill: boolean
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()

  const lendIntentRequest: LendIntentRequest = {
    apy,
    borrow,
    borrowMaxAmount: borrow.amount,
    borrowMinAmount: half(borrow.amount),
    collateral,
    repeatFill,
  }

  const { data: lendIntentPayload, ...rest } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && enabled && !!address && !!chainId,
    // getLendIntentSignaturePayload uses current time and random salt. Disable cache for this query
    gcTime: 0,
    queryFn: () =>
      getLendIntentSignaturePayload({
        chainId,
        lender: address as Address,
        lendIntentRequest,
      }),
    queryKey: [
      'transmit-intent',
      {
        borrower: address,
        chainId,
        lendIntentRequest: hash(lendIntentRequest),
      },
    ],
  })

  return { lendIntentPayload, ...rest }
}
