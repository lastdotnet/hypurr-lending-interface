export const V1LenderDetailsStructABI = {
  components: [
    {
      internalType: 'bool',
      name: 'matchIdentifier',
      type: 'bool',
    },
    {
      internalType: 'uint256',
      name: 'minDebtAmount',
      type: 'uint256',
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
  ],
  internalType: 'struct AstariaV1LenderEnforcer.Details',
  name: '',
  type: 'tuple',
} as const
