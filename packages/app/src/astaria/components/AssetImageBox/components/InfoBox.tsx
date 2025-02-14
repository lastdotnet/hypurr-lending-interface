import { type ReactNode } from 'react';

export const InfoBox = ({ children }: { children: ReactNode }) => (
  <div className="absolute left-0 top-0 flex h-8 items-center rounded-tl-sm border bg-white">
    {children}
  </div>
);
