'use client'

import { useCallback, useEffect, useState } from 'react'

import { useAuthenticateConnectedUser } from '@dynamic-labs/sdk-react-core'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useSocialAccounts } from '@dynamic-labs/sdk-react-core'
import { ProviderEnum } from '@dynamic-labs/types'
import { buttonVariants } from '@/ui/atoms/button/Button'
import { Button } from '@/ui/atoms/button/Button'
import { twitterFollowUrl } from '@/config/consts'
import { cn } from '@/ui/utils/style'
import { trackEvent } from '@/utils/fathom'

function ConnectXButtonGroup({ setHandle }: { setHandle: (handle: string) => void }) {
  const [following, setFollowing] = useState(false)
  const [followButtonClicked, setFollowButtonClicked] = useState(false)
  const [checkingIfFollowing, setCheckingIfFollowing] = useState(false)
  const [checkingError, setCheckingError] = useState(false)

  const { error, linkSocialAccount, isProcessing, isLinked, getLinkedAccountInformation } = useSocialAccounts()
  const { user } = useDynamicContext()
  const { authenticateUser, isAuthenticating } = useAuthenticateConnectedUser()
  const provider = ProviderEnum.Twitter as any
  const isXLinked = isLinked(provider)
  const connectedAccountInfo = getLinkedAccountInformation(provider)
  const verificationPending = isAuthenticating || isProcessing

  async function handleSignAndConnect() {
    if (!user) {
      await authenticateUser()
    }
    await linkSocialAccount(provider)
    trackEvent('initiate_sign_and_connect_x')
  }

  const checkIfFollowing = useCallback(async () => {
    if (!connectedAccountInfo?.username) {
      return
    }

    try {
      setCheckingIfFollowing(true)
      setCheckingError(false)

      const response = await fetch(`${twitterFollowUrl}/${connectedAccountInfo?.username}`)

      if (!response.ok) {
        throw new Error('Request to `verify-follow` failed')
      }

      const data = (await response.json()) as { isFollowing: boolean }

      setFollowing(data.isFollowing)
      if (data.isFollowing) {
        setHandle(connectedAccountInfo.username)
      }
    } catch (error) {
      console.error('Error checking if following:', error)
      setCheckingError(true)
    } finally {
      setCheckingIfFollowing(false)
    }
  }, [connectedAccountInfo?.username, setHandle])

  // Automatically check if following when the user refocuses the window
  // after opening link to profile
  const handleRefocus = useCallback(() => {
    if (!following && isXLinked && followButtonClicked && !verificationPending) {
      void checkIfFollowing()
      setFollowButtonClicked(false)
    }
  }, [checkIfFollowing, following, isXLinked, followButtonClicked, verificationPending])

  useEffect(() => {
    window.addEventListener('focus', handleRefocus)
    return () => {
      window.removeEventListener('focus', handleRefocus)
    }
  }, [handleRefocus])

  // Automatically check if following when the user connects their X account
  useEffect(() => {
    if (!following && isXLinked && !verificationPending) {
      void checkIfFollowing()
    }
  }, [checkIfFollowing, following, isXLinked, verificationPending])

  useEffect(() => {
    if (error) {
      console.error('Error linking X account:', error)
    }
  }, [error])

  if (following && isXLinked) {
    return <p className="rounded-lg bg-white/4 p-4 text-center font-medium">You are claiming 2X testnet HYPE!</p>
  }

  if (!user || !isXLinked) {
    return (
      <Button onClick={handleSignAndConnect} className="w-full" rounded="full">
        1. Sign and connect X - (2X HYPE boost)
      </Button>
    )
  }

  return (
    <div>
      {checkingIfFollowing || verificationPending ? (
        <p className="text-center text-sm italic opacity-80">Loading...</p>
      ) : (
        <div className="flex flex-col">
          <a
            href="https://x.com/hypurrfi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setFollowButtonClicked(true)}
            className={cn(buttonVariants({ variant: 'primary', rounded: 'full' }))}
          >
            2. Follow @hypurrfi on X - (2X HYPE boost)
          </a>

          <p className="mt-2 text-center font-normal text-sm text-white/70">
            Already following with account{' '}
            <span className="font-bold text-sm text-white">{connectedAccountInfo?.username}</span>?
            <button onClick={checkIfFollowing} className="ml-1 p-1 text-primary hover:text-primary-hover">
              Click to verify.
            </button>
          </p>
        </div>
      )}
      {error && <p className="text-center text-red-500 text-sm">Error linking X account</p>}
      {checkingError && <p className="text-center text-red-500 text-sm">Error checking if following on X</p>}
    </div>
  )
}

export default ConnectXButtonGroup
