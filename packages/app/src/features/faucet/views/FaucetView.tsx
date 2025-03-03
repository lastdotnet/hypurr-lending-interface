import { Button } from '@/ui/atoms/button/Button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'
import { CatSpinner } from '@/ui/molecules/cat-spinner/CatSpinner'
import { faucetUrl } from '@/config/consts'
import { trackEvent } from '@/utils/fathom'
import ConnectXButtonGroup from '../components/ConnectXButtonGroup'
import FriendlyCaptcha from '../components/FriendlyCaptcha'
import { Address } from 'viem'
import { marketBalancesQueryKey } from '@/domain/wallet/marketBalances'
import { useQueryClient } from '@tanstack/react-query'
import { captureError } from '@/utils/sentry'
import { FaucetError, FaucetTimeoutError } from '@/domain/errors/faucet'

const MINT_COOLDOWN = 24 * 60 * 60 * 1000 // 24 hours
const STORAGE_KEY = 'lastFaucetMint' as const

export function FaucetView({ setMintTx }: { setMintTx: (txHash: Address) => void }) {
  const queryClient = useQueryClient()
  const { primaryWallet, network } = useDynamicContext()
  const [handle, setHandle] = useState<string | null>(null)
  const [lastMintTime, setLastMintTime] = useState<number | null>(null)
  const [captchaSolution, setCaptchaSolution] = useState<string | null>(null)
  const [mintPending, setMintPending] = useState(false)
  const [mintError, setMintError] = useState<string | null>(null)

  const isOnCooldown = !!lastMintTime && Date.now() - lastMintTime < MINT_COOLDOWN

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setLastMintTime(Number.parseInt(stored))
    }
  }, [])

  async function mint() {
    if (!captchaSolution || isOnCooldown || !primaryWallet) {
      return
    }

    try {
      trackEvent('faucet_claim_attempt')

      setMintPending(true)
      setMintError(null)

      if (handle) {
        trackEvent('claim_with_x_handle')
      }

      const response = await fetchFaucet(primaryWallet.address, captchaSolution, handle)
      const data = await parseResponse(response)

      trackEvent('faucet_claim_success')
      const now = Date.now()
      localStorage.setItem(STORAGE_KEY, now.toString())
      setLastMintTime(now)
      setMintTx(data.txHash)

      void queryClient.invalidateQueries({
        queryKey: marketBalancesQueryKey({
          account: primaryWallet.address as Address,
          chainId: Number(network),
        }),
      })
    } catch (error) {
      if (error instanceof Error) {
        captureError(error)
      }

      if (error instanceof FaucetTimeoutError) {
        trackEvent('faucet_claim_timeout_error')
      } else {
        trackEvent('faucet_claim_error')
      }

      setMintError(error instanceof Error ? error.message : 'An unknown error occurred while minting')
    } finally {
      setMintPending(false)
    }
  }

  if (isOnCooldown) {
    const timeLeft = MINT_COOLDOWN - (Date.now() - lastMintTime)
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

    return (
      <p className="text-center font-medium">
        You can mint testnet tokens again in {hoursLeft > 0 && `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}`}{' '}
        {hoursLeft > 0 && minutesLeft > 0 && ' and '}{' '}
        {minutesLeft > 0 && `${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}`}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <ConnectXButtonGroup setHandle={setHandle} />

      {(() => {
        switch (true) {
          case !captchaSolution:
            return <FriendlyCaptcha setCaptchaSolution={setCaptchaSolution} />
          case mintPending:
            return (
              <div className="-mt-4 -mb-4 flex items-center justify-center">
                <CatSpinner />
              </div>
            )
          default:
            return (
              <Button className="w-full" rounded="full" onClick={mint}>
                Claim Faucet
              </Button>
            )
        }
      })()}

      {mintError && <p className="mt-2 text-center text-red-500 text-sm">{mintError}</p>}
    </div>
  )
}

async function fetchFaucet(walletAddress: string, captchaToken: string, handle: string | null): Promise<Response> {
  try {
    const response = await fetch(faucetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        captchaToken,
        walletAddress,
        handle,
      }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        throw new FaucetTimeoutError('Claiming is available once every 24 hours. Please try again later.')
      }
      throw new FaucetError(`Server error: ${response.status} ${response.statusText}`)
    }

    return response
  } catch (error) {
    if (error instanceof FaucetTimeoutError) {
      throw error
    }

    throw new FaucetError(
      error instanceof Error ? `Connection error: ${error.message}` : 'Failed to connect to faucet service',
    )
  }
}

async function parseResponse(response: Response) {
  try {
    const data = (await response.json()) as { success: boolean; txHash: `0x${string}` }

    if (!data.success || !data.txHash) {
      throw new FaucetError('Invalid response data: missing success or txHash')
    }

    return data
  } catch (error) {
    if (error instanceof FaucetError) {
      throw error
    }
    throw new FaucetError('Invalid response format from faucet service')
  }
}
