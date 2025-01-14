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

const ConnectXButtonGroup = ({ setHandle }: { setHandle: (handle: string) => void }) => {
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

  const handleSignAndConnect = async () => {
    if (!user) {
      await authenticateUser()
    }
    linkSocialAccount(provider)
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
        throw new Error('Failed to mint tokens')
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
      checkIfFollowing()
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
      checkIfFollowing()
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
        Sign and connect/follow on X - (2X HYPE boost)
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
            Step 2. Follow @hypurrfi on X - (2X HYPE boost)
          </a>
          <button
            onClick={checkIfFollowing}
            className="mt-2 self-center p-1 font-normal text-primary text-sm hover:text-primary-hover"
          >
            I'm already following
          </button>
        </div>
      )}
      {error && <p className="text-center text-red-500 text-sm">Error linking X account</p>}
      {checkingError && <p className="text-center text-red-500 text-sm">Error checking if following on X</p>}
    </div>
  )
}

export default ConnectXButtonGroup
