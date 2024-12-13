import { hyperTestnet } from '@/config/chain/constants'
import { paths } from '@/config/paths'
import { useBlockExplorerLink } from '@/domain/hooks/useBlockExplorerLink'
import { buttonVariants } from '@/ui/atoms/button/Button'
import { useConfettiContext } from '@/ui/molecules/confetti/Confetti'
import { cn } from '@/ui/utils/style'
import { ArrowUpRight } from 'lucide-react'
import { useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'

export function SuccessView({ mintTx }: { mintTx: string }) {
  const blockExplorerLink = useBlockExplorerLink(hyperTestnet.id)
  const { runAnimation } = useConfettiContext()

  useEffect(() => {
    runAnimation()
  }, [runAnimation])

  return (
    <div className="flex flex-col">
      <p className="mb-4">Purrfecto! You minted 100 sUSDe, 100 USDC and 0.01 HYPE (testnet)</p>
      <HashLink
        className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'w-full')}
        to={`${paths.dashboard}#your-wallet`}
      >
        View in dashboard
      </HashLink>
      <a
        href={`${blockExplorerLink}/tx/${mintTx}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 self-end text-sm opacity-50 hover:opacity-80"
      >
        View Transaction <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  )
}
