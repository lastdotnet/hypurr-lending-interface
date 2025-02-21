import { assets } from '@/ui/assets'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { ConnectOrSandboxCTAPanel } from '@/ui/organisms/connect-or-sandbox-cta-panel/ConnectOrSandboxCTAPanel'
import { useLingui } from '@lingui/react/macro'

export interface GuestViewProps {
  openConnectModal: () => void
  openSandboxModal: () => void
}

export function GuestView({ openConnectModal, openSandboxModal }: GuestViewProps) {
  const { t } = useLingui()
  return (
    <PageLayout className="max-w-6xl">
      <ConnectOrSandboxCTAPanel
        header={t`Connect your wallet to use Hypurr`}
        iconPaths={WALLET_ICONS_PATHS}
        action={openConnectModal}
        buttonText={t`Connect wallet`}
        openSandboxModal={openSandboxModal}
      />
    </PageLayout>
  )
}

const icons = assets.walletIcons
const WALLET_ICONS_PATHS = [icons.metamask, icons.walletConnect, icons.coinbase]
