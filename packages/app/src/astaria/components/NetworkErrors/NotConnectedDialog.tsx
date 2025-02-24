import { ConnectButton } from '@/astaria/components/ConnectButton'
import { DialogActions, DialogContainer, DialogContent, DialogHeader, DialogTitle } from '@/astaria/components/Dialog'

export const NotConnectedDialog = () => (
  <DialogContainer>
    <DialogHeader>
      <DialogTitle>Not connected</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <div>Please connect your wallet to use this feature.</div>
    </DialogContent>
    <DialogActions>
      <ConnectButton className="border-r-0 border-b-0 border-l-0" fullWidth rounded="dialog" />
    </DialogActions>
  </DialogContainer>
)
