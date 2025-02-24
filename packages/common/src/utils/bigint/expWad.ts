/*eslint-disable no-magic-numbers, id-length */
import { pow } from './pow'

/**
 * Returns `exp(x)`, denominated in `WAD`.
 * This is a direct copy of solady/FixedPointMathLib.sol:expWad.
 *
 * @see https://github.com/Vectorized/solady/blob/fad3f6703c2cd4cfd185f9921790d117503f54c6/src/utils/FixedPointMathLib.sol#L119
 */
export const expWad = (x: bigint) => {
  let r = 0n
  // When the result is < 0.5 we return zero. This happens when
  // x <= floor(log(0.5e18) * 1e18) ~ -42e18
  if (x <= -42139678854452767551n) {
    return r
  }

  // When the result is > (2**255 - 1) / 1e18 we can not represent it as an
  // int. This happens when x >= floor(log((2**255 - 1) / 1e18) * 1e18) ~ 135.
  if (x >= 135305999368893231589n) {
    throw new Error('Exp overflow')
  }

  // x is now in the range (-42, 136) * 1e18. Convert to (-42, 136) * 2**96
  // for more intermediate precision and a binary basis. This base conversion
  // is a multiplication by 1e18 / 2**96 = 5**18 / 2**78.
  x = (x << 78n) / pow({ base: 5n, exponent: 18n })

  // Reduce range of x to (-½ ln 2, ½ ln 2) * 2**96 by factoring out powers
  // of two such that exp(x) = exp(x') * 2**k, where k is an integer.
  // Solving this gives k = round(x / log(2)) and x' = x - k * log(2).
  const k = ((x << 96n) / 54916777467707473351141471128n + pow({ base: 2n, exponent: 95n })) >> 96n
  x = x - k * 54916777467707473351141471128n

  // k is in the range [-61, 195].

  // Evaluate using a (6, 7)-term rational approximation.
  // p is made monic, we'll multiply by a scale factor later.
  let y = x + 1346386616545796478920950773328n
  y = ((y * x) >> 96n) + 57155421227552351082224309758442n
  let p = y + x - 94201549194550492254356042504812n
  p = ((p * y) >> 96n) + 28719021644029726153956944680412240n
  p = p * x + (4385272521454847904659076985693276n << 96n)

  // We leave p in 2**192 basis so we don't need to scale it back up for the division.
  let q = x - 2855989394907223263936484059900n
  q = ((q * x) >> 96n) + 50020603652535783019961831881945n
  q = ((q * x) >> 96n) - 533845033583426703283633433725380n
  q = ((q * x) >> 96n) + 3604857256930695427073651918091429n
  q = ((q * x) >> 96n) - 14423608567350463180887372962807573n
  q = ((q * x) >> 96n) + 26449188498355588339934803723976023n

  /// @solidity memory-safe-assembly
  // Div in assembly because solidity adds a zero check despite the unchecked.
  // The q polynomial won't have zeros in the domain as all its roots are complex.
  // No scaling is necessary because p is already 2**96 too large.
  if (q !== 0n) {
    r = p / q
  }

  // r should be in the range (0.09, 0.25) * 2**96.

  // We now need to multiply r by:
  // * the scale factor s = ~6.031367120.
  // * the 2**k factor from the range reduction.
  // * the 1e18 / 2**96 factor for base conversion.
  // We do this all at once, with an intermediate result in 2**213
  // basis, so the final right shift is always by a positive amount.
  r = (r * 3822833074963236453042738258902158003155416615667n) >> (195n - k)

  return r
}
