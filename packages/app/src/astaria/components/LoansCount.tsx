'use client'

import { useLoans } from '@/app/loans/_/useLoans/useLoans'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

export const LoansCount = () => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

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
