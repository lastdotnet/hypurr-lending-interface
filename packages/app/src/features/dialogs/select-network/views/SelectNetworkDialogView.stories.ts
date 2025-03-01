import { WithClassname } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { assets } from '@/ui/assets'
import { SelectNetworkDialogView } from './SelectNetworkDialogView'

const meta: Meta<typeof SelectNetworkDialogView> = {
  title: 'Features/Dialogs/Views/SelectNetwork',
  component: SelectNetworkDialogView,
  decorators: [WithClassname('max-w-xl')],
  args: {
    chains: [
      {
        logo: assets.chain.hyper,
        name: 'HyperEVM',
        supportedPages: ['Savings', 'Borrow', 'Farms'],
        selected: false,
        onSelect: () => {},
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof SelectNetworkDialogView>

export const Desktop: Story = {}
export const Mobile = getMobileStory(Desktop)
export const Tablet = getTabletStory(Desktop)
