'use client'

import { ErrorView } from '@/features/errors/ErrorView'
import { useEffect } from 'react'

export default function ErrorLayout({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorView onReload={() => reset()} fullScreen />
}
