import { CommonDialogProps, DialogConfig } from '@/features/dialogs/common/types'
import { useStore } from '@/domain/state/index'

export interface DialogSlice<P = {}> {
  dialogs: {
    openedDialog?: {
      config: DialogConfig<P & CommonDialogProps>
      props: P
    }
    openDialog: (config: DialogConfig<P & CommonDialogProps>, props: P) => void
    closeDialog: () => void
  }
}

export type OpenDialogFunction = <P>(dialog: DialogConfig<P & CommonDialogProps>, props: P) => void
export function useOpenDialog(): OpenDialogFunction {
  const openDialog = useStore((state) => state.dialogs.openDialog)
  return openDialog as OpenDialogFunction
}

export function useCloseDialog(): () => void {
  const closeDialog = useStore((state) => state.dialogs.closeDialog)
  return closeDialog
}
