'use server'

import { type Address, encodeAbiParameters, zeroAddress } from 'viem'

import { type ChainId } from 'chains'

import { getTypedData } from '@/app/api/_/getTypedData'
import { getAccountNonce } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getAccountNonce'
import { getCaveatLoan } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getCaveatLoan'
import { getDeadline } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getDeadline'
import { getUnsignedCaveat } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getUnsignedCaveat'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { type LendIntentRequest } from '@/astaria/types-internal/intent-schemas'
import { generateSalt } from '@/astaria/utils/generateSalt'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { type Caveat } from 'sdk'
import { V1LenderDetailsStructABI } from 'sdk/abi/V1LenderDetailsStructABI'

const convertLendIntentRequestToCaveats = ({
  chainId,
  lender,
  lendIntentRequest: { apy, borrow, borrowMaxAmount, borrowMinAmount, collateral },
}: {
  chainId: ChainId
  lendIntentRequest: LendIntentRequest
  lender: Address
}): Caveat => {
  const data = encodeAbiParameters(
    [V1LenderDetailsStructABI],
    [
      {
        loan: getCaveatLoan({
          apy,
          borrow: { ...borrow, amount: borrowMaxAmount },
          borrower: zeroAddress,
          chainId,
          collateral,
          issuer: lender,
        }),
        //should be true for now, until we start supporting collection offers for nfts
        matchIdentifier: true,
        minDebtAmount: borrowMinAmount,
      },
    ],
  )

  return {
    data,
    enforcer: getContractAddress({
      chainId,
      contractName: Contracts.V1LenderEnforcer, //still no address/deployment?
    }),
  }
}

export const getLendIntentSignaturePayload = async ({
  chainId,
  lender,
  lendIntentRequest,
}: {
  chainId: ChainId
  lendIntentRequest: LendIntentRequest
  lender: Address
}) => {
  const deadline = getDeadline()
  const salt = generateSalt()
  const caveat = convertLendIntentRequestToCaveats({
    chainId,
    lender,
    lendIntentRequest,
  })
  const accountNonce = await getAccountNonce({ address: lender, chainId })
  const typedData = getTypedData({
    account: lender,
    accountNonce,
    caveats: [caveat],
    chainId,
    deadline,
    salt: `0x${Buffer.from(salt).toString('hex')}`,
    singleUse: !lendIntentRequest.repeatFill,
  })
  const unsignedCaveat = getUnsignedCaveat({
    singleUse: !lendIntentRequest.repeatFill,
    typedData,
  })

  return {
    typedData,
    unsignedCaveat,
  }
}
