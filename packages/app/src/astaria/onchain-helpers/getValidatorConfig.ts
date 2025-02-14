import { type ChainId } from 'chains'

import { Contracts } from '@/astaria/types-internal/contract-types'
import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

export const getValidatorConfig = ({ chainId }: { chainId: ChainId }) => ({
  custodian: getContractAddress({ chainId, contractName: Contracts.Custodian }),
  expectedHoneymoon: TRANSMIT_INTENT_PARAMS.honeymoonPeriod,
  expectedRecallWindow: TRANSMIT_INTENT_PARAMS.recallWindow,
  starport: getContractAddress({ chainId, contractName: Contracts.Starport }),
  validPricingModules: [getContractAddress({ chainId, contractName: Contracts.V1Pricing })],
  validSettlementModules: [getContractAddress({ chainId, contractName: Contracts.V1Settlement })],
  validStatusModules: [getContractAddress({ chainId, contractName: Contracts.V1Status })],
})
