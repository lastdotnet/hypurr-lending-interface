'use server'

import { z } from 'zod'

import { ChainIdSchema } from 'chains'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { prepFunctionData } from '@/app/api/_/prepFunctionData'
import { BadRequestError, InternalServerError } from '@/app/api/server-error'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { StarportLoan } from 'indexer/model'
import { StarportLoanSchema } from 'sdk'
import { AstariaV1StatusABI } from 'sdk/abi/AstariaV1StatusABI'

const GetRecallTransactionParametersSchema = z.object({
  chainId: ChainIdSchema,
  loanId: z.string(),
})
type GetRecallTransactionParameters = z.infer<typeof GetRecallTransactionParametersSchema>

export const getRecallTransaction = async ({ chainId, loanId }: GetRecallTransactionParameters) => {
  const dataSource = await initializeDataSource()

  const loanResult = StarportLoanSchema.safeParse(
    await dataSource.manager
      .getRepository(StarportLoan)
      .findOneByOrFail({ chainId, id: loanId })
      .catch((error: Error) => {
        throw new BadRequestError(`Loan with id ${loanId} not found, msg: ${error.message}`)
      }),
  )

  if (!loanResult.success) {
    throw new InternalServerError('Error parsing loan from database')
  }

  const { data: loan } = loanResult

  const functionName = 'recall'

  const transactionData = {
    abi: AstariaV1StatusABI,
    address: getContractAddress({
      chainId,
      contractName: Contracts.V1Status,
    }),
    args: [loan],
    functionName,
  }

  return prepFunctionData(transactionData)
}
