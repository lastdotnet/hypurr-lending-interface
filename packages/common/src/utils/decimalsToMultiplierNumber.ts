const PRECISION_MULTIPLIER_NUMBER = 10

export const decimalsToMultiplierNumber = (decimals: number) => PRECISION_MULTIPLIER_NUMBER ** decimals
