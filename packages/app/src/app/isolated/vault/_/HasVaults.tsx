'use client'

import { useState } from 'react'

import { base } from 'viem/chains'

import { VaultsButton } from '@/app/isolated/vault/_/VaultsButton'
import { vaultsColumns } from '@/app/isolated/vault/_/vaultsColumns'
import { Card } from '@/astaria/components/Card'
import { DataTable } from '@/astaria/components/DataTable'
import { Heading } from '@/astaria/components/Heading'

import { getERC20TokenBySymbol } from 'assets'

export const HasVaults = () => {
  const [withdrawInProgress, setWithdrawInProgress] = useState(false)
  const isFetchingNextPage = false // TODO
  const isRefetching = false // TODO
  const USDC = getERC20TokenBySymbol({
    chainId: base.id,
    symbol: 'USDC',
  })
  const vaults = [
    {
      balance: 12345678901n,
      erc20: { ...USDC, usdValue: 1 }, // TODO: get USD value data
      usage: 123456789n,
      usdValueBalance: 12345.678901, // TODO: get data. Can be done like it is in transformAssetDetail via fetchUSDValue and then getUSDValue
      usdValueUsage: 123.456789, // TODO: get data. Can be done like it is in transformAssetDetail via fetchUSDValue and then getUSDValue
    },
  ]
  const vaultUsage = vaults.reduce((sum, { usage }) => sum + usage, 0n)
  const hasVaultUsage = vaultUsage > 0

  return (
    <>
      {withdrawInProgress ? (
        <Card className="flex flex-col items-center py-16">
          <Heading className="max-w-sm text-center" level={2}>
            Your withdrawal is in progress. This may take up to 24 hours.
          </Heading>
          <p className="text-center">
            Your outstanding loans using vault funds are being recalled to find new lenders.
            <br />
            Once this is complete, funds will be returned to your wallet.
          </p>
        </Card>
      ) : null}
      <Card>
        <DataTable
          columns={vaultsColumns}
          data={vaults}
          isFetchingNextPage={isFetchingNextPage}
          isRefetching={isRefetching}
        />
        <VaultsButton
          erc20={{ ...vaults[0].erc20, amount: vaults[0].balance }} // TODO
          hasVaultUsage={hasVaultUsage}
          setWithdrawInProgress={setWithdrawInProgress}
          withdrawInProgress={withdrawInProgress}
        />
      </Card>
    </>
  )
}
