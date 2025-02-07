import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { captureError } from '@/utils/sentry'

import { ErrorView } from './ErrorView'

interface UnknownErrorProps {
  error: any
  fullScreen?: boolean
}

export function UnknownError({ error, fullScreen }: UnknownErrorProps) {
  const router = useRouter()

  useEffect(() => {
    captureError(error)
  }, [error])

  return <ErrorView errorMessage={error.message ?? ''} onReload={() => router.refresh()} fullScreen={fullScreen} />
}
