/*
This file is created to avoid using ** with bigints as they can cause
 TypeError: Cannot convert a BigInt value to a number
 */

// Copied from https://github.com/web3/web3.js/pull/6506/files#diff-afe0e3fc88b88acae043aacbe7129952ec3eed1c1de5ef42ac8047ecf763da06R30
export const pow = ({ base, exponent }: { base: bigint; exponent: bigint }) => {
  if (exponent === 0n) {
    return 1n
  }
  let res = base
  for (let index = 1; index < exponent; index += 1) {
    res *= base
  }
  return res
}
