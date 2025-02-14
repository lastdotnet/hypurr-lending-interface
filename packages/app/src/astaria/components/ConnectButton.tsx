'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { type ReactNode, useState } from 'react'

import { useLocalStorage } from 'usehooks-ts'

import { AcceptTermsDialog } from '@/astaria/components/AcceptTermsDialog'
import { Button, type ButtonProps } from '@/astaria/components/Button'
import { ACCEPT_TERMS_LOCAL_STORAGE_KEY } from '@/astaria/config/config'
import { getDisplayAcceptTerms } from '@/astaria/utils/getDisplayAcceptTerms'

type ConnectButtonProps = Omit<ButtonProps, 'children'> & {
  children?: ReactNode
}

export const ConnectButton = ({ children, emphasis, size, ...rest }: ConnectButtonProps) => {
  const { open } = useWeb3Modal()
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
            open()
          }
        }}
        size={size}
        {...rest}
      >
        {children ?? 'Connect'}
      </Button>
      <AcceptTermsDialog onAcceptTerms={open} open={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}
