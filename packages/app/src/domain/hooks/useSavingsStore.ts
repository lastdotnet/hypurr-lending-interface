import { useStore } from '../state'
import { UseSavingsStoreResult } from '../state/savings'

export function useSavingsStore(): UseSavingsStoreResult {
  const { confirmedWelcomeDialog, setConfirmedWelcomeDialog } = useStore((state) => state.savings)

  return {
    confirmedWelcomeDialog,
    saveConfirmedWelcomeDialog: setConfirmedWelcomeDialog,
  }
}
