import { SavingsPageObject } from '@/containers/Savings.PageObject'
import { USDS_ACTIVATED_BLOCK_NUMBER } from '@/test/e2e/constants'
import { setupFork } from '@/test/e2e/forking/setupFork'
import { setup } from '@/test/e2e/setup'
import { test } from '@playwright/test'
import { mainnet } from 'viem/chains'
import { ConvertStablesDialogPageObject } from '../../ConvertStablesDialog.PageObject'

test.describe('Convert DAI to USDC', () => {
  const fork = setupFork({ blockNumber: USDS_ACTIVATED_BLOCK_NUMBER, chainId: mainnet.id, useTenderlyVnet: true })
  let savingsPage: SavingsPageObject
  let convertStablesDialog: ConvertStablesDialogPageObject

  test.beforeEach(async ({ page }) => {
    await setup(page, fork, {
      initialPage: 'savings',
      account: {
        type: 'connected-random',
        assetBalances: {
          ETH: 1,
          DAI: 10_000,
        },
      },
    })

    savingsPage = new SavingsPageObject(page)
    await savingsPage.clickConvertStablesButtonAction()

    convertStablesDialog = new ConvertStablesDialogPageObject(page)
    await convertStablesDialog.selectAssetInAction('DAI')
    await convertStablesDialog.selectAssetOutAction('USDC')
    await convertStablesDialog.fillAmountInAction(10_000)
  })

  test('uses psm convert action', async () => {
    await convertStablesDialog.actionsContainer.expectEnabledActionAtIndex(0)
    await convertStablesDialog.actionsContainer.expectActions([
      { type: 'approve', asset: 'DAI' },
      { type: 'psmConvert', inToken: 'DAI', outToken: 'USDC' },
    ])
  })

  test('displays transaction overview', async () => {
    await convertStablesDialog.expectTransactionOverview({
      routeItems: [
        {
          tokenAmount: '10,000.00 DAI',
          tokenUsdValue: '$10,000.00',
        },
        {
          tokenAmount: '10,000.00 USDC',
          tokenUsdValue: '$10,000.00',
        },
      ],
      outcome: '10,000.00 USDC worth $10,000.00',
      badgeTokens: 'DAI and USDC',
    })
  })

  test('executes conversion', async () => {
    await convertStablesDialog.actionsContainer.acceptAllActionsAction(2)
    await convertStablesDialog.expectSuccessPage()
    await convertStablesDialog.clickBackToSavingsButton()
    await savingsPage.expectStablecoinsInWalletAssetBalance('DAI', '-')
    await savingsPage.expectStablecoinsInWalletAssetBalance('USDC', '10,000.00')
  })
})
