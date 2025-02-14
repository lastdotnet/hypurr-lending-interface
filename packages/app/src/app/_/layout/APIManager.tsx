'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

/**
 * This component updates the SDK config when the network changes.
 */
export function APIManager() {
  const queryClient = useQueryClient()

  useEffect(() => {
    // Invalidate all queries when the network changes
    queryClient.clear()
  }, [queryClient])

  return null
}
