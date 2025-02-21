import { type Dispatch, type SetStateAction, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { ERC20AmountDisplay } from '@/astaria/components/AssetDisplay/ERC20AmountDisplay'
import { Button } from '@/astaria/components/Button'
import {
  Dialog,
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/astaria/components/Dialog'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'

import { type ERC20 } from 'assets'

export const WithdrawFundsInner = withChainCheckDialog(
  ({
    dialogOpen,
    erc20,
    hasVaultUsage,
    inView,
    setDialogOpen,
    setWithdrawInProgress,
  }: {
    dialogOpen: boolean
    erc20: ERC20
    hasVaultUsage: boolean
    inView: boolean
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    setWithdrawInProgress: Dispatch<SetStateAction<boolean>>
  }) => {
    // eslint-disable-next-line no-console
    console.log('WithdrawFundsInner', dialogOpen, inView) // TODO: use in react-query
    return (
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Withdraw funds</DialogTitle>
        </DialogHeader>
        <DialogContent className="space-y-4">
          <p>{hasVaultUsage ? 'After loan settlement you will withdraw' : 'You are withdrawing'}</p>
          {hasVaultUsage ? (
            <p className="text-sm italic">
              Your outstanding loans using vault funds will be recalled to find new lenders. Once this is complete,
              funds will be returned to your wallet.
            </p>
          ) : null}
          <ERC20AmountDisplay erc20={erc20} />
        </DialogContent>
        <DialogActions>
          <Button
            className="border-b-0 border-l-0 border-r-0"
            fullWidth
            onClick={() => {
              setWithdrawInProgress(true)
              setDialogOpen(false)
            }}
            rounded="dialog"
          >
            Withdraw funds
          </Button>
        </DialogActions>
      </DialogContainer>
    )
  },
)

export const WithdrawFunds = ({
  erc20,
  hasVaultUsage,
  setWithdrawInProgress,
  withdrawInProgress,
}: {
  erc20: ERC20
  hasVaultUsage: boolean
  setWithdrawInProgress: Dispatch<SetStateAction<boolean>>
  withdrawInProgress: boolean
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { inView, ref } = useInView()

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button ref={ref} disabled={withdrawInProgress} fullWidth>
          {hasVaultUsage ? 'Settle loans and withdraw' : 'Withdraw all assets'}
        </Button>
      </DialogTrigger>
      <WithdrawFundsInner
        dialogOpen={dialogOpen}
        erc20={erc20}
        hasVaultUsage={hasVaultUsage}
        inView={inView}
        setDialogOpen={setDialogOpen}
        setWithdrawInProgress={setWithdrawInProgress}
      />
    </Dialog>
  )
}
