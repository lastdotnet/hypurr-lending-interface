import { type Address, zeroAddress } from 'viem'
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

import { Contracts } from '@/astaria/types-internal/contract-types'

import { CONTRACTS, FOUNDRY_CONTRACTS } from 'contracts-internal'

const productionContracts = {
  [Contracts.Consideration]: CONTRACTS.Consideration,
  [Contracts.Custodian]: CONTRACTS.Custodian,
  [Contracts.Starport]: CONTRACTS.Starport,
  [Contracts.TestERC20]: CONTRACTS.TestERC20,
  [Contracts.TestERC721]: CONTRACTS.TestERC721,
  [Contracts.V1BorrowerEnforcer]: CONTRACTS.V1BorrowerEnforcer,
  [Contracts.V1LenderEnforcer]: CONTRACTS.V1LenderEnforcer,
  [Contracts.V1Pricing]: CONTRACTS.V1Pricing,
  [Contracts.V1Settlement]: CONTRACTS.V1Settlement,
  [Contracts.V1Status]: CONTRACTS.V1Status,
}

export type AddressMap = Record<ChainId, Record<Contracts, Address>>

export const addressMap: AddressMap = {
  [base.id]: {
    ...productionContracts,
    [Contracts.TestERC20]: zeroAddress,
    [Contracts.TestERC721]: zeroAddress,
  },
  [foundry.id]: {
    [Contracts.Consideration]: FOUNDRY_CONTRACTS.Consideration,
    [Contracts.Custodian]: FOUNDRY_CONTRACTS.Custodian,
    [Contracts.Starport]: FOUNDRY_CONTRACTS.Starport,
    [Contracts.TestERC20]: FOUNDRY_CONTRACTS.TestERC20,
    [Contracts.TestERC721]: FOUNDRY_CONTRACTS.TestERC721,
    [Contracts.V1BorrowerEnforcer]: FOUNDRY_CONTRACTS.V1BorrowerEnforcer,
    [Contracts.V1LenderEnforcer]: FOUNDRY_CONTRACTS.V1LenderEnforcer,
    [Contracts.V1Pricing]: FOUNDRY_CONTRACTS.V1Pricing,
    [Contracts.V1Settlement]: FOUNDRY_CONTRACTS.V1Settlement,
    [Contracts.V1Status]: FOUNDRY_CONTRACTS.V1Status,
  },
  [mainnet.id]: productionContracts,
  [mode.id]: {
    ...productionContracts,
    [Contracts.TestERC20]: zeroAddress,
    [Contracts.TestERC721]: zeroAddress,
  },
  [sepolia.id]: productionContracts,
} as const
