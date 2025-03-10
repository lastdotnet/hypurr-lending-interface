import { ActionsPageObject } from '@/features/actions/ActionsContainer.PageObject'
import { SavingsPageObject } from '@/containers/Savings.PageObject'
import { setupFork } from '@/test/e2e/forking/setupFork'
import { setup } from '@/test/e2e/setup'
import { test } from '@playwright/test'
import { base } from 'viem/chains'
import { SavingsDialogPageObject } from '../../../common/e2e/SavingsDialog.PageObject'

test.describe('Withdraw USDS', () => {
  const fork = setupFork({ chainId: base.id })
  let savingsPage: SavingsPageObject
  let withdrawDialog: SavingsDialogPageObject

  test.beforeEach(async ({ page }) => {
    await setup(page, fork, {
      initialPage: 'savings',
      account: {
        type: 'connected-random',
        assetBalances: {
          ETH: 1,
          sUSDS: 10_000,
        },
      },
    })

    savingsPage = new SavingsPageObject(page)

    await savingsPage.clickWithdrawSUsdsButtonAction()
    withdrawDialog = new SavingsDialogPageObject({ page, type: 'withdraw' })
    await withdrawDialog.fillAmountAction(1000)
  })

  test('has correct action plan', async () => {
    await withdrawDialog.actionsContainer.expectActions([
      { type: 'approve', asset: 'sUSDS' },
      { type: 'withdrawFromSavings', asset: 'USDS', savingsAsset: 'sUSDS', mode: 'withdraw' },
    ])
  })

  test('displays transaction overview', async () => {
    await withdrawDialog.expectNativeRouteTransactionOverview({
      routeItems: [
        {
          tokenAmount: '994.31 sUSDS',
          tokenUsdValue: '$1,000.00',
        },
        {
          tokenAmount: '1,000.00 USDS',
          tokenUsdValue: '$1,000.00',
        },
      ],
      outcome: '1,000.00 USDS worth $1,000.00',
      badgeTokens: 'USDS',
    })

    await withdrawDialog.expectUpgradeSwitchToBeHidden()
  })

  test('executes withdraw', async () => {
    const actionsContainer = new ActionsPageObject(withdrawDialog.locatePanelByHeader('Actions'))
    await actionsContainer.acceptAllActionsAction(2, fork)

    await withdrawDialog.expectSuccessPage()
    await withdrawDialog.clickBackToSavingsButton()

    await savingsPage.expectSavingsUsdsBalance({ susdsBalance: '9,005.69 sUSDS', estimatedUsdsValue: '9,057' })
    await savingsPage.expectStablecoinsInWalletAssetBalance('USDS', '1,000')
  })
})
