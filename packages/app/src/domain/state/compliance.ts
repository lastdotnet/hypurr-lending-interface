import { StateCreator } from 'zustand'

import { StoreState } from '.'
import { CheckedAddress } from '../types/CheckedAddress'

export interface Compliance {
  agreedToToSAdresses: CheckedAddress[]
  addAgreedToToSAddress: (address: CheckedAddress) => void
}

export interface ComplianceSlice {
  compliance: Compliance
}

// eslint-disable-next-line func-style
export const initComplianceSlice: StateCreator<StoreState, [], [], ComplianceSlice> = (set) => ({
  compliance: {
    agreedToToSAdresses: [],
    addAgreedToToSAddress: (address: CheckedAddress) =>
      set((state) => ({
        compliance: { ...state.compliance, agreedToToSAdresses: [...state.compliance.agreedToToSAdresses, address] },
      })),
  },
})

export interface UseTermsOfServiceResults {
  agreedToTermsOfService: (address: CheckedAddress) => boolean
  saveAgreedToTermsOfService: (address: CheckedAddress) => void
}

export interface PersistedComplianceSlice {
  compliance: {
    agreedToToSAdresses: CheckedAddress[]
  }
}
export function persistComplianceSlice(state: StoreState): PersistedComplianceSlice {
  return {
    compliance: {
      agreedToToSAdresses: state.compliance.agreedToToSAdresses,
    },
  }
}
