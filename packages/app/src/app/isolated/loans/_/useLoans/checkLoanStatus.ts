import { decodeAbiParameters } from 'viem'

import { getNowInSecondsBigInt } from 'common'

import { type Recall } from '@/astaria/types-internal/loan-schemas'

import { type StarportLoan } from 'sdk'
import { BaseRecallDetailsStructABI } from 'sdk/abi/BaseRecallDetailsStructABI'

export const getRecallHoneymoonEnd = (starportLoan: StarportLoan | null) => {
  if (starportLoan) {
    const baseRecallDetails = decodeAbiParameters(
      [BaseRecallDetailsStructABI],
      starportLoan.terms.statusData as `0x${string}`,
    )[0]

    return baseRecallDetails.honeymoon + starportLoan.start
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    // @ts-ignore
    throw new Error('LOAN_INVALID', {
      cause: 'Missing Starport Loan for Loan',
    })
  }
}

export const getIsClaimable = (recall: Recall | null) => {
  if (recall) {
    return getNowInSecondsBigInt() > recall.end
  }

  return false
}
