import { ActionsPageObject } from '@/features/actions/ActionsContainer.PageObject'
import { SavingsPageObject } from '@/containers/Savings.PageObject'
import { LITE_PSM_ACTIONS_OPERABLE } from '@/test/e2e/constants'
import { setupFork } from '@/test/e2e/forking/setupFork'
import { setup } from '@/test/e2e/setup'
import { test } from '@playwright/test'
import { mainnet } from 'viem/chains'
import { SavingsDialogPageObject } from '../../../common/e2e/SavingsDialog.PageObject'

test.describe('General dialog behavior', () => {
  const fork = setupFork({
    blockNumber: LITE_PSM_ACTIONS_OPERABLE,
    chainId: mainnet.id,
    useTenderlyVnet: true,
  })

  test('can switch between tokens', async ({ page }) => {
    await setup(page, fork, {
      initialPage: 'savings',
      account: {
        type: 'connected-random',
        assetBalances: {
          ETH: 1,
          DAI: 100,
          USDC: 100,
        },
      },
    })

    const savingsPage = new SavingsPageObject(page)

    await savingsPage.clickDepositButtonAction('DAI')

    const depositDialog = new SavingsDialogPageObject({ page, type: 'deposit' })
    const actionsContainer = new ActionsPageObject(depositDialog.locatePanelByHeader('Actions'))

    await depositDialog.fillAmountAction(100)
    await actionsContainer.expectEnabledActionAtIndex(0)
    await actionsContainer.expectActions([
      { type: 'approve', asset: 'DAI' },
      { type: 'depositToSavings', asset: 'DAI', savingsAsset: 'sDAI' },
    ])

    await depositDialog.selectAssetAction('USDC')
    await depositDialog.fillAmountAction(100)
    await actionsContainer.expectEnabledActionAtIndex(0)
    await actionsContainer.expectActions([
      { type: 'approve', asset: 'USDC' },
      { type: 'depositToSavings', asset: 'USDC', savingsAsset: 'sDAI' },
    ])

    await depositDialog.selectAssetAction('DAI')
    await depositDialog.fillAmountAction(100)
    await actionsContainer.expectEnabledActionAtIndex(0)
    await actionsContainer.expectActions([
      { type: 'approve', asset: 'DAI' },
      { type: 'depositToSavings', asset: 'DAI', savingsAsset: 'sDAI' },
    ])
  })
})
