import { clsx } from 'clsx';

export const FadeCover = ({ className }: { className?: string }) => (
  <div
    className={clsx(
      'pointer-events-none absolute z-30 from-background to-transparent',
      className
    )}
  />
);
