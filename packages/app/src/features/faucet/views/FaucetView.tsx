import { useWrite } from '@/domain/hooks/useWrite'
import { Button } from '@/ui/atoms/button/Button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect } from 'react'
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

const MINT_AMOUNT = '1'

function isMintLimitError(error: Error) {
  return error.message.includes('MINT_LIMIT_EXCEEDED')
}

export function FaucetView({ setSuccess }: { setSuccess: (success: boolean) => void }) {
  const { primaryWallet } = useDynamicContext()

  const {
    write: usdcWrite,
    status: usdcWriteStatus,
    pending: usdcWritePending,
  } = useWrite({
    address: '0x6fdbaf3102efc67cee53eefa4197be36c8e1a094',
    abi: MINT_ABI,
    functionName: 'mint',
    args: [parseUnits(MINT_AMOUNT, 6)],
    enabled: !!primaryWallet,
  })

  const {
    write: susdeWrite,
    status: susdeWriteStatus,
    pending: susdeWritePending,
  } = useWrite({
    address: '0x2222C34A8dd4Ea29743bf8eC4fF165E059839782',
    abi: MINT_ABI,
    functionName: 'mint',
    args: [parseUnits(MINT_AMOUNT, 18)],
    enabled: !!primaryWallet,
  })

  useEffect(() => {
    if (usdcWriteStatus.kind === 'success' && susdeWriteStatus.kind === 'success') {
      setSuccess(true)
    }
  }, [usdcWriteStatus, susdeWriteStatus, setSuccess])

  const usdcLimitExceeded = usdcWriteStatus.kind === 'error' && isMintLimitError(usdcWriteStatus.error)
  const susdeLimitExceeded = susdeWriteStatus.kind === 'error' && isMintLimitError(susdeWriteStatus.error)

  return (
    <div className="flex gap-4">
      <Button
        disabled={usdcWritePending || usdcWriteStatus.kind === 'success' || usdcLimitExceeded}
        onClick={usdcWrite}
      >
        {(() => {
          switch (true) {
            case usdcWritePending:
              return 'Minting USDC...'
            case usdcLimitExceeded:
              return 'USDC mint limit exceeded'
            case usdcWriteStatus.kind === 'success':
              return 'Mint successful'
            default:
              return 'Mint USDC'
          }
        })()}
      </Button>
      <Button
        disabled={susdeWritePending || susdeWriteStatus.kind === 'success' || susdeLimitExceeded}
        onClick={susdeWrite}
      >
        {(() => {
          switch (true) {
            case susdeWritePending:
              return 'Minting sUSDe...'
            case susdeLimitExceeded:
              return 'sUSDe mint limit exceeded'
            case susdeWriteStatus.kind === 'success':
              return 'Mint successful'
            default:
              return 'Mint sUSDe'
          }
        })()}
      </Button>
    </div>
  )
}
