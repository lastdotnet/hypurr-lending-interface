export const capAutomatorABI = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'poolAddressesProvider',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'borrowCapConfigs',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'max',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'gap',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'increaseCooldown',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'lastUpdateBlock',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'lastIncreaseTime',
        type: 'uint48',
        internalType: 'uint48',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'exec',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'newSupplyCap',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'newBorrowCap',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'execBorrow',
    inputs: [
      {
        name: 'asset',
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'execSupply',
    inputs: [
      {
        name: 'asset',
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
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
    name: 'pool',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IPool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'poolConfigurator',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IPoolConfigurator',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'removeBorrowCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeSupplyCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setBorrowCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'max',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'gap',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'increaseCooldown',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setSupplyCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'max',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'gap',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'increaseCooldown',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supplyCapConfigs',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'max',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'gap',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'increaseCooldown',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'lastUpdateBlock',
        type: 'uint48',
        internalType: 'uint48',
      },
      {
        name: 'lastIncreaseTime',
        type: 'uint48',
        internalType: 'uint48',
      },
    ],
    stateMutability: 'view',
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
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
    name: 'RemoveBorrowCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RemoveSupplyCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetBorrowCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'max',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'gap',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'increaseCooldown',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetSupplyCapConfig',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'max',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'gap',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'increaseCooldown',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpdateBorrowCap',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'oldBorrowCap',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newBorrowCap',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpdateSupplyCap',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'oldSupplyCap',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newSupplyCap',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
] as const
