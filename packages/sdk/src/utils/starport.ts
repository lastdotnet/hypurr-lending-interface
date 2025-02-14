import { type Hex, encodeAbiParameters } from 'viem';

import { CustodianCommandStructABI } from '../abi/CustodianCommandStructABI';
import { type Action, type StarportLoan } from '../types/starport';

export function encodeCommmand(
  action: Action,
  loan: StarportLoan,
  extraData: Hex = '0x'
): Hex {
  return encodeAbiParameters(
    [CustodianCommandStructABI],
    [
      {
        action,
        extraData,
        loan,
      },
    ]
  );
}
