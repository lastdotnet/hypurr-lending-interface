import { type AssetDetail } from '@/astaria/types-internal/market-schemas'

const SYMBOL_MAPPING: { [key: string]: string } = {
  USDbC: 'USDC',
}

export const sumAssetDetails = (assetsDetails: AssetDetail[]): AssetDetail[] => {
  const assetMap = new Map<string, AssetDetail>()

  // biome-ignore lint/complexity/noForEach: <explanation>
  assetsDetails.forEach((assetDetail) => {
    let { totalBorrowed, totalCollateral, usdValueBorrowed, usdValueCollateral } = assetDetail
    let symbol = assetDetail.erc20.symbol
    totalBorrowed = BigInt(totalBorrowed)
    totalCollateral = BigInt(totalCollateral)
    usdValueBorrowed ??= 0
    usdValueCollateral ??= 0

    symbol = SYMBOL_MAPPING[symbol] || symbol

    const assetBySymbol = assetMap.get(symbol)

    if (!assetBySymbol) {
      assetMap.set(symbol, { ...assetDetail })
    } else {
      assetBySymbol.totalBorrowed += totalBorrowed
      assetBySymbol.totalCollateral += totalCollateral
      assetBySymbol.usdValueCollateral = (assetBySymbol.usdValueCollateral ?? 0) + usdValueCollateral
      assetBySymbol.usdValueBorrowed = (assetBySymbol.usdValueBorrowed ?? 0) + usdValueBorrowed
      assetMap.set(symbol, assetBySymbol)
    }
  })

  return Array.from(assetMap.values())
}
