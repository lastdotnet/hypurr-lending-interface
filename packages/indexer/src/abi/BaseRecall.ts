import * as ethers from 'ethers';

import { ABI_JSON } from './BaseRecall.abi';
import { ContractBase, Func, LogEvent } from './abi.support';

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
  OwnershipHandoverCanceled: new LogEvent<
    [pendingOwner: string] & { pendingOwner: string }
  >(abi, '0xfa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92'),
  OwnershipHandoverRequested: new LogEvent<
    [pendingOwner: string] & { pendingOwner: string }
  >(abi, '0xdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d'),
  OwnershipTransferred: new LogEvent<
    [oldOwner: string, newOwner: string] & {
      newOwner: string;
      oldOwner: string;
    }
  >(abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'),
  Paused: new LogEvent<[]>(
    abi,
    '0x9e87fac88ff661f02d44f95383c817fece4bce600a3dab7a54406878b965e752'
  ),
  Recalled: new LogEvent<
    [loanId: bigint, recaller: string, end: bigint] & {
      end: bigint;
      loanId: bigint;
      recaller: string;
    }
  >(abi, '0xed4f19fd6ec0df39da26a79088edbf30fd7c6b4201c2f89f867f576b682ab9db'),
  Unpaused: new LogEvent<[]>(
    abi,
    '0xa45f47fdea8a1efdd9029a5691c7f759c32b7c698632b563573e155625d16933'
  ),
};

export const functions = {
  SP: new Func<[], {}, string>(abi, '0x4426ebd0'),
  cancelOwnershipHandover: new Func<[], {}, []>(abi, '0x54d1f13d'),
  completeOwnershipHandover: new Func<
    [pendingOwner: string],
    { pendingOwner: string },
    []
  >(abi, '0xf04e283e'),
  getRecallRate: new Func<
    [
      loan: [
        start: bigint,
        custodian: string,
        borrower: string,
        issuer: string,
        originator: string,
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        },
      ] & {
        borrower: string;
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        custodian: string;
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        issuer: string;
        originator: string;
        start: bigint;
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        };
      },
    ],
    {
      loan: [
        start: bigint,
        custodian: string,
        borrower: string,
        issuer: string,
        originator: string,
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        },
      ] & {
        borrower: string;
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        custodian: string;
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        issuer: string;
        originator: string;
        start: bigint;
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        };
      };
    },
    bigint
  >(abi, '0x61faee9c'),
  owner: new Func<[], {}, string>(abi, '0x8da5cb5b'),
  ownershipHandoverExpiresAt: new Func<
    [pendingOwner: string],
    { pendingOwner: string },
    bigint
  >(abi, '0xfee81cf4'),
  pause: new Func<[], {}, []>(abi, '0x8456cb59'),
  paused: new Func<[], {}, boolean>(abi, '0x5c975abb'),
  recall: new Func<
    [
      loan: [
        start: bigint,
        custodian: string,
        borrower: string,
        issuer: string,
        originator: string,
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        },
      ] & {
        borrower: string;
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        custodian: string;
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        issuer: string;
        originator: string;
        start: bigint;
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        };
      },
    ],
    {
      loan: [
        start: bigint,
        custodian: string,
        borrower: string,
        issuer: string,
        originator: string,
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >,
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        },
      ] & {
        borrower: string;
        collateral: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        custodian: string;
        debt: Array<
          [
            itemType: number,
            token: string,
            identifier: bigint,
            amount: bigint,
          ] & {
            amount: bigint;
            identifier: bigint;
            itemType: number;
            token: string;
          }
        >;
        issuer: string;
        originator: string;
        start: bigint;
        terms: [
          status: string,
          statusData: string,
          pricing: string,
          pricingData: string,
          settlement: string,
          settlementData: string,
        ] & {
          pricing: string;
          pricingData: string;
          settlement: string;
          settlementData: string;
          status: string;
          statusData: string;
        };
      };
    },
    []
  >(abi, '0xf02a9e14'),
  recalls: new Func<
    [_: bigint],
    {},
    [recaller: string, start: bigint] & { recaller: string; start: bigint }
  >(abi, '0xbf1efc73'),
  renounceOwnership: new Func<[], {}, []>(abi, '0x715018a6'),
  requestOwnershipHandover: new Func<[], {}, []>(abi, '0x25692962'),
  transferOwnership: new Func<[newOwner: string], { newOwner: string }, []>(
    abi,
    '0xf2fde38b'
  ),
  unpause: new Func<[], {}, []>(abi, '0x3f4ba83a'),
};

export class Contract extends ContractBase {
  SP(): Promise<string> {
    return this.eth_call(functions.SP, []);
  }

  getRecallRate(
    loan: [
      start: bigint,
      custodian: string,
      borrower: string,
      issuer: string,
      originator: string,
      collateral: Array<
        [
          itemType: number,
          token: string,
          identifier: bigint,
          amount: bigint,
        ] & {
          amount: bigint;
          identifier: bigint;
          itemType: number;
          token: string;
        }
      >,
      debt: Array<
        [
          itemType: number,
          token: string,
          identifier: bigint,
          amount: bigint,
        ] & {
          amount: bigint;
          identifier: bigint;
          itemType: number;
          token: string;
        }
      >,
      terms: [
        status: string,
        statusData: string,
        pricing: string,
        pricingData: string,
        settlement: string,
        settlementData: string,
      ] & {
        pricing: string;
        pricingData: string;
        settlement: string;
        settlementData: string;
        status: string;
        statusData: string;
      },
    ] & {
      borrower: string;
      collateral: Array<
        [
          itemType: number,
          token: string,
          identifier: bigint,
          amount: bigint,
        ] & {
          amount: bigint;
          identifier: bigint;
          itemType: number;
          token: string;
        }
      >;
      custodian: string;
      debt: Array<
        [
          itemType: number,
          token: string,
          identifier: bigint,
          amount: bigint,
        ] & {
          amount: bigint;
          identifier: bigint;
          itemType: number;
          token: string;
        }
      >;
      issuer: string;
      originator: string;
      start: bigint;
      terms: [
        status: string,
        statusData: string,
        pricing: string,
        pricingData: string,
        settlement: string,
        settlementData: string,
      ] & {
        pricing: string;
        pricingData: string;
        settlement: string;
        settlementData: string;
        status: string;
        statusData: string;
      };
    }
  ): Promise<bigint> {
    return this.eth_call(functions.getRecallRate, [loan]);
  }

  owner(): Promise<string> {
    return this.eth_call(functions.owner, []);
  }

  ownershipHandoverExpiresAt(pendingOwner: string): Promise<bigint> {
    return this.eth_call(functions.ownershipHandoverExpiresAt, [pendingOwner]);
  }

  paused(): Promise<boolean> {
    return this.eth_call(functions.paused, []);
  }

  recalls(
    arg0: bigint
  ): Promise<
    [recaller: string, start: bigint] & { recaller: string; start: bigint }
  > {
    return this.eth_call(functions.recalls, [arg0]);
  }
}
