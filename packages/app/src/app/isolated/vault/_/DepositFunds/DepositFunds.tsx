'use client'

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'

import { zodResolver } from '@hookform/resolvers/zod'

import { DepositFields } from '@/app/isolated/vault/_/DepositFunds/DepositFields'
import { DepositFundsButton } from '@/app/isolated/vault/_/DepositFunds/DepositFundsButton'
import { Steps } from '@/app/isolated/vault/_/DepositFunds/Steps'
import {
  type DepositFundsFormSchema,
  depositFundsFormSchema,
} from '@/app/isolated/vault/_/DepositFunds/depositFundsFormSchema'
import { useAllowanceDeposit } from '@/app/isolated/vault/_/DepositFunds/useAllowanceDeposit'
import { useDefaultDepositAsset } from '@/app/isolated/vault/_/DepositFunds/useDefaultDepositAsset'
import { useDeployVault } from '@/app/isolated/vault/_/DepositFunds/useDeployVault'
import { Button } from '@/astaria/components/Button'
import {
  Dialog,
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogError,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/astaria/components/Dialog'
import { Form } from '@/astaria/components/Form'
import { useChainId } from '@/astaria/hooks/useChainId'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'

import { getERC20TokenBySymbol } from 'assets'

export const DepositFundsDialogInner = withChainCheckDialog(
  ({
    dialogOpen,
    inView,
    setDialogOpen,
  }: {
    dialogOpen: boolean
    inView: boolean
    setDialogOpen: Dispatch<SetStateAction<boolean>>
  }) => {
    const chainId = useChainId()
    const USDC = getERC20TokenBySymbol({
      chainId,
      symbol: 'USDC',
    })
    const isConfirmingDeposit = false // TODO
    const isFinishedDeposit = false // TODO
    const isLoadingDeposit = false // TODO
    const errorDeposit = undefined // TODO

    const { deployVault, errorDeployVault, isConfirmingDeployVault, isFinishedDeployVault, isLoadingDeployVault } =
      useDeployVault()

    const { depositAsset: depositAssetDefault } = useDefaultDepositAsset()
    const form = useForm<DepositFundsFormSchema>({
      defaultValues: {
        depositAsset: depositAssetDefault,
      },
      mode: 'onTouched',
      resolver: zodResolver(depositFundsFormSchema),
    })
    const { control, handleSubmit, setValue } = form
    const depositAsset = useWatch({
      control,
      name: 'depositAsset',
    })

    const { approve, errorApprove, isConfirmingApprove, isFinishedApprove, isLoadingApprove } = useAllowanceDeposit({
      enabled: isFinishedDeployVault && (inView || dialogOpen),
      erc20Asset: { ...USDC, amount: 0n },
      showError: dialogOpen,
    })

    // TODO: make this less dirty
    useEffect(() => {
      if (
        depositAsset.usdValue === undefined &&
        depositAssetDefault.usdValue &&
        depositAssetDefault.address === depositAsset.address
      ) {
        setValue('depositAsset', depositAssetDefault)
      }
    }, [depositAsset, depositAssetDefault, setValue])

    const onSubmit: SubmitHandler<DepositFundsFormSchema> = () => {
      if (isFinishedApprove) {
        // TODO: await transaction to deposit
        setDialogOpen(false) // TODO: do in the transaction instead of a useState
      }
    }

    const error = errorDeposit || errorApprove || errorDeployVault // TODO

    return (
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Deposit funds</DialogTitle>
        </DialogHeader>
        <Steps
          erc20Asset={USDC}
          isConfirmingApprove={isConfirmingApprove}
          isConfirmingDeployVault={isConfirmingDeployVault}
          isConfirmingDeposit={isConfirmingDeposit}
          isFinishedDeployVault={isFinishedDeployVault}
          isLoadingApprove={isLoadingApprove}
          isLoadingDeployVault={isLoadingDeployVault}
          isLoadingDeposit={isLoadingDeposit}
        />{' '}
        <Form {...form}>
          <form className="space-y-2" id="depositForm" noValidate onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              {(() => {
                if (!isFinishedDeployVault) {
                  return (
                    <p className="my-10 text-center italic">
                      This is a one-time transaction to deploy your vault on-chain so you can deposit funds to it.
                    </p>
                  )
                }
                if (!isFinishedDeposit) {
                  return (
                    <div className="flex flex-col items-center gap-5">
                      <DepositFields />
                      <p className="text-center italic">Support for other tokens coming soon</p>
                    </div>
                  )
                }
                return null
              })()}
              {error ? <DialogError error={error} /> : null}
            </DialogContent>
            <DialogActions>
              <DepositFundsButton
                approve={approve}
                deployVault={deployVault}
                erc20Asset={USDC}
                isConfirmingApprove={isConfirmingApprove}
                isConfirmingDeployVault={isConfirmingDeployVault}
                isConfirmingDeposit={isConfirmingDeposit}
                isFinishedApprove={isFinishedApprove}
                isFinishedDeployVault={isFinishedDeployVault}
                isFinishedDeposit={isFinishedDeposit}
                isLoadingApprove={isLoadingApprove}
                isLoadingDeployVault={isLoadingDeployVault}
                isLoadingDeposit={isLoadingDeposit}
              />
            </DialogActions>
          </form>
        </Form>
      </DialogContainer>
    )
  },
)

export const DepositFunds = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { inView, ref } = useInView()

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button ref={ref}>Deposit funds to vault</Button>
      </DialogTrigger>
      <DepositFundsDialogInner dialogOpen={dialogOpen} inView={inView} setDialogOpen={setDialogOpen} />
    </Dialog>
  )
}
