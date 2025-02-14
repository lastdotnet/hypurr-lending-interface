import { type Dispatch, type SetStateAction } from 'react';

import { clsx } from 'clsx';

export const StepBubbles = ({
  className,
  setStep,
  step,
  steps,
}: {
  className?: string;
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  steps: number;
}) => (
  <div className={clsx('flex items-center justify-center gap-4', className)}>
    {[...Array(steps).keys()].map((id) => (
      <button
        key={id}
        className={clsx('h-4 w-4 rounded-full border', {
          'bg-primary': step === id + 1,
        })}
        onClick={() => setStep(id + 1)}
      />
    ))}
  </div>
);
