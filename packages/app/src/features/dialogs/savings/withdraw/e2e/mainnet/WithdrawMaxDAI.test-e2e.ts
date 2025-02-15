import { ActionsPageObject } from '@/features/actions/ActionsContainer.PageObject'
import { SavingsPageObject } from '@/containers/Savings.PageObject'
import { DEFAULT_BLOCK_NUMBER } from '@/test/e2e/constants'
import { setupFork } from '@/test/e2e/forking/setupFork'
import { setup } from '@/test/e2e/setup'
import { test } from '@playwright/test'
import { mainnet } from 'viem/chains'
import { SavingsDialogPageObject } from '../../../common/e2e/SavingsDialog.PageObject'

test.describe('Withdraw max DAI on Mainnet', () => {
  const fork = setupFork({ blockNumber: DEFAULT_BLOCK_NUMBER, chainId: mainnet.id })
  let savingsPage: SavingsPageObject
  let withdrawalDialog: SavingsDialogPageObject

  test.beforeEach(async ({ page }) => {
    await setup(page, fork, {
      initialPage: 'savings',
      account: {
        type: 'connected-random',
        assetBalances: {
          ETH: 1,
          sDAI: 10_000,
        },
      },
    })

    savingsPage = new SavingsPageObject(page)
    await savingsPage.clickWithdrawSDaiButtonAction()

    withdrawalDialog = new SavingsDialogPageObject({ page, type: 'withdraw' })
    await withdrawalDialog.clickMaxAmountAction()
  })

  test('uses native sDai withdrawal', async () => {
    await withdrawalDialog.actionsContainer.expectActions([
      { type: 'withdrawFromSavings', asset: 'DAI', savingsAsset: 'sDAI', mode: 'withdraw' },
    ])
  })

  test('displays transaction overview', async () => {
    await withdrawalDialog.expectNativeRouteTransactionOverview({
      routeItems: [
        {
          tokenAmount: '10,000.00 sDAI',
          tokenUsdValue: '$10,715.05',
        },
        {
          tokenAmount: '10,715.05 DAI',
          tokenUsdValue: '$10,715.05',
        },
      ],
      outcome: '10,715.05 DAI worth $10,715.05',
      badgeTokens: 'DAI',
    })
  })

  test('executes max withdrawal', async () => {
    const actionsContainer = new ActionsPageObject(withdrawalDialog.locatePanelByHeader('Actions'))
    await actionsContainer.acceptAllActionsAction(1)

    await withdrawalDialog.expectSuccessPage()
    await withdrawalDialog.clickBackToSavingsButton()

    await savingsPage.expectOpportunityStablecoinsAmount('~$10,715.05')
    await savingsPage.expectStablecoinsInWalletAssetBalance('DAI', '10,715.05')
  })
})
