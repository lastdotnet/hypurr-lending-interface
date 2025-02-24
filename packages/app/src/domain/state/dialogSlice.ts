import { StateCreator } from 'zustand'
import { DialogSlice } from './dialogs'
import { StoreState } from './index'

// eslint-disable-next-line func-style
export const initDialogSlice: StateCreator<StoreState, [], [], DialogSlice> = (set) => ({
  dialogs: {
    openedDialog: undefined,
    openDialog: (config, props) => {
      set((state: { dialogs: any }) => ({ dialogs: { ...state.dialogs, openedDialog: { config, props } } }))
    },
    closeDialog: () => {
      set((state: { dialogs: any }) => ({ dialogs: { ...state.dialogs, openedDialog: undefined } }))
    },
  },
})
