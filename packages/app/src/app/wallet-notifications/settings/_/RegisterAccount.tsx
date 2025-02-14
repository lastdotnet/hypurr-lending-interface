'use client'

import { IconCheck, IconX } from '@tabler/icons-react'
import { usePrepareRegistration, useRegister, useSubscribe } from '@web3inbox/react'
import { type Dispatch, type SetStateAction } from 'react'

import { useSignMessage } from 'wagmi'

import { Button } from '@/astaria/components/Button'
import {
  Dialog,
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/astaria/components/Dialog'
import { useToast } from '@/astaria/components/Toast/useToast'
import { ROUTES } from '@/astaria/constants/routes'

export const RegisterAccount = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { toast } = useToast()
  const { isLoading: isRegistering, register } = useRegister()
  const { isLoading: isSubscribing, subscribe } = useSubscribe()
  const { signMessageAsync } = useSignMessage()
  const { prepareRegistration } = usePrepareRegistration()

  const handleRegistration = async () => {
    try {
      const { message, registerParams } = await prepareRegistration()
      const signature = await signMessageAsync({ message })
      await register({ registerParams, signature })
      await subscribe()
      window.location.href = ROUTES.WALLET_NOTIFICATIONS_DASHBOARD
      toast({
        description: 'You are now registered.',
        icon: <IconCheck />,
        title: 'Registered',
      })
    } catch (registerIdentityError) {
      toast({
        description: registerIdentityError as string,
        icon: <IconX />,
        title: 'Not registered',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Register account</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p>
            <strong>Sign message to register account</strong>
          </p>
          <p className="text-sm">
            By signing this message you authorize the app to manage notifications coming from WalletConnect Notify on
            your behalf.
          </p>
          <p className="text-sm">
            You can update what types of notifications you’d like to receive at any time through the toggles on the
            notifications settings page.
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            className="border-b-0 border-l-0 border-r-0"
            disabled={isRegistering || isSubscribing}
            fullWidth
            onClick={handleRegistration}
          >
            Sign and register
          </Button>
        </DialogActions>
      </DialogContainer>
    </Dialog>
  )
}
