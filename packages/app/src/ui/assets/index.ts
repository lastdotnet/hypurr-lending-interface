import { TokenSymbol } from '@/domain/types/TokenSymbol'

import { Percentage } from '@/domain/types/NumericValues'
import approve from './actions/approve.svg'
import borrow from './actions/borrow.svg'
import deposit from './actions/deposit.svg'
import done from './actions/done.svg'
import exchange from './actions/exchange.svg'
import repay from './actions/repay.svg'
import withdraw from './actions/withdraw.svg'
import arrowRight from './arrow-right.svg'
import daiToUsdsUpgrade from './banners/dai-to-usds-upgrade.webp'
import mkrToSkyTransform from './banners/mkr-to-sky-transform.svg'
import newSavingsWelcome from './banners/new-savings-welcome.webp'
import sdaiToSusdsUpgrade from './banners/sdai-to-susds-upgrade.webp'
import boxArrowTopRight from './box-arrow-top-right.svg'
import baseDevNet from './chains/baseDevNet.svg'
import ethereum from './chains/ethereum.svg'
import gnosis from './chains/gnosis.svg'
import checkCircle from './check-circle.svg'
import chevronDown from './chevron-down.svg'
import circleInfo from './circle-info.svg'
import closeFilled from './close-filled.svg'
import close from './close.svg'
import down from './down.svg'
import downgrade from './downgrade.svg'
import equal from './equal.svg'
import eye from './eye.svg'
import flash from './flash.svg'
import giftbox from './giftbox.svg'
import greenArrowUp from './green-arrow-up.svg'
import lifiLogo from './lifi-logo.svg'
import link from './link.svg'
import magicWandCircle from './magic-wand-circle.svg'
import magicWand from './magic-wand.svg'
import makerLogo from './maker.svg'
import chart from './markets/chart.svg'
import inputOutput from './markets/input-output.svg'
import lock from './markets/lock.svg'
import output from './markets/output.svg'
import menu from './menu.svg'
import moreIconVertical from './more-icon-vertical.svg'
import moreIcon from './more-icon.svg'
import multiply from './multiply.svg'
import redstone from './oracle-providers/redstone.svg'
import pause from './pause.svg'
import rocket from './rocket.svg'
import sliderThumb from './slider-thumb.svg'
import snowflake from './snowflake.svg'
import sparkIcon from './spark-icon.svg'
import sparkLogo from './spark-logo.svg'
import success from './success.svg'
import threeDots from './three-dots.svg'
import timer from './timer.svg'
import cbbtc from './tokens/cbbtc.svg'
import cle from './tokens/cle.svg'
import dai from './tokens/dai.svg'
import eth from './tokens/eth.svg'
import eure from './tokens/eure.svg'
import gno from './tokens/gno.svg'
import mkr from './tokens/mkr.svg'
import reth from './tokens/reth.svg'
import sdai from './tokens/sdai.svg'
import sky from './tokens/sky.svg'
import steth from './tokens/steth.svg'
import susds from './tokens/susds.svg'
import unknown from './tokens/unknown.svg'
import usdc from './tokens/usdc.svg'
import usds from './tokens/usds.svg'
import usdt from './tokens/usdt.svg'
import wbtc from './tokens/wbtc.svg'
import weeth from './tokens/weeth.svg'
import weth from './tokens/weth.svg'
import wsteth from './tokens/wsteth.svg'
import wxdai from './tokens/wxdai.svg'
import xdai from './tokens/xdai.svg'
import up from './up.svg'
import upgrade from './upgrade.svg'
import coinbase from './wallet-icons/coinbase.svg'
import defaultWallet from './wallet-icons/default.svg'
import enjin from './wallet-icons/enjin.svg'
import metamask from './wallet-icons/metamask.svg'
import torus from './wallet-icons/torus.svg'
import walletConnect from './wallet-icons/wallet-connect.svg'
import wallet from './wallet.svg'
import warning from './warning.svg'
import xCircle from './x-circle.svg'
import lastLogo from './last-logo.svg'
import surrf from './surrf.svg'
import hypurrLogo from './hypurr-logo.svg'
import hyperEvmLogo from './hyper-evm-logo.png'
import usdxl from './tokens/usdxl.svg'
import susde from './tokens/susde.png'
import hype from './tokens/hype.png'
import faucetPurr from './faucet-purr.webp'
import hypurrLogoText from './hypurr-logo-text.svg'
import solvbtc from './tokens/solvBtc.png'
import sttesth from './tokens/sttesth.svg'
import referralCats from './referral-cats.png'

export const assets = {
  referralCats,
  faucetPurr,
  hyperEvmLogo,
  surrf,
  hypurrLogo,
  hypurrLogoText,
  sparkLogo,
  sparkIcon,
  lifiLogo,
  chevronDown,
  sliderThumb,
  circleInfo,
  up,
  down,
  success,
  wallet,
  link,
  threeDots,
  arrowRight,
  warning,
  pause,
  snowflake,
  xCircle,
  checkCircle,
  flash,
  greenArrowUp,
  boxArrowTopRight,
  magicWand,
  magicWandCircle,
  moreIcon,
  moreIconVertical,
  eye,
  menu,
  close,
  closeFilled,
  makerLogo,
  giftbox,
  rocket,
  downgrade,
  timer,
  multiply,
  equal,
  lastLogo,
  markets: {
    chart,
    inputOutput,
    lock,
    output,
  },
  actions: {
    upgrade,
    downgrade,
    approve,
    done,
    borrow,
    deposit,
    withdraw,
    repay,
    exchange,
  },
  chain: {
    gnosis,
    ethereum,
    unknown,
    baseDevNet,
  },
  token: {
    dai,
    eth,
    eure,
    gno,
    mkr,
    sky,
    usds,
    reth,
    sdai,
    susds,
    steth,
    usdc,
    'usdc.e': usdc,
    usdt,
    wbtc,
    weeth,
    weth,
    wsteth,
    wxdai,
    xdai,
    cbbtc,
    cle,
    usdxl,
    susde,
    hype,
    whype: hype,
    solvbtc,
    sttesth,
    unknown,
  },
  walletIcons: {
    coinbase,
    enjin,
    metamask,
    torus,
    walletConnect,
    default: defaultWallet,
  },
  banners: {
    daiToUsdsUpgrade,
    sdaiToSusdsUpgrade,
    mkrToSkyTransform,
    newSavingsWelcome,
  },
  oracleProviders: {
    redstone,
  },
}

export function getTokenImage(symbol: TokenSymbol): string {
  const image = assets.token[symbol.toLocaleLowerCase() as keyof typeof assets.token]
  if (!image) {
    return assets.token.unknown
  }

  return image
}

export function getTokenColor(symbol: TokenSymbol, options?: { alpha?: Percentage; fallback?: string }): string {
  const color = tokenColors[symbol]
  const alpha = (options?.alpha ?? Percentage(1)).toFixed(2)
  const fallback = options?.fallback ?? `rgb(217 217 217 / ${alpha})`

  return color ? `rgb(${color} / ${alpha})` : fallback
}

const tokenColors: Record<TokenSymbol, `${number} ${number} ${number}`> = {
  [TokenSymbol('USDXL')]: '255 230 106',
  [TokenSymbol('sUSDe')]: '50 157 200',
  [TokenSymbol('USDC')]: '157 222 247',
  [TokenSymbol('HYPE')]: '157 217 175',
  [TokenSymbol('stTESTH')]: '157 217 175',
  [TokenSymbol('WHYPE')]: '161 252 231',
  [TokenSymbol('SolvBTC')]: '235 175 76',
}
