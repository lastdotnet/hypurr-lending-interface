import { hyperTestnet } from '@/config/chain/constants'
import { paths } from '@/config/paths'
import { useBlockExplorerLink } from '@/domain/hooks/useBlockExplorerLink'
import { buttonVariants } from '@/ui/atoms/button/Button'
import { useConfettiContext } from '@/ui/molecules/confetti/Confetti'
import { cn } from '@/ui/utils/style'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'

export function SuccessView({ mintTx }: { mintTx: string }) {
  const blockExplorerLink = useBlockExplorerLink(hyperTestnet.id)
  const { runAnimation } = useConfettiContext()

  useEffect(() => {
    runAnimation()
  }, [runAnimation])

  return (
    <div className="flex flex-col">
      <p className="mb-4">Purrfecto! You minted 100 sUSDe, 100 USDC, 0.01 SolvBTC, and 0.01 HYPE (testnet)</p>
      <HashLink
        className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'w-full')}
        to={`${paths.dashboard}#your-wallet`}
      >
        View in dashboard
      </HashLink>
      <div className="mt-5 flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <TweetButton text="Got gassed up and ready to purr! 😼💰 @hypurrfi" url="https://app.hypurr.fi/faucet" />
          <CopyLinkButton link="https://app.hypurr.fi/faucet" />
        </div>

        <a
          href={`${blockExplorerLink}/tx/${mintTx}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm opacity-50 hover:opacity-80"
        >
          View Transaction <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

function CopyLinkButton({ link }: { link: string }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(link)
      setIsCopied(true)
    } catch (error) {
      console.error('Failed to copy the link: ', error)
    }
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  return isCopied ? (
    <p className="animate-fade-in text-primary-bg text-sm">Link copied to clipboard!</p>
  ) : (
    <button
      onClick={copyToClipboard}
      className="animate-fade-in text-sm text-white/50 transition-colors hover:text-white/80"
    >
      Copy link
    </button>
  )
}

function TweetButton({ text, url }: { text: string; url: string }) {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}%0A%0A&url=${encodeURIComponent(url)}`

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded border border-white/4 bg-white/10 px-4 py-1 text-sm text-white transition-colors hover:bg-primary-bg/70"
    >
      Share on X
    </a>
  )
}
