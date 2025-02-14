'use server'

import { type Hex, decodeAbiParameters, encodeAbiParameters } from 'viem'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { prepFunctionData } from '@/app/api/_/prepFunctionData'
import { BadRequestError } from '@/app/api/server-error'
import { getCleanBorrowIntentFromContracts } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/cleanBorrowIntentFromContracts'
import { getEmptySignedCaveats } from '@/app/intents/_/getEmptySignedCaveats'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { type GETOriginationTransactionParameters } from '@/astaria/types-internal/origination-schemas'
import { getContractAddress } from '@/astaria/utils/getContractAddress'
import { getPublicClient } from '@/astaria/utils/getPublicClient'

import { BorrowIntent } from 'indexer/model'
import { SignedCaveatSchema } from 'sdk'
import { AstariaV1BorrowerEnforcerABI } from 'sdk/abi/AstariaV1BorrowerEnforcerABI'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'
import { StarportABI } from 'sdk/abi/StarportABI'
import { V1BorrowerDetailsStructABI } from 'sdk/abi/V1BorrowerDetailsStructABI'

export const getOriginationTransactionBorrow = async ({
  address,
  caveatId,
  chainId,
}: GETOriginationTransactionParameters) => {
  const publicClient = getPublicClient({ chainId })
  const dataSource = await initializeDataSource()

  const borrowIntentFromAPI = await dataSource.manager.getRepository(BorrowIntent).findOne({
    relations: {
      signedCaveat: true,
    },
    where: { signedCaveat: { id: caveatId } },
  })

  if (!borrowIntentFromAPI) {
    throw new BadRequestError(`BorrowIntent not found for id: ${caveatId}`)
  }

  const signedCaveat = borrowIntentFromAPI?.signedCaveat
  if (!signedCaveat) {
    throw new BadRequestError(`Signed Caveat not found for id: ${caveatId}`)
  }

  const caveat = signedCaveat.caveats.at(0)
  if (!caveat) {
    throw new BadRequestError('Caveat at index 0 is undefined')
  }
  const caveatData = caveat.data as Hex

  const borrowerDetails = getCleanBorrowIntentFromContracts(
    decodeAbiParameters([V1BorrowerDetailsStructABI], caveatData)[0],
  )

  const currentAPY = await publicClient.readContract({
    abi: AstariaV1BorrowerEnforcerABI,
    address: getContractAddress({
      chainId,
      contractName: Contracts.V1BorrowerEnforcer,
    }),
    args: [caveatData],
    functionName: 'locateCurrentRate',
  })

  const [pricingData] = decodeAbiParameters([BasePricingDetailsStructABI], borrowerDetails.loan.terms.pricingData)

  const loan = borrowerDetails.loan

  loan.issuer = address
  loan.debt[0].amount = borrowIntentFromAPI.minAmount
  loan.terms.pricingData = encodeAbiParameters(
    [BasePricingDetailsStructABI],
    [
      {
        ...pricingData,
        rate: currentAPY,
      },
    ],
  )

  const transactionData = {
    abi: StarportABI,
    address: getContractAddress({
      chainId,
      contractName: Contracts.Starport,
    }),
    args: [
      [],
      {
        ...SignedCaveatSchema.parse(signedCaveat),
        signature: signedCaveat.signature as Hex,
        singleUse: signedCaveat.singleUse,
      },
      getEmptySignedCaveats(),
      loan,
    ],
    functionName: 'originate',
  }

  return prepFunctionData(transactionData)
}
