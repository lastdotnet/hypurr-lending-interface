import { useMutation } from '@tanstack/react-query'

export const useSubscribeToNewsLetter = () =>
  useMutation({
    mutationFn: async (email: string) => {
      const result = await fetch(`/api/subscribe-email?email=${email}`)
      if (!result.ok) {
        throw new Error('Error subscribing to newsletter')
      }
      return result.json()
    },
    mutationKey: ['subscribe-to-newsletter'],
  })
