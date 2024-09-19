import { usdsSkyRewardsConfig } from '@/config/contracts-generated'
import { getFarmsInfoQueryKey } from '@/domain/farms/query'
import { getContractAddress } from '@/domain/hooks/useContractAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { getBalancesQueryKeyPrefix } from '@/domain/wallet/getBalancesQueryKeyPrefix'
import { getMockToken, testAddresses } from '@/test/integration/constants'
import { handlers } from '@/test/integration/mockTransport'
import { setupUseContractActionRenderer } from '@/test/integration/setupUseContractActionRenderer'
import { waitFor } from '@testing-library/react'
import { mainnet } from 'viem/chains'
import { describe, test } from 'vitest'
import { createClaimFarmRewardsActionConfig } from './claimFarmRewardsAction'

const account = testAddresses.alice
const chainId = mainnet.id
const rewardToken = getMockToken({ symbol: TokenSymbol('USDS') })
const rewardAmount = NormalizedUnitNumber(1)

const hookRenderer = setupUseContractActionRenderer({
  account,
  handlers: [handlers.chainIdCall({ chainId }), handlers.balanceCall({ balance: 0n, address: account })],
  args: {
    action: {
      type: 'claimFarmRewards',
      farm: getContractAddress(usdsSkyRewardsConfig.address, chainId),
      rewardToken,
      rewardAmount,
    },
    enabled: true,
  },
})

describe(createClaimFarmRewardsActionConfig.name, () => {
  test('claims farm rewards', async () => {
    const { result, queryInvalidationManager } = hookRenderer({
      extraHandlers: [
        handlers.contractCall({
          to: getContractAddress(usdsSkyRewardsConfig.address, chainId),
          abi: usdsSkyRewardsConfig.abi,
          functionName: 'getReward',
          from: account,
          result: undefined,
        }),
        handlers.mineTransaction(),
      ],
    })

    await waitFor(() => {
      expect(result.current.state.status).toBe('ready')
    })

    result.current.onAction()

    await waitFor(() => {
      expect(result.current.state.status).toBe('success')
    })

    await expect(queryInvalidationManager).toHaveReceivedInvalidationCall(getFarmsInfoQueryKey({ account, chainId }))
    await expect(queryInvalidationManager).toHaveReceivedInvalidationCall(
      getBalancesQueryKeyPrefix({ account, chainId }),
    )
  })
})