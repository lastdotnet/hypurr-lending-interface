export const AstariaV1PricingABI = [
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
        internalType: 'uint256',
        name: 'delta_t',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'decimals',
        type: 'uint256',
      },
    ],
    name: 'calculateInterest',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
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
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'decimals',
        type: 'uint256',
      },
    ],
    name: 'getInterest',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
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
    name: 'getPaymentConsideration',
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
        ],
        internalType: 'struct SpentItem[]',
        name: 'repayConsideration',
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
        name: 'carryConsideration',
        type: 'tuple[]',
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
        name: 'newPricingData',
        type: 'bytes',
      },
      {
        internalType: 'address',
        name: 'fulfiller',
        type: 'address',
      },
    ],
    name: 'getRefinanceConsideration',
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
        ],
        internalType: 'struct SpentItem[]',
        name: 'repayConsideration',
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
        name: 'carryConsideration',
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
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
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
        internalType: 'struct AdditionalTransfer[]',
        name: 'recallConsideration',
        type: 'tuple[]',
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
    name: 'validate',
    outputs: [
      {
        internalType: 'bytes4',
        name: 'selector',
        type: 'bytes4',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'InsufficientRefinance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRefinance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LoanIsNotRecalled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RateExceedMaxRecallRate',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RateTooLow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnsupportedDecimalValue',
    type: 'error',
  },
] as const;
