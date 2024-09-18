import { usdsSkyRewardsConfig } from '@/config/contracts-generated'
import { getContractAddress } from '@/domain/hooks/useContractAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { getBalancesQueryKeyPrefix } from '@/domain/wallet/getBalancesQueryKeyPrefix'
import { getMockToken, testAddresses } from '@/test/integration/constants'
import { handlers } from '@/test/integration/mockTransport'
import { setupUseContractActionRenderer } from '@/test/integration/setupUseContractActionRenderer'
import { toBigInt } from '@/utils/bigNumber'
import { waitFor } from '@testing-library/react'
import { mainnet } from 'viem/chains'
import { describe, test } from 'vitest'
import { allowanceQueryKey } from '../../approve/logic/query'
import { createStakeActionConfig } from './stakeAction'

const account = testAddresses.alice
const chainId = mainnet.id
const stakingToken = getMockToken({ symbol: TokenSymbol('USDS') })
const rewardToken = getMockToken({ symbol: TokenSymbol('SKY') })
const stakeAmount = NormalizedUnitNumber(1)

const hookRenderer = setupUseContractActionRenderer({
  account,
  handlers: [handlers.chainIdCall({ chainId }), handlers.balanceCall({ balance: 0n, address: account })],
  args: {
    action: {
      type: 'stake',
      farm: getContractAddress(usdsSkyRewardsConfig.address, chainId),
      stakeAmount,
      stakingToken,
      rewardToken,
    },
    enabled: true,
  },
})

describe(createStakeActionConfig.name, () => {
  test('stakes into farm', async () => {
    const { result, queryInvalidationManager } = hookRenderer({
      extraHandlers: [
        handlers.contractCall({
          to: getContractAddress(usdsSkyRewardsConfig.address, chainId),
          abi: usdsSkyRewardsConfig.abi,
          functionName: 'stake',
          args: [toBigInt(stakingToken.toBaseUnit(stakeAmount))],
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

    await expect(queryInvalidationManager).toHaveReceivedInvalidationCall(
      getBalancesQueryKeyPrefix({ account, chainId }),
    )
    await expect(queryInvalidationManager).toHaveReceivedInvalidationCall(
      allowanceQueryKey({
        token: stakingToken.address,
        spender: getContractAddress(usdsSkyRewardsConfig.address, chainId),
        account,
        chainId,
      }),
    )
  })
})