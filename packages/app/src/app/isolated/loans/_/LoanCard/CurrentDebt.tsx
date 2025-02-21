'use client'

import { useState } from 'react'

import { ONE_SECOND, calculateCompoundInterest, getNowInSecondsBigInt } from 'common'
import { useInterval } from 'usehooks-ts'

import { ERC20AmountDisplay } from '@/astaria/components/AssetDisplay/ERC20AmountDisplay'

import type { ERC20 } from 'assets'

export const calculateCurrentCompoundInterestForLoan = ({
  apy,
  erc20,
  startTime,
}: {
  apy: bigint | undefined
  erc20: ERC20 | undefined
  startTime: bigint | undefined
}) =>
  apy && erc20 && startTime
    ? calculateCompoundInterest({
        amount: erc20.amount,
        apy,
        decimals: erc20.decimals,
        delta: getNowInSecondsBigInt() - BigInt(startTime),
      })
    : 0n

export const CurrentDebt = ({
  apy,
  className,
  erc20,
  linkAssetToBlockExplorer,
  skeleton,
  startTime,
}: {
  apy: bigint | undefined
  className?: string
  erc20: ERC20 | undefined
  linkAssetToBlockExplorer?: boolean
  skeleton?: boolean
  startTime: bigint | undefined
}) => {
  const [currentInterest, setCurrentInterest] = useState(
    calculateCurrentCompoundInterestForLoan({
      apy,
      erc20,
      startTime,
    }),
  )

  useInterval(() => {
    setCurrentInterest(
      calculateCurrentCompoundInterestForLoan({
        apy,
        erc20,
        startTime,
      }),
    )
  }, ONE_SECOND)

  const currentDebt = erc20 ? erc20.amount + currentInterest : 0n

  return (
    <ERC20AmountDisplay
      className={className}
      erc20={
        erc20
          ? {
              ...erc20,
              amount: currentDebt,
            }
          : undefined
      }
      linkAssetToBlockExplorer={linkAssetToBlockExplorer}
      skeleton={skeleton}
      suppressHydrationWarning
    />
  )
}
