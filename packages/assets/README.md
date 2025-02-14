# Astaria assets

## ERC20 tokens

### Adding new ERC20 tokens

1. Search for the token on Basescan, Etherscan, or the relevant blockchain explorer. Examples:
   1. DEGEN on Base is at https://basescan.org/address/0x4ed4e862860bed51a9570b96d89af5e1b0efefed
   2. Ondo on Mainnet is at https://etherscan.io/token/0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3
2. Copy the details to [data/base-tokens.json](data/base-tokens.json) or [data/sepolia-tokens.json](data/sepolia-tokens.json) as below:

```
    {
      "address": ## copy from "Token Contract",
      "chainId": ## 1 for mainnet,
      "decimals": ## copy from "With # decimals",
      "name": ## copy name from the top top row on Etherscan. Ondo for example has "Ondo (ONDO)". The first is the name.,
      "symbol": ## copy symbol from the top row on Etherscan. Ondo for example has "Ondo (ONDO)". The words in the parenthesis are the symbol.,
    }
```

3. Add an image
   1. Identify the correct icon to use. Basescan shows the token image. Otherwise, Google it.
   2. Locate an SVG. See [Locating an SVG](#Locating-an-SVG) below.
   3. Add the SVG to [data/images/erc20](data/images/erc20)
4. Run `pnpm crypto-icons:clean`
5. Run `pnpm crypto-icons:upload`
6. Run `pnpm generate-erc20-tokens`
7. Verify the diff for [src/constants/erc20Tokens.json](src/constants/erc20Tokens.json)
8. Commit & push

### Updating Coingecko or Uniswap

1. Update coingecko or uniswap
   - [data/coingecko-tokens.json](data/coingecko-tokens.json) from https://api.coingecko.com/api/v3/coins/list - put in a basic json with "tokens" as the key
   - [data/uniswap-tokens.json](data/uniswap-tokens.json) from https://gateway.ipfs.io/ipns/tokens.uniswap.org
2. Add and image for each added asset
   1. Identify the correct icon to use. Basescan shows the token image. Otherwise, Google it.
   2. Locate an SVG. See [Locating an SVG](#Locating-an-SVG) below.
   3. Add the SVG to [data/images/erc20](data/images/erc20)
3. Run `pnpm crypto-icons:clean`
4. Run `pnpm crypto-icons:upload`
5. Run `pnpm generate-erc20-tokens`
6. Verify the diff for [src/constants/erc20Tokens.json](src/constants/erc20Tokens.json)
7. Commit & push

### Locating an SVG

It is really important to use SVGs as we use icons in a few different places and the icons display in different sizes. A singular sized image will cause blurriness. SVG sources:

1. https://tokenlistooor.com/list/smolAssets
2. https://atomicwallet.io/btc-to-agld-exchange by searching for the asset in their currency selector and inspecting to get the svg
3. https://cryptologos.cc
4. Search on Google for "DEGEN crypto logo svg". It can often be hard to find an SVG.
5. Worst case you can use https://www.freeconvert.com/png-to-svg, https://picsvg.com, or a similar tool to convert a PNG to SVG. Find the largest/highest quality PNG you can and verify how it looks after as many of these can destroy the image.
