export const BaseRecallDetailsStructABI = {
  name: '',
  type: 'tuple',
  internalType: 'struct BaseRecall.Details',
  components: [
    {
      name: 'honeymoon',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'recallWindow',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'recallMax',
      type: 'uint256',
      internalType: 'uint256',
    },
  ],
} as const
