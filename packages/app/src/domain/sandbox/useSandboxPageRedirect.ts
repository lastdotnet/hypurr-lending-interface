'use client'

import { useSandboxState } from '@/domain/sandbox/useSandboxState'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useConfig } from 'wagmi'
import { watchChainId } from 'wagmi/actions'

interface UseSandboxPageRedirectParams {
  basePath: string
  fallbackPath: string
  basePathParams?: {
    [key: string]: unknown
    chainId?: number
  }
}

export function useSandboxPageRedirect({ basePath, fallbackPath, basePathParams }: UseSandboxPageRedirectParams): void {
  const config = useConfig()
  const { sandboxChainId, originChainId } = useSandboxState()
  const router = useRouter()

  useEffect(() => {
    const unwatch = watchChainId(config, {
      onChange(chainId, prevChainId) {
        if (chainId === sandboxChainId && prevChainId === originChainId && prevChainId === basePathParams?.chainId) {
          const queryParams = new URLSearchParams({ ...basePathParams, chainId: sandboxChainId.toString() } as Record<
            string,
            string
          >)
          router.push(`${basePath}?${queryParams.toString()}`)
          return
        }

        router.push(fallbackPath)
      },
    })

    return unwatch
  }, [config, sandboxChainId, originChainId, basePath, fallbackPath, router, basePathParams])
}
