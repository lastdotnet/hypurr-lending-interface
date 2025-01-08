import { useCallback, useEffect, useState } from 'react'

import { useAuthenticateConnectedUser } from '@dynamic-labs/sdk-react-core'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useSocialAccounts } from '@dynamic-labs/sdk-react-core'
import { ProviderEnum } from '@dynamic-labs/types'
import { buttonVariants } from '@/ui/atoms/button/Button'
import { Button } from '@/ui/atoms/button/Button'

const ConnectXButtonGroup = () => {
  const [following, setFollowing] = useState(false)
  const [followButtonClicked, setFollowButtonClicked] = useState(false)
  const [checkingIfFollowing, setCheckingIfFollowing] = useState(false)

  const {
    error,
    linkSocialAccount,
    isProcessing,
    isLinked,
    // getLinkedAccountInformation
  } = useSocialAccounts()
  const { user } = useDynamicContext()
  const { authenticateUser } = useAuthenticateConnectedUser()
  const provider = ProviderEnum.Twitter as any
  const isXLinked = isLinked(provider)
  // const connectedAccountInfo = getLinkedAccountInformation(provider)

  const handleSignAndConnect = async () => {
    if (!user) {
      await authenticateUser()
    }
    linkSocialAccount(provider)
  }

  // TODO: replace with actual API call
  const checkIfFollowing = useCallback(async () => {
    setCheckingIfFollowing(true)
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const isFollowing = false
        // Math.random() < 0.5 // Randomly returns true or false
        setFollowing(isFollowing)
        resolve(isFollowing)
        setCheckingIfFollowing(false)
      }, 2000)
    })
  }, [])

  // Automatically check if following when the user refocuses the window
  // after opening link to profile
  const handleRefocus = useCallback(() => {
    if (!following && isXLinked && followButtonClicked) {
      checkIfFollowing()
      setFollowButtonClicked(false)
    }
  }, [checkIfFollowing, following, isXLinked, followButtonClicked])

  useEffect(() => {
    window.addEventListener('focus', handleRefocus)
    return () => {
      window.removeEventListener('focus', handleRefocus)
    }
  }, [handleRefocus])

  // Automatically check if following when the user connects their X account
  useEffect(() => {
    if (!following && isXLinked && !isProcessing) {
      checkIfFollowing()
    }
  }, [checkIfFollowing, following, isXLinked, isProcessing])

  useEffect(() => {
    if (error) {
      console.error('Error linking X account:', error)
    }
  }, [error])

  if (following && isXLinked) {
    return <p className="rounded-lg bg-white/4 p-4 text-center font-medium">You are earning 2X HYPE!</p>
  }

  if (!user || !isXLinked) {
    return (
      <Button onClick={handleSignAndConnect} className="w-full">
        Sign and connect/follow on X - (2X HYPE boost)
      </Button>
    )
  }

  return (
    <div>
      {checkingIfFollowing || isProcessing ? (
        <p className="text-center text-sm italic opacity-80">Loading...</p>
      ) : (
        <div className="flex flex-col">
          <a
            href="https://x.com/hypurrfi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setFollowButtonClicked(true)}
            className={buttonVariants({ variant: 'primary' })}
          >
            Step 2. Follow @hypurrfi on X - (2X HYPE boost)
          </a>
          <Button variant="text" onClick={checkIfFollowing} className="font-normal text-sm">
            I'm already following
          </Button>
        </div>
      )}
      {error && <p className="text-center text-red-500 text-sm">Error linking X account</p>}
    </div>
  )
}

export default ConnectXButtonGroup
