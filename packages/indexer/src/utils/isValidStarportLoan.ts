import { type GetEventArgs, type PublicClient, decodeFunctionResult, encodeDeployData } from 'viem'

import { getSecondsBigInt } from 'common'
import { CONTRACTS } from 'contracts-internal'

import { LoanValidatorFragment } from '../abi/LoanValidatorFragment'
import { type Events } from '../events.abi'

export type LoanOpenArgs = Required<GetEventArgs<typeof Events, 'Open', { IndexedOnly: false }>>

export async function isValidStarportLoan(publicClient: PublicClient, loan: LoanOpenArgs['loan']): Promise<boolean> {
  const deployData = encodeDeployData({
    ...LoanValidatorFragment,
    args: [
      {
        custodian: CONTRACTS.Custodian,
        expectedHoneymoon: getSecondsBigInt({ days: 1 }),
        expectedRecallWindow: getSecondsBigInt({ days: 1 }),
        loan,
        starport: CONTRACTS.Starport,
        validPricingModules: [CONTRACTS.V1Pricing],
        validSettlementModules: [CONTRACTS.V1Settlement],
        validStatusModules: [CONTRACTS.V1Status],
      },
    ],
  })

  const { data } = await publicClient.call({
    data: deployData,
  })

  if (!data) {
    throw new Error('HELPER_CALL_FAILED')
  }

  const errors = decodeFunctionResult({
    abi: LoanValidatorFragment.abi,
    data,
    functionName: 'returnType',
  })

  if (errors.length > 0) {
    console.warn(`StarportLoan ${JSON.stringify(loan)} is invalid: ${errors.join(';')}`)
    return false
  }

  return true
}
