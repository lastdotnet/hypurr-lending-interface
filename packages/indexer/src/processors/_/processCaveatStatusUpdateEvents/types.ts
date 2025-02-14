export type FilledCaveat = {
  blockHeight: number;
  fromAddress: string | undefined;
  hash: string;
  owner: string;
  salt: string;
};

export type InvalidatedUserSalt = {
  owner: string;
  salt: string;
};

export type CaveatNonceIncremented = {
  newNonce: bigint;
  owner: string;
  timestamp: number;
};
