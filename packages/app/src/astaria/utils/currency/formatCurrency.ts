import { formatNumber, removeDecimalsNumber, toNormalizedString, toNormalizedValue } from 'common'

const DEFAULT_PRECISION = 4
const HIGH_PRECISION = 8

const getStringOfFloat = (number: number) => {
  const notation = number.toExponential()
  const [base, exp] = notation.split('e-')
  return number.toFixed(Math.max(base.length - 1, Number(exp)))
}

const getPrecision = ({
  highPrecision,
  usdValue,
}: {
  highPrecision?: boolean
  usdValue: number | null | undefined
}) => {
  if (highPrecision) {
    return HIGH_PRECISION
  }
  if (usdValue) {
    /* eslint-disable no-magic-numbers */
    if (usdValue < 0.1) {
      return 0
    }
    if (usdValue < 0.8) {
      return 1
    }
    if (usdValue < 2) {
      return 2
    }
    if (usdValue < 1000) {
      return 3
    }
    if (usdValue < 10000) {
      return 4
    }
    if (usdValue < 30000) {
      return 5
    }
    if (usdValue < 60000) {
      return 6
    }
    if (usdValue < 100000) {
      return 7
    }
    return 8
    /* eslint-enable no-magic-numbers */
  }

  return DEFAULT_PRECISION
}

const getVerySmallNumber = ({ maxDecimals }: { maxDecimals: number }) =>
  removeDecimalsNumber({
    decimals: maxDecimals || 1, // 0 maxDecimals still shows 0.1
    value: 1,
  })

export const formatCurrency = ({
  amount,
  decimals,
  highPrecision,
  usdValue,
}: {
  amount: bigint | number
  decimals?: number
  highPrecision?: boolean
  usdValue: number | null | undefined
}): { content: string; trigger: string } => {
  const maxDecimals = getPrecision({ highPrecision, usdValue })
  if (typeof amount === 'number') {
    return {
      content: formatNumber({ amount }),
      trigger: formatNumber({
        amount,
        maxDecimals,
      }),
    }
  }

  const numberAmount = decimals ? toNormalizedValue(amount, decimals) : Number(amount)
  const stringAmount = decimals ? toNormalizedString(amount, decimals) : amount.toString()

  const [beforeDecimal, afterDecimal] = stringAmount.split('.')

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let content

  if (afterDecimal) {
    content = `${formatNumber({
      amount: BigInt(beforeDecimal),
    })}.${afterDecimal}`
  } else {
    content = formatNumber({
      amount: BigInt(beforeDecimal),
    })
  }

  const verySmallNumber = getVerySmallNumber({ maxDecimals })
  if (numberAmount > 0 && numberAmount < verySmallNumber) {
    return {
      content,
      trigger: `<${getStringOfFloat(verySmallNumber)}`,
    }
  }

  return {
    content,
    trigger: formatNumber({
      amount: numberAmount,
      maxDecimals,
    }),
  }
}
