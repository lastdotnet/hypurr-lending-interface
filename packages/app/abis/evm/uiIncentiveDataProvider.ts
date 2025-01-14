export const uiIncentiveDataProviderABI = [
  {
    "type": "function",
    "name": "getFullReservesIncentiveData",
    "inputs": [
      {
        "name": "provider",
        "type": "address",
        "internalType": "contract IPoolAddressesProvider"
      },
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[]",
        "components": [
          {
            "name": "underlyingAsset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "aIncentiveData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.IncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "rewardsTokenInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "emissionPerSecond",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "incentivesLastUpdateTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "emissionEndTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "precision",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "vIncentiveData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.IncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "rewardsTokenInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "emissionPerSecond",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "incentivesLastUpdateTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "emissionEndTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "precision",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "sIncentiveData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.IncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "rewardsTokenInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "emissionPerSecond",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "incentivesLastUpdateTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "emissionEndTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "precision",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct IUiIncentiveDataProviderV3.UserReserveIncentiveData[]",
        "components": [
          {
            "name": "underlyingAsset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "aTokenIncentivesUserData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.UserIncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "userRewardsInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.UserRewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "userUnclaimedRewards",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesUserIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "vTokenIncentivesUserData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.UserIncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "userRewardsInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.UserRewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "userUnclaimedRewards",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesUserIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "sTokenIncentivesUserData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.UserIncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "userRewardsInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.UserRewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "userUnclaimedRewards",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesUserIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getReservesIncentivesData",
    "inputs": [
      {
        "name": "provider",
        "type": "address",
        "internalType": "contract IPoolAddressesProvider"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[]",
        "components": [
          {
            "name": "underlyingAsset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "aIncentiveData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.IncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "rewardsTokenInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "emissionPerSecond",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "incentivesLastUpdateTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "emissionEndTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "precision",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "vIncentiveData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.IncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "rewardsTokenInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "emissionPerSecond",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "incentivesLastUpdateTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "emissionEndTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "precision",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "sIncentiveData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.IncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "rewardsTokenInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "emissionPerSecond",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "incentivesLastUpdateTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "emissionEndTimestamp",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "precision",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserReservesIncentivesData",
    "inputs": [
      {
        "name": "provider",
        "type": "address",
        "internalType": "contract IPoolAddressesProvider"
      },
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct IUiIncentiveDataProviderV3.UserReserveIncentiveData[]",
        "components": [
          {
            "name": "underlyingAsset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "aTokenIncentivesUserData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.UserIncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "userRewardsInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.UserRewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "userUnclaimedRewards",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesUserIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "vTokenIncentivesUserData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.UserIncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "userRewardsInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.UserRewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "userUnclaimedRewards",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesUserIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          },
          {
            "name": "sTokenIncentivesUserData",
            "type": "tuple",
            "internalType": "struct IUiIncentiveDataProviderV3.UserIncentiveData",
            "components": [
              {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "incentiveControllerAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "userRewardsInformation",
                "type": "tuple[]",
                "internalType": "struct IUiIncentiveDataProviderV3.UserRewardInfo[]",
                "components": [
                  {
                    "name": "rewardTokenSymbol",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "rewardOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "rewardTokenAddress",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "userUnclaimedRewards",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "tokenIncentivesUserIndex",
                    "type": "uint256",
                    "internalType": "uint256"
                  },
                  {
                    "name": "rewardPriceFeed",
                    "type": "int256",
                    "internalType": "int256"
                  },
                  {
                    "name": "priceFeedDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  },
                  {
                    "name": "rewardTokenDecimals",
                    "type": "uint8",
                    "internalType": "uint8"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  }
] as const
