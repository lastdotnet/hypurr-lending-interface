import { Suspense } from 'react'

import { Debug } from '@/features/debug'
import { DialogDispatcherContainer } from '@/features/dialogs/dispatcher/DialogDispatcherContainer'
import { ErrorBoundary } from '@/features/errors'
import { ErrorFallback } from '@/features/errors/ErrorFallback'
import { FallbackLayout } from '@/ui/layouts/FallbackLayout'
import { AppLayout } from '@/ui/layouts/app-layout/AppLayout'

export function RootRoute() {
  return (
    <Suspense fallback={<FallbackLayout />}>
      <AppLayout>
        <ErrorBoundary fallback={ErrorFallback}>
          <DialogDispatcherContainer />
        </ErrorBoundary>
        {process.env.NEXT_PUBLIC_DEV_DEBUG === '1' && <Debug />}
      </AppLayout>
    </Suspense>
  )
}
