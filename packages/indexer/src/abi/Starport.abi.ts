export const ABI_JSON = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'seaport_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'stargate_',
        type: 'address',
        internalType: 'contract Stargate',
      },
      {
        name: 'owner_',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'BPS_DENOMINATOR',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint88',
        internalType: 'uint88',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'CACHED_DOMAIN_SEPARATOR',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'CAVEAT_TYPEHASH',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'DEFAULT_CUSTODIAN_CODE_HASH',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'EIP_DOMAIN',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'INTENT_ORIGINATION_TYPEHASH',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'LOAN_CLOSED_FLAG',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'LOAN_OPEN_FLAG',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MAX_FEE_RAKE_BPS',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint88',
        internalType: 'uint88',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'NAME',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'SG',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract Stargate',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'VERSION',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'acquireTokens',
    inputs: [
      {
        name: 'items',
        type: 'tuple[]',
        internalType: 'struct SpentItem[]',
        components: [
          {
            name: 'itemType',
            type: 'uint8',
            internalType: 'enum ItemType',
          },
          {
            name: 'token',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'identifier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'applyRefinanceConsiderationToLoan',
    inputs: [
      {
        name: 'considerationPayment',
        type: 'tuple[]',
        internalType: 'struct SpentItem[]',
        components: [
          {
            name: 'itemType',
            type: 'uint8',
            internalType: 'enum ItemType',
          },
          {
            name: 'token',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'identifier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'carryPayment',
        type: 'tuple[]',
        internalType: 'struct SpentItem[]',
        components: [
          {
            name: 'itemType',
            type: 'uint8',
            internalType: 'enum ItemType',
          },
          {
            name: 'token',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'identifier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'newDebt',
        type: 'tuple[]',
        internalType: 'struct SpentItem[]',
        components: [
          {
            name: 'itemType',
            type: 'uint8',
            internalType: 'enum ItemType',
          },
          {
            name: 'token',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'identifier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'approvals',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'enum Starport.ApprovalType',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'cancelOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'caveatNonces',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'chainId',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'closed',
    inputs: [
      {
        name: 'loanId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'completeOwnershipHandover',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'defaultFeeRakeBps',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'domainSeparator',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeOverrides',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'enabled',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'bpsOverride',
        type: 'uint88',
        internalType: 'uint88',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeTo',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'hashCaveatWithSaltAndNonce',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'singleUse',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'salt',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'deadline',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'caveats',
        type: 'tuple[]',
        internalType: 'struct CaveatEnforcer.Caveat[]',
        components: [
          {
            name: 'enforcer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'incrementCaveatNonce',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'invalidSalts',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'invalidateCaveatSalt',
    inputs: [
      {
        name: 'salt',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'loanState',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'open',
    inputs: [
      {
        name: 'loanId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'originate',
    inputs: [
      {
        name: 'additionalTransfers',
        type: 'tuple[]',
        internalType: 'struct AdditionalTransfer[]',
        components: [
          {
            name: 'itemType',
            type: 'uint8',
            internalType: 'enum ItemType',
          },
          {
            name: 'token',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'from',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'to',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'identifier',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'borrowerCaveat',
        type: 'tuple',
        internalType: 'struct CaveatEnforcer.SignedCaveats',
        components: [
          {
            name: 'singleUse',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'salt',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'caveats',
            type: 'tuple[]',
            internalType: 'struct CaveatEnforcer.Caveat[]',
            components: [
              {
                name: 'enforcer',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'data',
                type: 'bytes',
                internalType: 'bytes',
              },
            ],
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'lenderCaveat',
        type: 'tuple',
        internalType: 'struct CaveatEnforcer.SignedCaveats',
        components: [
          {
            name: 'singleUse',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'salt',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'caveats',
            type: 'tuple[]',
            internalType: 'struct CaveatEnforcer.Caveat[]',
            components: [
              {
                name: 'enforcer',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'data',
                type: 'bytes',
                internalType: 'bytes',
              },
            ],
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'loan',
        type: 'tuple',
        internalType: 'struct Starport.Loan',
        components: [
          {
            name: 'start',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'custodian',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'borrower',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'issuer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'originator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'collateral',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'debt',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'terms',
            type: 'tuple',
            internalType: 'struct Starport.Terms',
            components: [
              {
                name: 'status',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'statusData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'pricing',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'pricingData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'settlement',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'settlementData',
                type: 'bytes',
                internalType: 'bytes',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: 'result',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownershipHandoverExpiresAt',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'refinance',
    inputs: [
      {
        name: 'lender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'lenderCaveat',
        type: 'tuple',
        internalType: 'struct CaveatEnforcer.SignedCaveats',
        components: [
          {
            name: 'singleUse',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'salt',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'caveats',
            type: 'tuple[]',
            internalType: 'struct CaveatEnforcer.Caveat[]',
            components: [
              {
                name: 'enforcer',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'data',
                type: 'bytes',
                internalType: 'bytes',
              },
            ],
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'loan',
        type: 'tuple',
        internalType: 'struct Starport.Loan',
        components: [
          {
            name: 'start',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'custodian',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'borrower',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'issuer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'originator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'collateral',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'debt',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'terms',
            type: 'tuple',
            internalType: 'struct Starport.Terms',
            components: [
              {
                name: 'status',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'statusData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'pricing',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'pricingData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'settlement',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'settlementData',
                type: 'bytes',
                internalType: 'bytes',
              },
            ],
          },
        ],
      },
      {
        name: 'pricingData',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'extraData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'requestOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'setFeeData',
    inputs: [
      {
        name: 'feeTo_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'defaultFeeRakeBps_',
        type: 'uint88',
        internalType: 'uint88',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setFeeOverride',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'bpsOverride',
        type: 'uint88',
        internalType: 'uint88',
      },
      {
        name: 'enabled',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setOriginateApproval',
    inputs: [
      {
        name: 'who',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'approvalType',
        type: 'uint8',
        internalType: 'enum Starport.ApprovalType',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settle',
    inputs: [
      {
        name: 'loan',
        type: 'tuple',
        internalType: 'struct Starport.Loan',
        components: [
          {
            name: 'start',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'custodian',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'borrower',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'issuer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'originator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'collateral',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'debt',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'terms',
            type: 'tuple',
            internalType: 'struct Starport.Terms',
            components: [
              {
                name: 'status',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'statusData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'pricing',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'pricingData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'settlement',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'settlementData',
                type: 'bytes',
                internalType: 'bytes',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'unpause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'ApprovalSet',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approvalType',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CaveatFilled',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'hash',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
      {
        name: 'salt',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CaveatNonceIncremented',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'newNonce',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CaveatSaltInvalidated',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'salt',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Close',
    inputs: [
      {
        name: 'loanId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FeeDataUpdated',
    inputs: [
      {
        name: 'feeTo',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'defaultFeeRakeBps',
        type: 'uint88',
        indexed: false,
        internalType: 'uint88',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FeeOverrideUpdated',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'overrideBps',
        type: 'uint88',
        indexed: false,
        internalType: 'uint88',
      },
      {
        name: 'enabled',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Open',
    inputs: [
      {
        name: 'loanId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'loan',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Starport.Loan',
        components: [
          {
            name: 'start',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'custodian',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'borrower',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'issuer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'originator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'collateral',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'debt',
            type: 'tuple[]',
            internalType: 'struct SpentItem[]',
            components: [
              {
                name: 'itemType',
                type: 'uint8',
                internalType: 'enum ItemType',
              },
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'identifier',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'terms',
            type: 'tuple',
            internalType: 'struct Starport.Terms',
            components: [
              {
                name: 'status',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'statusData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'pricing',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'pricingData',
                type: 'bytes',
                internalType: 'bytes',
              },
              {
                name: 'settlement',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'settlementData',
                type: 'bytes',
                internalType: 'bytes',
              },
            ],
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverCanceled',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverRequested',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'oldOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Paused',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unpaused',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CaveatDeadlineExpired',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidCaveat',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidCaveatLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidCaveatSigner',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidCustodian',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidFeeRakeBps',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidItemAmount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidItemIdentifier',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidItemTokenNoCode',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidItemType',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidLoan',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidLoanState',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidPostRepayment',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSalt',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidTransferLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'IsLocked',
    inputs: [],
  },
  {
    type: 'error',
    name: 'IsPaused',
    inputs: [],
  },
  {
    type: 'error',
    name: 'LoanExists',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MalformedRefinance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NativeAssetsNotSupported',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NewOwnerIsZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoHandoverRequest',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotLoanCustodian',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotPaused',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Unauthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UnauthorizedAdditionalTransferIncluded',
    inputs: [],
  },
] as const
