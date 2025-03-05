import { TokenSymbol } from '@/domain/types/TokenSymbol'

import { Percentage } from '@/domain/types/NumericValues'
import approve from './actions/approve.svg?url'
import borrow from './actions/borrow.svg?url'
import deposit from './actions/deposit.svg?url'
import done from './actions/done.svg?url'
import exchange from './actions/exchange.svg?url'
import repay from './actions/repay.svg?url'
import withdraw from './actions/withdraw.svg?url'
import arrowRight from './arrow-right.svg?url'
import boxArrowTopRight from './box-arrow-top-right.svg?url'
import checkCircle from './check-circle.svg?url'
import chevronDown from './chevron-down.svg?url'
import circleInfo from './circle-info.svg?url'
import closeFilled from './close-filled.svg?url'
import close from './close.svg?url'
import down from './down.svg?url'
import downgrade from './downgrade.svg?url'
import equal from './equal.svg?url'
import eye from './eye.svg?url'
import flash from './flash.svg?url'
import giftbox from './giftbox.svg?url'
import greenArrowUp from './green-arrow-up.svg?url'
import link from './link.svg?url'
import magicWandCircle from './magic-wand-circle.svg?url'
import magicWand from './magic-wand.svg?url'
import chart from './markets/chart.svg?url'
import inputOutput from './markets/input-output.svg?url'
import lock from './markets/lock.svg?url'
import output from './markets/output.svg?url'
import menu from './menu.svg?url'
import moreIconVertical from './more-icon-vertical.svg?url'
import moreIcon from './more-icon.svg?url'
import multiply from './multiply.svg?url'
import redstone from './oracle-providers/redstone.svg?url'
import pyth from './oracle-providers/pyth.svg?url'
import pause from './pause.svg?url'
import rocket from './rocket.svg?url'
import sliderThumb from './slider-thumb.svg?url'
import snowflake from './snowflake.svg?url'
import success from './success.svg?url'
import threeDots from './three-dots.svg?url'
import timer from './timer.svg?url'
import steth from './tokens/steth.svg?url'
import unknown from './tokens/unknown.svg?url'
import usdc from './tokens/usdc.svg?url'
import usdt from './tokens/usdt.svg?url'
import khype from './tokens/khype.svg?url'
import up from './up.svg?url'
import upgrade from './upgrade.svg?url'
import wallet from './wallet.svg?url'
import warning from './warning.svg?url'
import xCircle from './x-circle.svg?url'
import hypurrLogo from './hypurr-logo.svg?url'
import hypurrPaw from './hypurr-paw.svg?url'
import hyperEvmLogo from './hyper-evm-logo.png'
import usdxl from './tokens/usdxl.svg?url'
import susde from './tokens/susde.png'
import hype from './tokens/hype.png'
import faucetPurr from './faucet-purr.webp'
import hypurrLogoText from './hypurr-logo-text.svg?url'
import solvbtc from './tokens/solvBtc.png'
import sttesth from './tokens/sttesth.svg?url'
import wsthype from './tokens/wsthype.svg?url'
import telegram from './social-logos/telegram-logo.svg'
import x from './social-logos/x-logo.svg'
import github from './social-logos/github-logo.svg'
import coinbase from './wallet-icons/coinbase.svg?url'
import defaultWallet from './wallet-icons/default.svg?url'
import metamask from './wallet-icons/metamask.svg?url'
import walletConnect from './wallet-icons/wallet-connect.svg?url'

export const assets = {
  hypurrPaw,
  faucetPurr,
  hyperEvmLogo,
  hypurrLogo,
  hypurrLogoText,
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
  giftbox,
  rocket,
  downgrade,
  timer,
  multiply,
  equal,
  socialLogos: {
    telegram,
    x,
    github,
  },
  walletIcons: {
    metamask,
    walletConnect,
    coinbase,
    default: defaultWallet,
  },
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
    hyper: hyperEvmLogo,
    unknown,
  },
  token: {
    steth,
    usdc,
    usdt,
    usdxl,
    susde,
    hype,
    whype: hype,
    solvbtc,
    sttesth,
    khype,
    wsthype,
    unknown,
  },
  oracleProviders: {
    redstone,
    pyth,
  },
}

export function getTokenImage(symbol: TokenSymbol): string {
  const image = assets.token[symbol.toLocaleLowerCase() as keyof typeof assets.token]
  if (!image) {
    return assets.token.unknown.toString()
  }

  return image
}

export function getTokenColor(symbol: TokenSymbol, options?: { alpha?: Percentage; fallback?: string }): string {
  const color = tokenColors[symbol]
  const alpha = (options?.alpha ?? Percentage(1)).toFixed(2)
  const fallback = options?.fallback ?? `rgb(235 175 76 / ${alpha})`

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
  [TokenSymbol('wstHYPE')]: '106 197 176',
}
