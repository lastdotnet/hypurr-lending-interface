import { sandboxDialogConfig } from '@/features/dialogs/sandbox/SandboxDialog'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useSwitchChain } from 'wagmi'
import { useOpenDialog } from '../state/dialogs'
import { useAccount } from '@/domain/hooks/useAccount'
export interface UseUnsupportedChainResult {
  isGuestMode: boolean
  openConnectModal: () => void
  openSandboxModal: () => void
  switchChain: (chainId: number) => void
}

export function useUnsupportedChain(): UseUnsupportedChainResult {
  const openDialog = useOpenDialog()
  const account = useAccount()
  const { setShowAuthFlow } = useDynamicContext()

  const { switchChain } = useSwitchChain()

  function openSandboxModal(): void {
    openDialog(sandboxDialogConfig, { mode: 'ephemeral' } as const)
  }

  return {
    isGuestMode: !!account,
    openConnectModal: () => setShowAuthFlow(true),
    openSandboxModal,
    switchChain: (chainId: number) => switchChain({ chainId }),
  }
}
