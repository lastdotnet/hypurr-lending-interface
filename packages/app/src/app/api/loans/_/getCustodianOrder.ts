'use server'

import { type Address, zeroHash } from 'viem'

import { type ChainId } from 'chains'
import { getNowInSecondsBigInt } from 'common'
import { secondsInHour } from 'date-fns/constants'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { prepFunctionData } from '@/app/api/_/prepFunctionData'
import { BadRequestError, InternalServerError } from '@/app/api/server-error'
import { getRepayConsideration } from '@/app/isolated/loans/_/useLoans/getRepayConsideration'
import { emptyBytes } from '@/astaria/constants/empty'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { StarportLoan as IndexerStarportLoan } from 'indexer/model'
import {
  Action,
  type AdvancedOrder,
  type ReceivedItem,
  type StarportLoan,
  StarportLoanSchema,
  buildOrderParameters,
  encodeCommmand,
  receivedItemsToConsiderationItems,
  spentItemsToLendIntentItems,
} from 'sdk'
import { SeaportABI } from 'sdk/abi/SeaportABI'

type Fulfiller = Address | 'borrower' | 'issuer'
type GetCustodianOrderParams = {
  action: Action
  chainId: ChainId
  fulfiller: Fulfiller
  loanId: string
}

// Transaction simulations always happen on the latest confirmed block, which means
// we're dealing with a potential 12+ second lag on mainnet ethereum. By starting
// our Seaport orders 30 seconds in the past we can account for this.
const THIRTY_SECONDS_BUFFER = 30

export const getCustodianOrder = async ({ action, chainId, fulfiller, loanId }: GetCustodianOrderParams) => {
  const dataSource = await initializeDataSource()

  const loanResult = StarportLoanSchema.safeParse(
    await dataSource.manager
      .getRepository(IndexerStarportLoan)
      .findOneByOrFail({ chainId, id: loanId })
      .catch((error: Error) => {
        throw new BadRequestError(`StarportLoan with id ${loanId} not found, msg: ${error.message}`)
      }),
  )

  if (!loanResult.success) {
    throw new InternalServerError('Error parsing loan from database')
  }

  const { data: starportLoan } = loanResult

  const command = encodeCommmand(action, starportLoan)

  const fulfillerAddress = resolveFulfiller(fulfiller, starportLoan)

  const now = getNowInSecondsBigInt()

  const consideration = action === Action.Repayment ? getFlattenedRepayConsideration({ now, starportLoan }) : []

  const startTime = now - BigInt(THIRTY_SECONDS_BUFFER)
  const endTime = startTime + BigInt(secondsInHour)

  const advancedOrder: AdvancedOrder = {
    denominator: 1n,
    extraData: command,
    numerator: 1n,
    parameters: buildOrderParameters(
      starportLoan.custodian,
      spentItemsToLendIntentItems(starportLoan.collateral),
      receivedItemsToConsiderationItems(consideration),
      startTime,
      endTime,
    ),
    signature: emptyBytes,
  }

  const functionName = 'fulfillAdvancedOrder'

  const transactionData = {
    abi: SeaportABI,
    address: getContractAddress({
      chainId,
      contractName: Contracts.Consideration,
    }), //Seaport
    args: [
      advancedOrder,
      [], //criteriaResolvers,
      zeroHash, //fulfillerConduitKey
      fulfillerAddress, //recipient
    ],
    functionName,
  }

  return {
    bufferedAmount: consideration.reduce((acc: bigint, item: ReceivedItem) => acc + item.amount, 0n),
    functionData: prepFunctionData(transactionData),
  }
}

function getFlattenedRepayConsideration({
  now,
  starportLoan,
}: {
  now: bigint
  starportLoan: StarportLoan
}) {
  const { carryConsideration, repayConsideration } = getRepayConsideration({
    delta: now - starportLoan.start,
    starportLoan,
  })
  return [...repayConsideration, ...carryConsideration]
}

function resolveFulfiller(fulfiller: Fulfiller, starportLoan: StarportLoan): Address {
  if (fulfiller === 'borrower') {
    return starportLoan.borrower
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (fulfiller === 'issuer') {
    return starportLoan.issuer
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return fulfiller
  }
}
