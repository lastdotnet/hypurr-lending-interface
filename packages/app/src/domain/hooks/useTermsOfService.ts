import { useStore } from '../state'
import { UseTermsOfServiceResults } from '../state/compliance'
import { CheckedAddress } from '../types/CheckedAddress'

export function useTermsOfService(): UseTermsOfServiceResults {
  const { agreedToToSAdresses, addAgreedToToSAddress } = useStore((state) => state.compliance)

  return {
    agreedToTermsOfService: (address: CheckedAddress) => agreedToToSAdresses.some((a) => a === address),
    saveAgreedToTermsOfService: addAgreedToToSAddress,
  }
}
