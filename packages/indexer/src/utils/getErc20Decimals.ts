import { type Address, type PublicClient, erc20Abi } from 'viem';

export const getErc20Decimals = (
  publicClient: PublicClient,
  address: Address
) =>
  publicClient.readContract({
    abi: erc20Abi,
    address,
    args: [],
    functionName: 'decimals',
  });
