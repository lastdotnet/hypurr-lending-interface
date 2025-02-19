'use client'

import { type ReactNode, useState } from 'react'

import { useLocalStorage } from 'usehooks-ts'

import { AcceptTermsDialog } from '@/astaria/components/AcceptTermsDialog'
import { Button, type ButtonProps } from '@/astaria/components/Button'
import { ACCEPT_TERMS_LOCAL_STORAGE_KEY } from '@/astaria/config/config'
import { getDisplayAcceptTerms } from '@/astaria/utils/getDisplayAcceptTerms'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

type ConnectButtonProps = Omit<ButtonProps, 'children'> & {
  children?: ReactNode
}

export const ConnectButton = ({ children, emphasis, size, ...rest }: ConnectButtonProps) => {
  const { setShowAuthFlow } = useDynamicContext()
  const [acceptedTerms] = useLocalStorage<boolean>(ACCEPT_TERMS_LOCAL_STORAGE_KEY, false)
  const displayAcceptTerms = getDisplayAcceptTerms(acceptedTerms)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Button
        emphasis={emphasis}
        onClick={() => {
          if (displayAcceptTerms) {
            setDialogOpen(true)
          } else {
            setShowAuthFlow(true)
          }
        }}
        size={size}
        {...rest}
      >
        {children ?? 'Connect'}
      </Button>
      <AcceptTermsDialog onAcceptTerms={() => setShowAuthFlow(true)} open={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}
