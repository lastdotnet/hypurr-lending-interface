import { StateCreator } from 'zustand'
import { StoreState } from './index'
import { DialogSlice } from './dialogs'

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
