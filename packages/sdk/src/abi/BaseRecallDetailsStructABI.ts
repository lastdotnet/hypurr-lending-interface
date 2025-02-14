export const BaseRecallDetailsStructABI = {
  components: [
    {
      internalType: 'uint256',
      name: 'honeymoon',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: 'recallWindow',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: 'recallMax',
      type: 'uint256',
    },
  ],
  internalType: 'struct BaseRecall.Details',
  name: '',
  type: 'tuple',
} as const;
