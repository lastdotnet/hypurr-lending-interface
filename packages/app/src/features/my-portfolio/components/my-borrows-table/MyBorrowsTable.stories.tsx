import { WithTooltipProvider } from '@storybook/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { within } from '@storybook/test'
import { tokens } from '@storybook/tokens'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import { raise } from '@/utils/assert'

import { Borrow } from '../../logic/assets'
import { MyBorrowsTable } from './MyBorrowsTable'

const assets: Borrow[] = [
  {
    token: tokens.DAI,
    available: NormalizedUnitNumber('22727'),
    debt: NormalizedUnitNumber('50000'),
    borrowAPY: Percentage(0.11),
    reserveStatus: 'active',
  },
  {
    token: tokens.ETH,
    available: NormalizedUnitNumber('11.99'),
    debt: NormalizedUnitNumber(0),
    borrowAPY: Percentage(0.157),
    reserveStatus: 'active',
  },
  {
    token: tokens.stETH,
    available: NormalizedUnitNumber('14.68'),
    debt: NormalizedUnitNumber(0),
    borrowAPY: Percentage(0.145),
    reserveStatus: 'active',
  },
  {
    token: tokens.GNO,
    available: NormalizedUnitNumber('0'),
    debt: NormalizedUnitNumber(10),
    borrowAPY: Percentage(0.345),
    reserveStatus: 'frozen',
  },
  {
    token: tokens.wstETH,
    available: NormalizedUnitNumber('0'),
    debt: NormalizedUnitNumber(2),
    borrowAPY: Percentage(0.32),
    reserveStatus: 'paused',
  },
]

const meta: Meta<typeof MyBorrowsTable> = {
  title: 'Features/MyPortfolio/Components/MyBorrowsTable',
  decorators: [WithTooltipProvider()],
  component: MyBorrowsTable,
  args: {
    assets,
    openDialog: () => {},
  },
}

export default meta
type Story = StoryObj<typeof MyBorrowsTable>

export const Desktop: Story = {}

const WithCanvas: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switches = await canvas.findAllByRole('switch')
    ;(switches[0] ?? raise('No switch element found')).click()
  },
}

export const Mobile = getMobileStory(WithCanvas)
export const Tablet = getTabletStory(WithCanvas)
