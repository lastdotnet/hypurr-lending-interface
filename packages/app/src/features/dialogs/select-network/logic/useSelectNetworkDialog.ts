import { getChainConfigEntry } from '@/config/chain'
import { Path, getSupportedPages, pathGroups } from '@/config/paths'
import { useNetworkChange } from '@/features/navbar/logic/useNetworkChange'
import { useChainId, useChains } from 'wagmi'
import { Chain } from '../types'

export interface UseSelectNetworkDialogParams {
  closeDialog: () => void
}

export interface UseSelectNetworkDialogResult {
  chains: Chain[]
}

export function useSelectNetworkDialog({ closeDialog }: UseSelectNetworkDialogParams): UseSelectNetworkDialogResult {
  const currentChainId = useChainId()
  const supportedChains = useChains()
  const { changeNetwork } = useNetworkChange({
    onSuccess: () => {
      closeDialog()
    },
  })

  const chains: Chain[] = supportedChains.map((chain) => {
    const config = getChainConfigEntry(chain.id)

    return {
      name: config.meta.name,
      logo: config.meta.logo,
      supportedPages: formatSupportedPages(getSupportedPages(config)),
      selected: chain.id === currentChainId,
      onSelect: () => {
        if (chain.id === currentChainId) {
          closeDialog()
          return
        }

        changeNetwork(chain.id)
      },
    }
  })

  return {
    chains,
  }
}

function formatSupportedPages(supportedPages: Path[]): string[] {
  const pageGroups = supportedPages.map(
    //@ts-ignore
    (path) => Object.entries(pathGroups).find(([, paths]) => paths.includes(path))?.[0],
  )
  const pageGroupNames = pageGroups.map((group) => group && pageGroupToName[group])
  const uniquePageGroupNames = pageGroupNames.filter(
    (pageGroupName, index, self) => self.indexOf(pageGroupName) === index,
  ) as string[]

  return uniquePageGroupNames
}

const pageGroupToName: Record<string, string> = {
  borrow: 'Borrow',
  savings: 'Savings',
  farms: 'Farms',
}
