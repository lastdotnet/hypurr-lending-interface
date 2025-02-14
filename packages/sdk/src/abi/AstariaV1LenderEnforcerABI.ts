export const AstariaV1LenderEnforcerABI = [
  {
    inputs: [
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
        name: 'additionalTransfers',
        type: 'tuple[]',
      },
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
        name: 'caveatData',
        type: 'bytes',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'min',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'max',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'actual',
        type: 'uint256',
      },
    ],
    name: 'DebtAmountOOB',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DebtBundlesNotSupported',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAdditionalTransfer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLoanTerms',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LoanRateLessThanCaveatRate',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MinDebtAmountExceedsMax',
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
