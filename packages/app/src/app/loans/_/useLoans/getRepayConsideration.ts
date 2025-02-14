import { decodeAbiParameters } from 'viem'

import { calculateCompoundInterest, getSecondsBigInt, multiply } from 'common'

import type { ReceivedItem, SpentItem, StarportLoan } from 'sdk'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'

// Give the user 15 minutes to complete the transaction
const BUFFER_TO_FINISH_TRANSACTION = 15

export const getRepayConsideration = ({
  delta,
  starportLoan: { debt, issuer, originator, terms },
}: {
  delta: bigint
  starportLoan: StarportLoan
}) => {
  const { carryRate, decimals, rate: apy } = decodeAbiParameters([BasePricingDetailsStructABI], terms.pricingData)[0]

  const adjustedDelta = delta + getSecondsBigInt({ minutes: BUFFER_TO_FINISH_TRANSACTION })

  const repayConsideration: ReceivedItem[] = []
  const carryConsideration: ReceivedItem[] = []

  // biome-ignore lint/complexity/noForEach: <explanation>
  debt.forEach((item: SpentItem) => {
    const interest =
      calculateCompoundInterest({
        amount: item.amount,
        apy,
        decimals: Number(decimals),
        delta: adjustedDelta,
      }) || 1n

    if (issuer !== originator) {
      const carryAmount = multiply({
        a: interest,
        b: carryRate,
        decimals: Number(decimals),
      })

      if (carryAmount !== 0n) {
        repayConsideration.push({
          ...item,
          amount: item.amount + interest - carryAmount,
          recipient: issuer,
        })

        carryConsideration.push({
          ...item,
          amount: carryAmount,
          recipient: originator,
        })
      }
      return
    }
    repayConsideration.push({
      ...item,
      amount: item.amount + interest,
      recipient: issuer,
    })
  })

  return { carryConsideration, repayConsideration }
}
