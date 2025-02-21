'use server'

import { type Address, encodeAbiParameters, zeroAddress } from 'viem'

import { type ChainId } from 'chains'
import { getNowInSecondsBigInt } from 'common'

import { getTypedData } from '@/app/api/_/getTypedData'
import { getAccountNonce } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getAccountNonce'
import { getCaveatLoan } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getCaveatLoan'
import {
  getDeadline,
  getEndTime,
} from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getDeadline'
import { getUnsignedCaveat } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getUnsignedCaveat'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { type BorrowIntentRequest } from '@/astaria/types-internal/intent-schemas'
import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'
import { generateSalt } from '@/astaria/utils/generateSalt'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { type Caveat } from 'sdk'
import { V1BorrowerDetailsStructABI } from 'sdk/abi/V1BorrowerDetailsStructABI'

const convertBorrowIntentRequestToCaveats = ({
  borrower,
  borrowIntentRequest: { apy, borrow, borrowMaxAmount, borrowMinAmount, collateral },
  chainId,
  endTime,
}: {
  borrowIntentRequest: BorrowIntentRequest
  borrower: Address
  chainId: ChainId
  endTime: bigint
}): Caveat => {
  const data = encodeAbiParameters(
    [V1BorrowerDetailsStructABI],
    [
      {
        endTime: endTime - TRANSMIT_INTENT_PARAMS.endTimeBuffer,
        loan: getCaveatLoan({
          apy,
          borrow: { ...borrow, amount: borrowMinAmount },
          borrower,
          chainId,
          collateral,
          issuer: zeroAddress,
        }),
        maxAmount: borrowMaxAmount,
        minAmount: borrowMinAmount,
        startRate: TRANSMIT_INTENT_PARAMS.startRate,
        startTime: getNowInSecondsBigInt(),
      },
    ],
  )

  return {
    data,
    enforcer: getContractAddress({
      chainId,
      contractName: Contracts.V1BorrowerEnforcer,
    }),
  }
}

// Borrow intents always single use
const singleUse = true

export const getBorrowIntentSignaturePayload = async ({
  borrower,
  borrowIntentRequest,
  chainId,
}: {
  borrowIntentRequest: BorrowIntentRequest
  borrower: Address
  chainId: ChainId
}) => {
  const deadline = getDeadline()
  const endTime = getEndTime()
  const salt = generateSalt()
  const caveat = convertBorrowIntentRequestToCaveats({
    borrower,
    borrowIntentRequest,
    chainId,
    endTime,
  })
  const accountNonce = await getAccountNonce({ address: borrower, chainId })
  const typedData = getTypedData({
    account: borrower,
    accountNonce,
    caveats: [caveat],
    chainId,
    deadline,
    salt: `0x${Buffer.from(salt).toString('hex')}`,
    singleUse,
  })
  const unsignedCaveat = getUnsignedCaveat({ singleUse, typedData })

  return {
    typedData,
    unsignedCaveat,
  }
}
