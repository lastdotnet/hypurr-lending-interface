import { API_REFERRAL } from '@/config/consts'
import { useMutation } from '@tanstack/react-query'

export interface CreateReferralResponse {
  chain_id: number
  code: string
  expires_at: string
  id: string
  last_used_at: string | null
  points_earned: number
  referred_id: string | null
  referrer_id: string
  status: 'Pending' | 'Active' | 'Expired' | 'Used'
  total_volume: string
  verified_at: string | null
}

interface CreateReferralRequest {
  referrer_id: string
}

const useCreateReferral = () => {
  return useMutation<CreateReferralResponse, Error, CreateReferralRequest>({
    mutationFn: async (data) => {
      const response = await fetch(`${API_REFERRAL}/referrals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create referral')
      }

      return response.json()
    },
  })
}

export default useCreateReferral
