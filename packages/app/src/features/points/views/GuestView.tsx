import { assets } from '@/ui/assets'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { ConnectOrSandboxCTAPanel } from '@/ui/organisms/connect-or-sandbox-cta-panel/ConnectOrSandboxCTAPanel'

export interface GuestViewProps {
  openConnectModal: () => void
}

export function GuestView({ openConnectModal }: GuestViewProps) {
  return (
    <PageLayout className="min-h-[80vh] items-center justify-center xl:min-h-screen">
      <ConnectOrSandboxCTAPanel
        header="Connect your wallet to use Hypurr"
        iconPaths={WALLET_ICONS_PATHS}
        action={openConnectModal}
        buttonText="Connect wallet"
        openSandboxModal={() => {}}
      />
    </PageLayout>
  )
}

const icons = assets.walletIcons
const WALLET_ICONS_PATHS = [icons.metamask, icons.walletConnect, icons.coinbase]
