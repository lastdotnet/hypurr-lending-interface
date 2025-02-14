'use client';

// TODO: use client can be removed when we use react-query instead of a mock for useState
import { useState } from 'react';

export const useDeployVault = () => {
  const isConfirmingDeployVault = false; // TODO
  const errorDeployVault = undefined; // TODO
  const isLoadingDeployVault = false; // TODO
  const [isFinishedDeployVault, setIsFinishedDeployVault] = useState(false);

  return {
    deployVault: () => {
      setIsFinishedDeployVault(true);
    },
    errorDeployVault,
    isConfirmingDeployVault,
    isFinishedDeployVault,
    isLoadingDeployVault,
  };
};
