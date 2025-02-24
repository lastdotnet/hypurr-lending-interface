export const AstariaV1StatusABI = [
  {
    inputs: [
      {
        internalType: 'contract Starport',
        name: 'SP_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'SP',
    outputs: [
      {
        internalType: 'contract Starport',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'custodian',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'originator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'collateral',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'debt',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'status',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'statusData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'pricing',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'pricingData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'settlement',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'settlementData',
                type: 'bytes',
              },
            ],
            internalType: 'struct Starport.Terms',
            name: 'terms',
            type: 'tuple',
          },
        ],
        internalType: 'struct Starport.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'getRecallRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'custodian',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'originator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'collateral',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'debt',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'status',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'statusData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'pricing',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'pricingData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'settlement',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'settlementData',
                type: 'bytes',
              },
            ],
            internalType: 'struct Starport.Terms',
            name: 'terms',
            type: 'tuple',
          },
        ],
        internalType: 'struct Starport.Loan',
        name: 'loan',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'isActive',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'custodian',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'originator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'collateral',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'debt',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'status',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'statusData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'pricing',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'pricingData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'settlement',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'settlementData',
                type: 'bytes',
              },
            ],
            internalType: 'struct Starport.Terms',
            name: 'terms',
            type: 'tuple',
          },
        ],
        internalType: 'struct Starport.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'isRecalled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: 'result',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'result',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'custodian',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'originator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'collateral',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'debt',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'status',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'statusData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'pricing',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'pricingData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'settlement',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'settlementData',
                type: 'bytes',
              },
            ],
            internalType: 'struct Starport.Terms',
            name: 'terms',
            type: 'tuple',
          },
        ],
        internalType: 'struct Starport.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'recall',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'recalls',
    outputs: [
      {
        internalType: 'address payable',
        name: 'recaller',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: 'start',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'custodian',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'originator',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'collateral',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'enum ItemType',
                name: 'itemType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'identifier',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct SpentItem[]',
            name: 'debt',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'status',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'statusData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'pricing',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'pricingData',
                type: 'bytes',
              },
              {
                internalType: 'address',
                name: 'settlement',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'settlementData',
                type: 'bytes',
              },
            ],
            internalType: 'struct Starport.Terms',
            name: 'terms',
            type: 'tuple',
          },
        ],
        internalType: 'struct Starport.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'validate',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'loanId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recaller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    name: 'Recalled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'AlreadyInitialized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPricingContract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRecaller',
    type: 'error',
  },
  {
    inputs: [],
    name: 'IsLocked',
    type: 'error',
  },
  {
    inputs: [],
    name: 'IsPaused',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LoanDoesNotExist',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NewOwnerIsZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoHandoverRequest',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotPaused',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RecallAlreadyExists',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RecallBeforeHoneymoonExpiry',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
] as const
