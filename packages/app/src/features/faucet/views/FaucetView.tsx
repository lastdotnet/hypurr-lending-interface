import { getChainConfigEntry } from '@/config/chain'
import { hyperTestnet } from '@/config/chain/constants'
import { useWrite } from '@/domain/hooks/useWrite'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { Button } from '@/ui/atoms/button/Button'
import { assert } from '@/utils/assert'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { parseUnits } from 'viem'
import { WidgetInstance } from 'friendly-challenge'

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
        // skipStyleInjection: true,
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

export default FriendlyCaptcha

const MINT_ABI = [
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'mint',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const MINT_AMOUNT = '10'
const MINT_COOLDOWN = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
const STORAGE_KEY = 'lastFaucetMint' as const

function isMintLimitError(error: Error) {
  return error.message.includes('MINT_LIMIT_EXCEEDED')
}

const { extraTokens } = getChainConfigEntry(hyperTestnet.id)
const usdcAddress = extraTokens.find((t) => t.symbol === TokenSymbol('USDC'))?.address
const susdeAddress = extraTokens.find((t) => t.symbol === TokenSymbol('sUSDe'))?.address

export function FaucetView({ setSuccess }: { setSuccess: (success: boolean) => void }) {
  assert(usdcAddress, 'USDC address not found')
  assert(susdeAddress, 'sUSDe address not found')

  const { primaryWallet } = useDynamicContext()
  const [lastMintTime, setLastMintTime] = useState<number | null>(null)
  const [captchaSolution, setCaptchaSolution] = useState<string | null>(null)

  const isOnCooldown = !!lastMintTime && Date.now() - lastMintTime < MINT_COOLDOWN

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setLastMintTime(Number.parseInt(stored))
    }
  }, [])

  const {
    write: usdcWrite,
    status: usdcWriteStatus,
    pending: usdcWritePending,
    txReceipt: usdcTxReceipt,
  } = useWrite({
    address: usdcAddress,
    abi: MINT_ABI,
    functionName: 'mint',
    args: [parseUnits(MINT_AMOUNT, 6)],
    enabled: !!primaryWallet && !isOnCooldown,
  })

  const {
    write: susdeWrite,
    status: susdeWriteStatus,
    pending: susdeWritePending,
    txReceipt: susdeTxReceipt,
  } = useWrite({
    address: susdeAddress,
    abi: MINT_ABI,
    functionName: 'mint',
    args: [parseUnits(MINT_AMOUNT, 18)],
    enabled: !!primaryWallet && !isOnCooldown,
  })

  // Update local storage with the time of the last mint
  useEffect(() => {
    if (usdcTxReceipt && susdeTxReceipt) {
      const now = Date.now()
      localStorage.setItem(STORAGE_KEY, now.toString())
      setLastMintTime(now)
      setSuccess(true)
    }
  }, [usdcTxReceipt, susdeTxReceipt, setSuccess])

  const usdcLimitExceeded = usdcWriteStatus.kind === 'error' && isMintLimitError(usdcWriteStatus.error)
  const susdeLimitExceeded = susdeWriteStatus.kind === 'error' && isMintLimitError(susdeWriteStatus.error)

  return captchaSolution ? (
    <Button
      disabled={usdcWritePending || usdcWriteStatus.kind === 'success' || usdcLimitExceeded || isOnCooldown}
      onClick={() => {
        usdcWrite()
        susdeWrite()
      }}
    >
      {(() => {
        switch (true) {
          case usdcWritePending || susdeWritePending:
            return 'Minting...'
          case usdcLimitExceeded || susdeLimitExceeded:
            return 'Mint limit exceeded'
          case !!usdcTxReceipt && !!susdeTxReceipt:
            return 'Mint successful'
          case isOnCooldown:
            return 'Minting is on cooldown'
          default:
            return 'Mint USDC and sUSDe'
        }
      })()}
    </Button>
  ) : (
    <FriendlyCaptcha setCaptchaSolution={setCaptchaSolution} />
  )
}
