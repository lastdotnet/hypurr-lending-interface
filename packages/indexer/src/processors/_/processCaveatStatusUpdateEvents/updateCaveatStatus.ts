import { type CaveatStatus, SignedCaveat } from '../../../model';

export const updateCaveatStatus = ({
  signedCaveat,
  status,
}: {
  signedCaveat: SignedCaveat;
  status: CaveatStatus;
}) => {
  const updatedCaveatRecord: SignedCaveat = {
    ...signedCaveat,
    status,
  };

  return new SignedCaveat(updatedCaveatRecord);
};
