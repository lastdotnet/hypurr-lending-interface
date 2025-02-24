export const AstariaV1SettlementABI = [
  {
    inputs: [
      {
        internalType: 'contract Starport',
        name: 'SP_',
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
    name: 'getSettlementConsideration',
    outputs: [
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
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct ReceivedItem[]',
        name: 'consideration',
        type: 'tuple[]',
      },
      {
        internalType: 'address',
        name: 'authorized',
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
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
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
        name: '',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'postRepayment',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
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
        name: '',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'postSettlement',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
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
] as const
