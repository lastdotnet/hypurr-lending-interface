import { hyperTestnet } from '@/config/chain/constants'
import { paths } from '@/config/paths'
import { useBlockExplorerLink } from '@/domain/hooks/useBlockExplorerLink'
import { LinkButton } from '@/ui/atoms/button/Button'
import { ArrowUpRight } from 'lucide-react'

export function SuccessView({ mintTx }: { mintTx: string }) {
  const blockExplorerLink = useBlockExplorerLink(hyperTestnet.id)

  return (
    <div className="flex flex-col">
      <p className="mb-4">You've minted your tokens 🎉</p>
      <LinkButton className="w-full" to={paths.dashboard}>
        View in dashboard
      </LinkButton>
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
