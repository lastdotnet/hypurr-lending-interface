import { TokenSymbol } from './TokenSymbol'

describe(TokenSymbol.name, () => {
  it('works with a correct token symbol', () => {
    expect(TokenSymbol('sDAI')).toEqual('sDAI')
    expect(TokenSymbol('ETH')).toEqual('ETH')
    expect(TokenSymbol('wstETH')).toEqual('wstETH')
    expect(TokenSymbol('aSYMBOL')).toEqual('aSYMBOL')
  })

  it('throws for an empty token symbol', () => {
    expect(() => TokenSymbol('')).toThrow('Token symbol should be between 1 and 9 characters.')
  })

  it('throws for a token symbol longer than 9 characters', () => {
    expect(() => TokenSymbol('DAI-WETH-USDC')).toThrow('Token symbol should be between 1 and 9 characters.')
  })
})
