export const BasePricingDetailsStructABI = {
  components: [
    {
      internalType: 'uint256',
      name: 'rate',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: 'carryRate',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: 'decimals',
      type: 'uint256',
    },
  ],
  internalType: 'struct BasePricing.Details',
  name: '',
  type: 'tuple',
} as const
