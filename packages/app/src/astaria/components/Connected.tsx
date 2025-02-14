'use client';

import { type ReactNode } from 'react';

import { useAccount } from 'wagmi';

export const Connected = ({
  connectedComponent,
  notConnectedComponent,
}: {
  connectedComponent: ReactNode;
  notConnectedComponent?: ReactNode;
}) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return connectedComponent;
  }

  return notConnectedComponent || undefined;
};
