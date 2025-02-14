'use client'

import { useAccount } from 'wagmi'

import { useLoans } from '@/app/loans/_/useLoans/useLoans'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'

export const LoansCount = () => {
  const { address } = useAccount()
  const { loans } = useLoans({ address })

  if (!loans || (loans && loans.length === 0)) {
    return null
  }

  return (
    <TextLink href={ROUTES.LOANS}>
      {loans.length} {loans.length === 1 ? 'loan' : 'loans'}
    </TextLink>
  )
}
