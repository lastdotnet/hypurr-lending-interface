import { zeroAddress } from 'viem'
import { mainnet } from 'viem/chains'

import { numberToBigInt } from 'common'

import { type Asset, type ERC20, type ERC721, getERC20TokenBySymbol } from 'assets'

const tokensAndValues = [
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'DAI',
    }),
    usdValue: 0.9995,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'LINK',
    }),
    usdValue: 17.92,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'MATIC',
    }),
    usdValue: 0.8156,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'MKR',
    }),
    usdValue: 2000.37,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'UNI',
    }),
    usdValue: 6.2,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'USDC',
    }),
    usdValue: 1,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'USDT',
    }),
    usdValue: 0.9991,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'WETH',
    }),
    usdValue: 2309.64,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'WBTC',
    }),
    usdValue: 42062.94,
  },
  {
    ...getERC20TokenBySymbol({
      chainId: mainnet.id,
      symbol: 'wstETH',
    }),
    usdValue: 2310.65,
  },
]

// update values from https://nftpricefloor.com
const nftsAndValues: ERC721[] = [
  {
    address: zeroAddress,
    collection: {
      name: 'CryptoPunks',
    },
    image: '/assets/images/nfts/punk-tiny.webp',
    tokenId: 1838n,
    usdValue: 141118.7,
  },
  {
    address: zeroAddress,
    collection: {
      name: 'Bored Ape Yacht Club',
    },
    image: '/assets/images/nfts/bored-ape-tiny.webp',
    tokenId: 1456n,
    usdValue: 56234.57,
  },
  {
    address: zeroAddress,
    collection: {
      name: 'Azuki',
    },
    image: '/assets/images/nfts/azuki-tiny.webp',
    tokenId: 4587n,
    usdValue: 14763.34,
  },
  {
    address: zeroAddress,
    collection: {
      name: 'Milady Maker',
    },
    image: '/assets/images/nfts/milady-tiny.webp',
    tokenId: 4212n,
    usdValue: 5686.01,
  },
]

const randomNumber = ({ max, min }: { max: number; min: number }) => Math.random() * (max - min) + min

const getRandomERC20Token = () => tokensAndValues[Math.floor(Math.random() * tokensAndValues.length)]

const getCollateralAmount = ({
  collateralTotalValue,
  collateralValue,
}: {
  collateralTotalValue: number
  collateralValue: number
}) => collateralTotalValue / collateralValue
const getAskingAmount = ({
  askingAmount,
  collateralTotalValue,
}: {
  askingAmount: number
  collateralTotalValue: number
}) => collateralTotalValue / askingAmount

const generateMockERC20Intent = () => {
  const collateral = getRandomERC20Token()
  const collateralTotalValue = randomNumber({ max: 1000000, min: 100 })
  const collateralAmount = getCollateralAmount({
    collateralTotalValue,
    collateralValue: collateral.usdValue,
  })
  const asking = getRandomERC20Token()
  const askingAmount = getAskingAmount({
    askingAmount: asking.usdValue,
    collateralTotalValue,
  })

  const mockERC20Intent: {
    asking: ERC20
    collateral: Asset
    id: string
  } = {
    asking: {
      ...asking,
      amount: numberToBigInt({
        amount: askingAmount,
        decimals: asking.decimals,
      }),
    },
    collateral: {
      ...collateral,
      amount: numberToBigInt({
        amount: collateralAmount,
        decimals: collateral.decimals,
      }),
    },
    id: `${asking.symbol}-${askingAmount}-${collateral.symbol}-${collateralAmount}`,
  }

  return mockERC20Intent
}
const mockERC20Intents = (amount: number) => [...Array(amount).keys()].map(() => generateMockERC20Intent())

const mockERC721Intent = (erc721: ERC721) => {
  const collateral = erc721
  const collateralTotalValue = randomNumber({ max: 1000000, min: 100 })
  const asking = getRandomERC20Token()
  const askingAmount = getAskingAmount({
    askingAmount: asking.usdValue,
    collateralTotalValue,
  })

  const mockERC721Intent: {
    asking: ERC20
    collateral: ERC721
    id: string
  } = {
    asking: {
      ...asking,
      amount: numberToBigInt({
        amount: askingAmount,
        decimals: asking.decimals,
      }),
    },
    collateral,
    id: `${asking.symbol}-${askingAmount}-${collateral.collection.name}-${collateral.tokenId.toString()}`,
  }
  return mockERC721Intent
}
const mockERC721Intents = () => nftsAndValues.map((erc721) => mockERC721Intent({ ...erc721 }))

const shuffleIntentsArray = (
  array: {
    asking: ERC20
    collateral: Asset
    id: string
  }[],
) => {
  for (let index = array.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[array[index], array[other]] = [array[other], array[index]]
  }
  return array
}

export const getMockIntents = ({ amount }: { amount: number }) => {
  const numberOfERC721Intents = nftsAndValues.length + 1
  const numberOfERC20Intents = amount - numberOfERC721Intents

  const mockIntents = [...mockERC721Intents(), ...mockERC20Intents(numberOfERC20Intents)]
  return shuffleIntentsArray(mockIntents)
}
