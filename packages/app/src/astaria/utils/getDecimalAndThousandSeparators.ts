const NUMBER_WITH_DECIMAL = 1.1
const TEN_THOUSAND = 10000

const DEFAULT_DECIMAL_SEPARATOR = '.'
const DEFAULT_THOUSAND_SEPARATOR = ','

const getThousandSeparator = ({
  decimalSeparator,
  thousandSeparator,
}: {
  decimalSeparator: string
  thousandSeparator: string
}) => {
  if (thousandSeparator === decimalSeparator) {
    if (decimalSeparator === DEFAULT_THOUSAND_SEPARATOR) {
      return DEFAULT_DECIMAL_SEPARATOR
    }
    return DEFAULT_THOUSAND_SEPARATOR
  }

  return thousandSeparator
}

export const getDecimalAndThousandSeparators = () => {
  const number = new Intl.NumberFormat()

  const decimalSplitArray = number.formatToParts(NUMBER_WITH_DECIMAL)
  const decimalSeparator = decimalSplitArray.at(1)?.value || DEFAULT_DECIMAL_SEPARATOR
  const thousandSplitArray = number.formatToParts(TEN_THOUSAND)
  const thousandSeparator = thousandSplitArray.at(1)?.value || DEFAULT_THOUSAND_SEPARATOR

  return {
    decimalSeparator,
    thousandSeparator: getThousandSeparator({
      decimalSeparator,
      thousandSeparator,
    }),
  }
}
