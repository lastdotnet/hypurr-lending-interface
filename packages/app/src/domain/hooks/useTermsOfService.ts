import { useStore } from '../state'
import { CheckedAddress } from '../types/CheckedAddress'
import { UseTermsOfServiceResults } from '../state/compliance'

export function useTermsOfService(): UseTermsOfServiceResults {
  const { agreedToToSAdresses, addAgreedToToSAddress } = useStore((state) => state.compliance)

  return {
    agreedToTermsOfService: (address: CheckedAddress) => agreedToToSAdresses.some((a) => a === address),
    saveAgreedToTermsOfService: addAgreedToToSAddress,
  }
}
