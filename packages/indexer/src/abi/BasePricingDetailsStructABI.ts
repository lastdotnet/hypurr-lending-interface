export const BasePricingDetailsStructABI = {
  name: '',
  type: 'tuple',
  internalType: 'struct BasePricing.Details',
  components: [
    {
      name: 'rate',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'carryRate',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'decimals',
      type: 'uint256',
      internalType: 'uint256',
    },
  ],
} as const;
