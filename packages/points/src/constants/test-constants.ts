import { getERC20TokenBySymbol } from 'assets';
import { getNowInSecondsBigInt, getSecondsBigInt } from 'common';
import { base } from 'viem/chains';

export const BASE_USDC = getERC20TokenBySymbol({
  chainId: base.id,
  symbol: 'USDC',
});
export const BASE_WETH = getERC20TokenBySymbol({
  chainId: base.id,
  symbol: 'WETH',
});
const usdValueUSDC = 1;
export const usdValueWETH = 4000;
export const baseDenominatorUSDC = usdValueWETH / usdValueUSDC;
export const baseDenominatorWETH = 1;
export const start = getNowInSecondsBigInt() - getSecondsBigInt({ minutes: 1 });

export const USDC_EXPECTED_POINTS = 0.05787;

export const WETH_EXPECTED_POINTS = 0.23148;
