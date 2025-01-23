import { defineConfig } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'
import { base, gnosis, mainnet } from 'wagmi/chains'
import { z } from 'zod'
import { lendingPoolAddressProviderABI } from './abis/evm/lendingPoolAddressProvider'
import { lendingPoolABI } from './abis/evm/lendingPool'
import { wethGatewayABI } from './abis/evm/wethGateway'
import { walletBalanceProviderABI } from './abis/evm/walletBalanceProvider'
import { uiPoolDataProviderABI } from './abis/evm/uiPoolDataProvider'
import { uiIncentiveDataProviderABI } from './abis/evm/uiIncentiveDataProvider'
import { collectorABI } from './abis/evm/collector'
import { capAutomatorABI } from './abis/evm/capAutomator'

import 'dotenv/config'

const HYPEREVM_TESTNET_ID = 998

const config: ReturnType<typeof defineConfig> = defineConfig({
  out: 'src/config/contracts-generated.ts',
  contracts: [
    {
      name: 'LendingPoolAddressProvider',
      abi: lendingPoolAddressProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0xC37cFFCe99422D4589616D7386E21A3eB890Db0F',
      },
    },
    {
      name: 'LendingPool',
      abi: lendingPoolABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x7978057A0d15e745473CEAD4456091c2b4c75e8C',
      },
    },
    {
      name: 'WETHGateway',
      abi: wethGatewayABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x3BC0B783B3936b8391473a8840397DF22996d7aC',
      },
    },
    {
      name: 'WalletBalanceProvider',
      abi: walletBalanceProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x032B5abd1657b867D43cad6874238f015E5E65bb',
      },
    },
    {
      name: 'UiPoolDataProvider',
      abi: uiPoolDataProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x855bB3a6099c4cA0d01c4402FE11D4B4CF85a49d',
      },
    },
    {
      name: 'UiIncentiveDataProvider',
      abi: uiIncentiveDataProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x87551477ceD10d50ec08682A3d3f7f4d91E892C7',
      },
    },
    {
      name: 'Collector',
      abi: collectorABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x875133496eBf9A8d2DdC786efDD394f518Ce987d',
      },
    },
    {
      name: 'CapAutomator',
      abi: capAutomatorABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x99e71778dfbf301779161E46F78B2EF2af7FA8e3',
      },
    },
  ],
  plugins: [
    etherscan({
      apiKey: z.string().parse(process.env.ETHERSCAN_API_KEY, {
        errorMap: () => ({
          message: "Couldn't process ETHERSCAN_API_KEY env variable",
        }),
      }),
      chainId: mainnet.id,
      contracts: [
        {
          /**
           * Don't see this used currently
           * */
          name: 'Chainlog',
          address: {
            [mainnet.id]: '0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F',
            // contract registry managed by governance (related to MKR DAO)
          },
        },
        {
          /**
           * Used in savings deposit/withdraw and farms
           * Also used in `useNavbar` (can be removed)
           * */
          name: 'SavingsDai',
          address: {
            [mainnet.id]: '0x83f20f44975d03b1b09e64809b757c47f942beea',
            /// SavingsDai.sol -- A tokenized representation DAI in the DSR (pot)
          },
        },
        {
          /**
           * `domain/d3m-info/D3MInfoQuery.ts
           * Used in market details only for DAI
           * */
          name: 'Vat',
          address: {
            [mainnet.id]: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B',
            /// MKR - vat.sol -- Dai CDP database
          },
        },
        {
          /**
           * `domain/d3m-info/D3MInfoQuery.ts`
           * Used in market details only for DAI
           * */
          name: 'IAMAutoLine',
          address: {
            [mainnet.id]: '0xC7Bdd1F2B16447dcf3dE045C4a039A60EC2f0ba3',
            /// debt ceilings for multi-collateral DAI
          },
        },
        {
          /**
           * Used in debug function `features/debug/index.tsx`
           * `domain/savings-info/mainnetSavingsInfo.ts`
           * Used in savings
           * */
          name: 'Pot',
          address: {
            [mainnet.id]: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
            /// pot.sol -- Dai Savings Rate
          },
        },
        {
          /**
           * Used in savings deposit/withdraw for usdc<->susds
           * */
          name: 'PSMActions',
          address: {
            [mainnet.id]: '0x5803199F1085d52D1Bb527f24Dc1A2744e80A979',
            // * @notice Actions for swapping in PSM and depositing in an ERC4626 token.
          },
        },
        {
          /**
           * `features/actions/flavours/psm-convert/logic/psmConvertAction.ts`
           * `features/actions/flavours/convert-stables/logic/createConvertStablesActions.ts`
           * Used in convert actions to convert usdc<->usds
           * */
          name: 'UsdsPsmWrapper',
          address: {
            [mainnet.id]: '0xA188EEC8F81263234dA3622A406892F3D630f98c',
            //https://etherscan.io/address/0xa188eec8f81263234da3622a406892f3d630f98c#code
          },
        },
        {
          /**
           * `features/actions/flavours/psm-convert/logic/psmConvertAction.ts`
           * `features/actions/flavours/convert-stables/logic/createConvertStablesActions.ts`
           * Used in convert actions to convert usdc<->dai
           * */
          name: 'DssLitePsm',
          address: {
            [mainnet.id]: '0xf6e72Db5454dd049d0788e411b06CfAF16853042',
            //https://etherscan.io/address/0xf6e72db5454dd049d0788e411b06cfaf16853042#code
          },
        },
        {
          /**
           * `features/actions/flavours/convert-stables/logic/createConvertStablesActions.ts`
           * Used for "upgrading" or "downgrading" dai<->usds and savings deposit/withdraw
           * */
          name: 'MigrationActions',
          address: {
            [mainnet.id]: '0xf86141a5657Cf52AEB3E30eBccA5Ad3a8f714B89',
            //https://etherscan.io/address/0xf86141a5657cf52aeb3e30ebcca5ad3a8f714b89#code
          },
        },
        {
          /**
           * Used in savings deposit/withdraw
           * */
          name: 'UsdsPsmActions',
          address: {
            [mainnet.id]: '0xd0A61F2963622e992e6534bde4D52fd0a89F39E0',
            //https://etherscan.io/address/0xd0a61f2963622e992e6534bde4d52fd0a89f39e0#code
          },
        },
      ],
    }),
    etherscan({
      apiKey: z.string().parse(process.env.GNOSISCAN_API_KEY, {
        errorMap: () => ({
          message: "Couldn't process GNOSISCAN_API_KEY env variable",
        }),
      }),
      chainId: gnosis.id,
      contracts: [
        {
          name: 'SavingsXDaiAdapter',
          address: {
            [gnosis.id]: '0xD499b51fcFc66bd31248ef4b28d656d67E591A94',
          },
        },
        {
          name: 'SavingsXDai',
          address: {
            [gnosis.id]: '0xaf204776c7245bF4147c2612BF6e5972Ee483701',
          },
        },
      ],
    }),
    etherscan({
      apiKey: z.string().parse(process.env.BASESCAN_API_KEY, {
        errorMap: () => ({
          message: "Couldn't process BASESCAN_API_KEY env variable",
        }),
      }),
      chainId: base.id,
      contracts: [
        {
          name: 'SSRAuthOracle',
          address: {
            [base.id]: '0x65d946e533748A998B1f0E430803e39A6388f7a1',
          },
        },
      ],
    }),
  ],
})

export default config
