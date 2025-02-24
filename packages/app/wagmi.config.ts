import { defineConfig } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'
import { base, gnosis, mainnet } from 'wagmi/chains'
import { z } from 'zod'
import { capAutomatorABI } from './abis/evm/capAutomator'
import { collectorABI } from './abis/evm/collector'
import { lendingPoolABI } from './abis/evm/lendingPool'
import { lendingPoolAddressProviderABI } from './abis/evm/lendingPoolAddressProvider'
import { uiIncentiveDataProviderABI } from './abis/evm/uiIncentiveDataProvider'
import { uiPoolDataProviderABI } from './abis/evm/uiPoolDataProvider'
import { usdxlTokenABI } from './abis/evm/usdxlToken'
import { walletBalanceProviderABI } from './abis/evm/walletBalanceProvider'
import { wethGatewayABI } from './abis/evm/wethGateway'

import 'dotenv/config'

const HYPEREVM_TESTNET_ID = 998
const HYPEREVM_ID = 999

const config: ReturnType<typeof defineConfig> = defineConfig({
  out: 'src/config/contracts-generated.ts',
  contracts: [
    {
      name: 'UsdxlToken',
      abi: usdxlTokenABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0xfc446B60a054703A9DC096dd397a6e3cdd614275',
        [HYPEREVM_ID]: '0x0000000000000000000000000000000000000000',
      },
    },
    {
      name: 'LendingPoolAddressProvider', // poolAddressesProvider
      abi: lendingPoolAddressProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x8c52538C6c94a80fC907279A32d3aA9D51C9f2d3',
        [HYPEREVM_ID]: '0xA73ff12D177D8F1Ec938c3ba0e87D33524dD5594',
      },
    },
    {
      name: 'LendingPool', // pool
      abi: lendingPoolABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x4073283812dfD8fff8430c1Ec8f88A68f984Aec3',
        [HYPEREVM_ID]: '0xceCcE0EB9DD2Ef7996e01e25DD70e461F918A14b',
      },
    },
    {
      name: 'WETHGateway', // wrappedHypeGateway
      abi: wethGatewayABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x41F478CdB072fc4Cad96881413f73Aba5c8a90e0',
        [HYPEREVM_ID]: '0xd1EF87FeFA83154F83541b68BD09185e15463972',
      },
    },
    {
      name: 'WalletBalanceProvider', // walletBalanceProvider
      abi: walletBalanceProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x22473C5a8EC020024aDC74E9dD9B17D8037eAb4B',
        [HYPEREVM_ID]: '0xE913De89D8c868aEF96D3b10dAAE1900273D7Bb2',
      },
    },
    {
      name: 'UiPoolDataProvider', // uiPoolDataProvider
      abi: uiPoolDataProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x2393Af1E61649ABe6BC37983a4190245e6D5A363',
        [HYPEREVM_ID]: '0x7b883191011AEAe40581d3Fa1B112413808C9c00',
      },
    },
    {
      name: 'UiIncentiveDataProvider', // uiIncentiveDataProvider
      abi: uiIncentiveDataProviderABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0xCdC9497Cea167846b17FD72635f73eE119d64B9D',
        [HYPEREVM_ID]: '0x8ebA6fc4Ff6Ba4F12512DD56d0E4aaC6081f5274',
      },
    },
    {
      name: 'Collector', // treasury
      abi: collectorABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0x9b19287cdC0D2062a8BEAbA004Fc93353fc255b9',
        [HYPEREVM_ID]: '0xdC6E5b7aA6fCbDECC1Fda2b1E337ED8569730288',
      },
    },
    {
      name: 'CapAutomator',
      abi: capAutomatorABI,
      address: {
        [HYPEREVM_TESTNET_ID]: '0xe6ad1ffa197B2ae9a9daCEf2A52acbC8325782C0',
        [HYPEREVM_ID]: '0x47743A77ef5E6675f4C022E643943Ae7D8D58A43',
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
