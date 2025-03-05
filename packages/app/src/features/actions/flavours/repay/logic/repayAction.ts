import { poolAbi } from '@/config/abis/poolAbi'
import { InterestRate, NATIVE_ASSET_MOCK_ADDRESS } from '@/config/consts'
import { lendingPoolConfig, wethGatewayConfig } from '@/config/contracts-generated'
import { getContractAddress } from '@/domain/hooks/useContractAddress'
import { ensureConfigTypes } from '@/domain/hooks/useWrite'
import { aaveDataLayerQueryKey } from '@/domain/market-info/aave-data-layer/query'
import { getBalancesQueryKeyPrefix } from '@/domain/wallet/getBalancesQueryKeyPrefix'
import { allowanceQueryKey } from '@/features/actions/flavours/approve/logic/query'
import { toBigInt } from '@/utils/bigNumber'
import { getTimestampInSeconds } from '@/utils/time'
import { QueryKey, queryOptions } from '@tanstack/react-query'
import { ActionConfig, ActionContext, VerifyTransactionResultBase } from '../../../logic/types'
import { RepayAction } from '../types'

export function createRepayActionConfig(action: RepayAction, context: ActionContext): ActionConfig {
  const { marketInfo } = context
  const { account, chainId, permitStore } = context
  const lendingPool = getContractAddress(lendingPoolConfig.address, chainId)
  const wethGateway = getContractAddress(wethGatewayConfig.address, chainId)

  return {
    verifyTransactionQueryOptions: () => {
      if (!marketInfo) {
        return queryOptions<any, Error, VerifyTransactionResultBase, QueryKey>({
          queryKey: ['repay-verification-skipped'] as QueryKey,
          queryFn: () => ({ success: true }),
        })
      }

      const position = marketInfo.findOnePositionByToken(action.reserve.token)
      const repayValue = toBigInt(action.reserve.token.toBaseUnit(action.value))

      return queryOptions<any, Error, VerifyTransactionResultBase, QueryKey>({
        queryKey: ['repay-verification', action.reserve.token.address, repayValue.toString()] as QueryKey,
        queryFn: () => {
          const currentDebt = toBigInt(action.reserve.token.toBaseUnit(position.borrowBalance))
          const tolerance = repayValue / 1000n // 0.1% of repay value
          const success = currentDebt === 0n || (repayValue >= currentDebt) || (currentDebt - repayValue <= tolerance)
          
          return { success }
        },
      })
    },
    
    getWriteConfig: () => {
      const useAToken = action.useAToken
      const token = action.reserve.token

      const interestRateMode = BigInt(InterestRate.Variable)
      const value = toBigInt(token.toBaseUnit(action.value))
      const permit = permitStore?.find(token)

      if (useAToken) {
        return ensureConfigTypes({
          address: lendingPool,
          abi: poolAbi,
          functionName: 'repayWithATokens',
          args: [token.address, value, interestRateMode],
        })
      }

      if (permit) {
        return ensureConfigTypes({
          address: lendingPool,
          abi: poolAbi,
          functionName: 'repayWithPermit',
          args: [
            token.address,
            value,
            interestRateMode,
            account,
            toBigInt(getTimestampInSeconds(permit.deadline)),
            Number(permit.signature.v),
            permit.signature.r,
            permit.signature.s,
          ],
        })
      }

      if (token.address === NATIVE_ASSET_MOCK_ADDRESS) {
        return ensureConfigTypes({
          address: wethGateway,
          abi: wethGatewayConfig.abi,
          functionName: 'repayETH',
          args: [lendingPool, value, interestRateMode, account],
          value,
        })
      }

      return ensureConfigTypes({
        address: lendingPool,
        abi: poolAbi,
        functionName: 'repay',
        args: [token.address, value, interestRateMode, account],
      })
    },

    invalidates: () => [
      getBalancesQueryKeyPrefix({ chainId, account }),
      aaveDataLayerQueryKey({ chainId, account, refetchEnabled: true }),
      allowanceQueryKey({ token: action.reserve.token.address, spender: lendingPool, account, chainId }),
    ],
  }
}
