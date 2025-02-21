'use server'

import { type Hex, decodeAbiParameters, encodeAbiParameters } from 'viem'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { prepFunctionData } from '@/app/api/_/prepFunctionData'
import { BadRequestError } from '@/app/api/server-error'
import { getCleanLendIntentFromContracts } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/cleanLendIntentFromContracts'
import { getEmptySignedCaveats } from '@/app/isolated/intents/_/getEmptySignedCaveats'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { type GETOriginationTransactionParameters } from '@/astaria/types-internal/origination-schemas'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { LendIntent } from 'indexer/model'
import { SignedCaveatSchema } from 'sdk'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'
import { StarportABI } from 'sdk/abi/StarportABI'
import { V1LenderDetailsStructABI } from 'sdk/abi/V1LenderDetailsStructABI'

export const getOriginationTransactionLend = async ({
  address,
  caveatId,
  chainId,
}: GETOriginationTransactionParameters) => {
  const dataSource = await initializeDataSource()

  const lendIntentFromAPI = await dataSource.manager.getRepository(LendIntent).findOne({
    relations: {
      signedCaveat: true,
    },
    where: { signedCaveat: { id: caveatId } },
  })
  if (!lendIntentFromAPI) {
    throw new BadRequestError(`LendIntent not found for id: ${caveatId}`)
  }

  const signedCaveat = lendIntentFromAPI?.signedCaveat
  if (!signedCaveat) {
    throw new BadRequestError(`Signed Caveat not found for id: ${caveatId}`)
  }

  const caveat = signedCaveat.caveats.at(0)
  if (!caveat) {
    throw new BadRequestError('Caveat at index 0 is undefined')
  }
  const caveatData = caveat.data as Hex

  const lenderDetails = getCleanLendIntentFromContracts(decodeAbiParameters([V1LenderDetailsStructABI], caveatData)[0])

  const pricingData = decodeAbiParameters([BasePricingDetailsStructABI], lenderDetails.loan.terms.pricingData)[0]

  const loan = lenderDetails.loan

  loan.borrower = address
  loan.terms.pricingData = encodeAbiParameters([BasePricingDetailsStructABI], [pricingData])

  const transactionData = {
    abi: StarportABI,
    address: getContractAddress({
      chainId,
      contractName: Contracts.Starport,
    }),
    args: [
      [],
      getEmptySignedCaveats(),
      {
        ...SignedCaveatSchema.parse(signedCaveat),
        signature: signedCaveat.signature as Hex,
        singleUse: signedCaveat.singleUse,
      },
      loan,
    ],
    functionName: 'originate',
  }

  return prepFunctionData(transactionData)
}
