import { type ReactNode } from 'react';

export const IndicatorBox = ({ children }: { children: ReactNode }) => (
  <div className="absolute right-2 top-2 flex w-12 flex-col items-center border bg-white">
    {children}
  </div>
);
