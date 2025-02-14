import { DialogActions, DialogContainer, DialogContent, DialogHeader, DialogTitle } from '@/astaria/components/Dialog'
import { SwitchChainButton } from '@/astaria/components/SwitchChainButton'
import { DEFAULT_CHAIN } from '@/astaria/constants/chains'

export const UnsupportedChainDialog = () => (
  <DialogContainer>
    <DialogHeader>
      <DialogTitle>Unsupported chain</DialogTitle>
    </DialogHeader>
    <DialogContent>
      <div>Please connect to a supported chain to use this feature.</div>
    </DialogContent>
    <DialogActions>
      <SwitchChainButton
        chainId={DEFAULT_CHAIN.id}
        className="border-b-0 border-l-0 border-r-0"
        fullWidth
        rounded="dialog"
      />
    </DialogActions>
  </DialogContainer>
)
