import { type ChainId } from 'chains';

const CHAR_SET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';
const BASE = BigInt(CHAR_SET.length);

export const DELIMITER = '$';

type ShortIdPayload = {
  chainId: ChainId;
  value: string | number | bigint;
};

type EncodeShortID = (p: ShortIdPayload) => string;

export const encodeShortID: EncodeShortID = ({ chainId, value }) => {
  let valueToEncode;
  let output = '';

  try {
    valueToEncode = BigInt(value);
  } catch (err) {
    throw new Error(
      `Invalid value: ${value}. Must be a number, bigint or string.`
    );
  }

  while (valueToEncode > 0n) {
    output = `${CHAR_SET.charAt(parseInt((valueToEncode % BASE).toString()))}${output}`;
    valueToEncode /= BASE;
  }

  return `${output}${DELIMITER}${chainId}`;
};

type DecodeShortID = (s: string) => ShortIdPayload & {
  value: string;
};

export const decodeShortID: DecodeShortID = (shortIdString: string) => {
  const [shortId, chainId] = shortIdString.split(DELIMITER);

  if (!shortId || !chainId) {
    throw new Error(`Invalid short ID: ${shortIdString}`);
  }

  const value = [...shortId]
    .reduce((acc, char) => {
      const charValue = CHAR_SET.indexOf(char);

      if (charValue < 0 && char !== DELIMITER) {
        throw new Error(`Invalid Base62 character ${char}`);
      }

      return acc * BASE + BigInt(charValue);
    }, 0n)
    .toString();

  return {
    chainId: parseInt(chainId) as ChainId,
    value,
  };
};
