import { Button } from '@/ui/atoms/button/Button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { WidgetInstance } from 'friendly-challenge'
import { CatSpinner } from '@/ui/molecules/cat-spinner/CatSpinner'
import { faucetUrl } from '@/config/consts'
import { trackEvent } from '@/utils/fathom'

function FriendlyCaptcha({
  setCaptchaSolution,
}: {
  setCaptchaSolution: (solution: string) => void
}) {
  const container = useRef<HTMLDivElement>(null)
  const widget = useRef<WidgetInstance | null>(null)

  const doneCallback = useCallback(
    (solution: string) => {
      setCaptchaSolution(solution)
    },
    [setCaptchaSolution],
  )

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: 'none',
        doneCallback,
      })
    }

    return () => {
      if (widget.current !== undefined) widget.current?.reset()
    }
  }, [doneCallback])

  return (
    <div
      ref={container}
      className="frc-captcha dark"
      data-sitekey={import.meta.env.VITE_FRIENDLY_CAPTCHA_SITE_KEY}
      data-theme="dark"
    />
  )
}

const MINT_COOLDOWN = 24 * 60 * 60 * 1000 // 24 hours
const STORAGE_KEY = 'lastFaucetMint' as const

export function FaucetView({ setMintTx }: { setMintTx: (txHash: string) => void }) {
  const { primaryWallet } = useDynamicContext()
  const [lastMintTime, setLastMintTime] = useState<number | null>(null)
  const [captchaSolution, setCaptchaSolution] = useState<string | null>(null)
  const [mintPending, setMintPending] = useState(false)
  const [mintError, setMintError] = useState<string | null>(null)
  const [followStatus, setFollowStatus] = useState<'initial' | 'pending' | 'awaitingConfirmation' | 'confirmed'>(
    'initial',
  )

  const isOnCooldown = !!lastMintTime && Date.now() - lastMintTime < MINT_COOLDOWN

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setLastMintTime(Number.parseInt(stored))
    }
  }, [])

  useEffect(() => {
    if (followStatus === 'pending') {
      const timer = setTimeout(() => {
        setFollowStatus('awaitingConfirmation')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [followStatus])

  async function mint() {
    if (!captchaSolution || isOnCooldown || !primaryWallet) {
      return
    }

    try {
      trackEvent('faucet_claim_attempt')

      setMintPending(true)
      setMintError(null)

      const response = await fetch(faucetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          captchaToken: captchaSolution,
          walletAddress: primaryWallet.address,
        }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Claiming is available once every 24 hours. Please try again later.')
        }
        throw new Error('Failed to mint tokens')
      }

      const data = (await response.json()) as { success: boolean; txHash: string }

      if (!data.success || !data.txHash) {
        throw new Error('Failed to mint tokens')
      }

      trackEvent('faucet_claim_success')
      const now = Date.now()
      localStorage.setItem(STORAGE_KEY, now.toString())
      setLastMintTime(now)
      setMintTx(data.txHash)
    } catch (error) {
      console.error(error)
      trackEvent('faucet_claim_error')
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

  if (followStatus !== 'confirmed') {
    switch (followStatus) {
      case 'initial':
        return (
          <a
            href="https://x.com/hypurrfi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setFollowStatus('pending')}
            className="rounded border border-white/4 bg-white/10 px-4 py-1 text-sm text-white transition-colors hover:bg-primary-bg/70"
          >
            Follow us on X
          </a>
        )
      case 'pending':
        return <p>pending...</p>
      case 'awaitingConfirmation':
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="follow"
              id="follow"
              onChange={(e) => {
                if (e.target.checked) {
                  setFollowStatus('confirmed')
                }
              }}
            />
            <label htmlFor="follow">I have followed you</label>
          </div>
        )
    }
  }

  if (!captchaSolution) {
    return <FriendlyCaptcha setCaptchaSolution={setCaptchaSolution} />
  }

  if (mintPending) {
    return (
      <div className="-mt-4 -mb-4 flex items-center justify-center">
        <CatSpinner />
      </div>
    )
  }

  return (
    <div className="w-full">
      <Button className="w-full" disabled={mintPending} onClick={mint}>
        Claim Faucet
      </Button>

      {mintError && <p className="mt-2 text-center text-red-500 text-sm">{mintError}</p>}
    </div>
  )
}
