import { ActionsPageObject } from '@/features/actions/ActionsContainer.PageObject'
import { SavingsPageObject } from '@/containers/Savings.PageObject'
import { setupFork } from '@/test/e2e/forking/setupFork'
import { setup } from '@/test/e2e/setup'
import { test } from '@playwright/test'
import { base } from 'viem/chains'
import { SavingsDialogPageObject } from '../../../common/e2e/SavingsDialog.PageObject'

test.describe('Deposit USDS', () => {
  const fork = setupFork({ chainId: base.id })
  let savingsPage: SavingsPageObject
  let depositDialog: SavingsDialogPageObject

  test.beforeEach(async ({ page }) => {
    await setup(page, fork, {
      initialPage: 'savings',
      account: {
        type: 'connected-random',
        assetBalances: {
          ETH: 1,
          USDS: 10_000,
        },
      },
    })

    savingsPage = new SavingsPageObject(page)
    await savingsPage.clickDepositButtonAction('USDS')

    depositDialog = new SavingsDialogPageObject({ page, type: 'deposit' })
    await depositDialog.fillAmountAction(10_000)
  })

  test('has correct action plan', async () => {
    await depositDialog.actionsContainer.expectActions([
      { type: 'approve', asset: 'USDS' },
      { type: 'depositToSavings', asset: 'USDS', savingsAsset: 'sUSDS' },
    ])
  })

  test('displays transaction overview', async () => {
    await depositDialog.expectNativeRouteTransactionOverview({
      apy: {
        value: '6.50%',
        description: '~650.00 USDS per year',
      },
      routeItems: [
        {
          tokenAmount: '10,000.00 USDS',
          tokenUsdValue: '$10,000.00',
        },
        {
          tokenAmount: '9,943.09 sUSDS',
          tokenUsdValue: '$10,000.00',
        },
      ],
      outcome: '9,943.09 sUSDS worth $10,000.00',
      badgeTokens: 'USDS',
    })

    await depositDialog.expectUpgradeSwitchToBeHidden()
  })

  test('executes deposit', async () => {
    const actionsContainer = new ActionsPageObject(depositDialog.locatePanelByHeader('Actions'))
    await actionsContainer.acceptAllActionsAction(2, fork)

    await depositDialog.expectSuccessPage()
    await depositDialog.clickBackToSavingsButton()

    await savingsPage.expectSavingsUsdsBalance({ susdsBalance: '9,943.08 sUSDS', estimatedUsdsValue: '10,000' })
    await savingsPage.expectStablecoinsInWalletAssetBalance('USDS', '-')
  })
})
