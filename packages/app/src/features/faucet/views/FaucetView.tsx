import { getChainConfigEntry } from '@/config/chain'
import { hyperTestnet } from '@/config/chain/constants'
import { useWrite } from '@/domain/hooks/useWrite'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { Button } from '@/ui/atoms/button/Button'
import { assert } from '@/utils/assert'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'
import { parseUnits } from 'viem'

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
const STORAGE_KEY = {
  USDC: 'lastFaucetMint_USDC',
  SUSDE: 'lastFaucetMint_SUSDE',
} as const

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
  const [lastUsdcMintTime, setLastUsdcMintTime] = useState<number | null>(null)
  const [lastSusdeMintTime, setLastSusdeMintTime] = useState<number | null>(null)

  const isUsdcOnCooldown = !!lastUsdcMintTime && Date.now() - lastUsdcMintTime < MINT_COOLDOWN
  const isSusdeOnCooldown = !!lastSusdeMintTime && Date.now() - lastSusdeMintTime < MINT_COOLDOWN

  useEffect(() => {
    const storedUsdc = localStorage.getItem(STORAGE_KEY.USDC)
    const storedSusde = localStorage.getItem(STORAGE_KEY.SUSDE)

    if (storedUsdc) setLastUsdcMintTime(Number.parseInt(storedUsdc))
    if (storedSusde) setLastSusdeMintTime(Number.parseInt(storedSusde))
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
    enabled: !!primaryWallet && !isUsdcOnCooldown,
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
    enabled: !!primaryWallet && !isSusdeOnCooldown,
  })

  // Update local storage with the time of the last mint
  useEffect(() => {
    if (usdcTxReceipt) {
      const now = Date.now()
      localStorage.setItem(STORAGE_KEY.USDC, now.toString())
      setLastUsdcMintTime(now)
    }
  }, [usdcTxReceipt])

  useEffect(() => {
    if (susdeTxReceipt) {
      const now = Date.now()
      localStorage.setItem(STORAGE_KEY.SUSDE, now.toString())
      setLastSusdeMintTime(now)
    }
  }, [susdeTxReceipt])

  // Set success state if both mints are successful and the cooldowns have been set
  useEffect(() => {
    if (usdcTxReceipt && susdeTxReceipt && isUsdcOnCooldown && isSusdeOnCooldown) setSuccess(true)
  }, [usdcTxReceipt, susdeTxReceipt, setSuccess, isUsdcOnCooldown, isSusdeOnCooldown])

  const usdcLimitExceeded = usdcWriteStatus.kind === 'error' && isMintLimitError(usdcWriteStatus.error)
  const susdeLimitExceeded = susdeWriteStatus.kind === 'error' && isMintLimitError(susdeWriteStatus.error)

  return (
    <div className="flex gap-4">
      <Button
        disabled={usdcWritePending || usdcWriteStatus.kind === 'success' || usdcLimitExceeded || isUsdcOnCooldown}
        onClick={usdcWrite}
        className="flex-1"
      >
        {(() => {
          switch (true) {
            case usdcWritePending:
              return 'Minting USDC...'
            case usdcLimitExceeded:
              return 'USDC mint limit exceeded'
            case usdcWriteStatus.kind === 'success' || !!usdcTxReceipt:
              return 'Mint successful'
            case isUsdcOnCooldown:
              return 'USDC on cooldown'
            default:
              return 'Mint USDC'
          }
        })()}
      </Button>
      <Button
        disabled={susdeWritePending || susdeWriteStatus.kind === 'success' || susdeLimitExceeded || isSusdeOnCooldown}
        onClick={susdeWrite}
        className="flex-1"
      >
        {(() => {
          switch (true) {
            case susdeWritePending:
              return 'Minting sUSDe...'
            case susdeLimitExceeded:
              return 'sUSDe mint limit exceeded'
            case susdeWriteStatus.kind === 'success' || !!susdeTxReceipt:
              return 'Mint successful'
            case isSusdeOnCooldown:
              return 'sUSDe on cooldown'
            default:
              return 'Mint sUSDe'
          }
        })()}
      </Button>
    </div>
  )
}
