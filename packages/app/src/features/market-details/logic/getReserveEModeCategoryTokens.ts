import { MarketInfo, Reserve } from '@/domain/market-info/marketInfo'
import { TokenSymbol } from '@/domain/types/TokenSymbol'

export function getReserveEModeCategoryTokens(marketInfo: MarketInfo, reserve: Reserve): TokenSymbol[] {
  const reserveEModeCategoryIds = reserve.eModes.map((e) => e.category.id)
  if (!reserveEModeCategoryIds.includes(1) && !reserveEModeCategoryIds.includes(2)) return []

  return marketInfo.reserves
    .filter((r) => r.eModes.some((e) => reserveEModeCategoryIds.includes(e.category.id)))
    .map((reserve) => reserve.token.symbol)
}
