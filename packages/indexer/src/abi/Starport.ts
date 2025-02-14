import * as ethers from 'ethers';

import { ABI_JSON } from './Starport.abi';
import { ContractBase, Func, LogEvent } from './abi.support';

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
  ApprovalSet: new LogEvent<
    [owner: string, spender: string, approvalType: number] & {
      approvalType: number;
      owner: string;
      spender: string;
    }
  >(abi, '0xd59af26d5a1428c5bb1e4be35c39ecaedebd34020a46fae9b3672b82bd76fd9a'),
  CaveatFilled: new LogEvent<
    [owner: string, hash: string, salt: string] & {
      hash: string;
      owner: string;
      salt: string;
    }
  >(abi, '0x1e502dcf22f55b757dddae095b92594a293eaa1d06eb2e8a1a58648fb82bd178'),
  CaveatNonceIncremented: new LogEvent<
    [owner: string, newNonce: bigint] & { newNonce: bigint; owner: string }
  >(abi, '0xe8e5dfdf538b2dfce2d1f2dff7bc7ec9c962a7ffa5249ae7a3673468b72d067e'),
  CaveatSaltInvalidated: new LogEvent<
    [owner: string, salt: string] & { owner: string; salt: string }
  >(abi, '0xf6477e1235adf3e2d7737f3b3eb64d5faf363d83c5d0fb6659cee58d22d22d99'),
  Close: new LogEvent<[loanId: bigint] & { loanId: bigint }>(
    abi,
    '0xbf67515a38ee520223d32c1266d52101c30d936ed1f3e436c8caeb0a43cb06bf'
  ),
  FeeDataUpdated: new LogEvent<
    [feeTo: string, defaultFeeRakeBps: bigint] & {
      defaultFeeRakeBps: bigint;
      feeTo: string;
    }
  >(abi, '0x2f940c22d2e09b994ffac2c4003c65249df0867e81c557a592b93f29e7079252'),
  FeeOverrideUpdated: new LogEvent<
    [token: string, overrideBps: bigint, enabled: boolean] & {
      enabled: boolean;
      overrideBps: bigint;
      token: string;
    }
  >(abi, '0x045231260c7d7b00ecfca40c14a8a9bc72cc0283fdd21ba2447209a696947b9f'),
  Open: new LogEvent<
    [
      loanId: bigint,
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
    ] & {
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
      loanId: bigint;
    }
  >(abi, '0x57cb72d73c48fadf55428537f6c9efbe080ae111339b0c5af42d9027ed20ba17'),
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
  Unpaused: new LogEvent<[]>(
    abi,
    '0xa45f47fdea8a1efdd9029a5691c7f759c32b7c698632b563573e155625d16933'
  ),
};

export const functions = {
  BPS_DENOMINATOR: new Func<[], {}, bigint>(abi, '0xe1a45218'),
  CACHED_DOMAIN_SEPARATOR: new Func<[], {}, string>(abi, '0x1c2e4be8'),
  CAVEAT_TYPEHASH: new Func<[], {}, string>(abi, '0xc66f5775'),
  DEFAULT_CUSTODIAN_CODE_HASH: new Func<[], {}, string>(abi, '0xcf986b7c'),
  EIP_DOMAIN: new Func<[], {}, string>(abi, '0xec328eb5'),
  INTENT_ORIGINATION_TYPEHASH: new Func<[], {}, string>(abi, '0x01ad4cc5'),
  LOAN_CLOSED_FLAG: new Func<[], {}, bigint>(abi, '0x73f0cdf4'),
  LOAN_OPEN_FLAG: new Func<[], {}, bigint>(abi, '0x739fe82c'),
  MAX_FEE_RAKE_BPS: new Func<[], {}, bigint>(abi, '0x92d94593'),
  NAME: new Func<[], {}, string>(abi, '0xa3f4df7e'),
  SG: new Func<[], {}, string>(abi, '0x75aaa8ce'),
  VERSION: new Func<[], {}, string>(abi, '0xffa1ad74'),
  acquireTokens: new Func<
    [
      items: Array<
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
    ],
    {
      items: Array<
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
    },
    []
  >(abi, '0x77d0c232'),
  applyRefinanceConsiderationToLoan: new Func<
    [
      considerationPayment: Array<
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
      carryPayment: Array<
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
    ],
    {
      carryPayment: Array<
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
      considerationPayment: Array<
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
    },
    Array<
      [itemType: number, token: string, identifier: bigint, amount: bigint] & {
        amount: bigint;
        identifier: bigint;
        itemType: number;
        token: string;
      }
    >
  >(abi, '0x734c4b9d'),
  approvals: new Func<[_: string, _: string], {}, number>(abi, '0xa32ce11e'),
  cancelOwnershipHandover: new Func<[], {}, []>(abi, '0x54d1f13d'),
  caveatNonces: new Func<[_: string], {}, bigint>(abi, '0x4bf26161'),
  chainId: new Func<[], {}, bigint>(abi, '0x9a8a0592'),
  closed: new Func<[loanId: bigint], { loanId: bigint }, boolean>(
    abi,
    '0x5c959b62'
  ),
  completeOwnershipHandover: new Func<
    [pendingOwner: string],
    { pendingOwner: string },
    []
  >(abi, '0xf04e283e'),
  defaultFeeRakeBps: new Func<[], {}, bigint>(abi, '0x196b82b3'),
  domainSeparator: new Func<[], {}, string>(abi, '0xf698da25'),
  feeOverrides: new Func<
    [_: string],
    {},
    [enabled: boolean, bpsOverride: bigint] & {
      bpsOverride: bigint;
      enabled: boolean;
    }
  >(abi, '0xaa9d881c'),
  feeTo: new Func<[], {}, string>(abi, '0x017e7e58'),
  hashCaveatWithSaltAndNonce: new Func<
    [
      account: string,
      singleUse: boolean,
      salt: string,
      deadline: bigint,
      caveats: Array<
        [enforcer: string, data: string] & { data: string; enforcer: string }
      >,
    ],
    {
      account: string;
      caveats: Array<
        [enforcer: string, data: string] & { data: string; enforcer: string }
      >;
      deadline: bigint;
      salt: string;
      singleUse: boolean;
    },
    string
  >(abi, '0x6613a0c1'),
  incrementCaveatNonce: new Func<[], {}, []>(abi, '0x5e6c2d96'),
  invalidSalts: new Func<[_: string, _: string], {}, boolean>(
    abi,
    '0x81679fde'
  ),
  invalidateCaveatSalt: new Func<[salt: string], { salt: string }, []>(
    abi,
    '0xb3b588aa'
  ),
  loanState: new Func<[_: bigint], {}, bigint>(abi, '0x49b274ed'),
  open: new Func<[loanId: bigint], { loanId: bigint }, boolean>(
    abi,
    '0x690e7c09'
  ),
  originate: new Func<
    [
      additionalTransfers: Array<
        [
          itemType: number,
          token: string,
          from: string,
          to: string,
          identifier: bigint,
          amount: bigint,
        ] & {
          amount: bigint;
          from: string;
          identifier: bigint;
          itemType: number;
          to: string;
          token: string;
        }
      >,
      borrowerCaveat: [
        singleUse: boolean,
        deadline: bigint,
        salt: string,
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >,
        signature: string,
      ] & {
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >;
        deadline: bigint;
        salt: string;
        signature: string;
        singleUse: boolean;
      },
      lenderCaveat: [
        singleUse: boolean,
        deadline: bigint,
        salt: string,
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >,
        signature: string,
      ] & {
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >;
        deadline: bigint;
        salt: string;
        signature: string;
        singleUse: boolean;
      },
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
      additionalTransfers: Array<
        [
          itemType: number,
          token: string,
          from: string,
          to: string,
          identifier: bigint,
          amount: bigint,
        ] & {
          amount: bigint;
          from: string;
          identifier: bigint;
          itemType: number;
          to: string;
          token: string;
        }
      >;
      borrowerCaveat: [
        singleUse: boolean,
        deadline: bigint,
        salt: string,
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >,
        signature: string,
      ] & {
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >;
        deadline: bigint;
        salt: string;
        signature: string;
        singleUse: boolean;
      };
      lenderCaveat: [
        singleUse: boolean,
        deadline: bigint,
        salt: string,
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >,
        signature: string,
      ] & {
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >;
        deadline: bigint;
        salt: string;
        signature: string;
        singleUse: boolean;
      };
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
  >(abi, '0x346758b9'),
  owner: new Func<[], {}, string>(abi, '0x8da5cb5b'),
  ownershipHandoverExpiresAt: new Func<
    [pendingOwner: string],
    { pendingOwner: string },
    bigint
  >(abi, '0xfee81cf4'),
  pause: new Func<[], {}, []>(abi, '0x8456cb59'),
  paused: new Func<[], {}, boolean>(abi, '0x5c975abb'),
  refinance: new Func<
    [
      lender: string,
      lenderCaveat: [
        singleUse: boolean,
        deadline: bigint,
        salt: string,
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >,
        signature: string,
      ] & {
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >;
        deadline: bigint;
        salt: string;
        signature: string;
        singleUse: boolean;
      },
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
      pricingData: string,
      extraData: string,
    ],
    {
      extraData: string;
      lender: string;
      lenderCaveat: [
        singleUse: boolean,
        deadline: bigint,
        salt: string,
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >,
        signature: string,
      ] & {
        caveats: Array<
          [enforcer: string, data: string] & { data: string; enforcer: string }
        >;
        deadline: bigint;
        salt: string;
        signature: string;
        singleUse: boolean;
      };
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
      pricingData: string;
    },
    []
  >(abi, '0x96a816a5'),
  renounceOwnership: new Func<[], {}, []>(abi, '0x715018a6'),
  requestOwnershipHandover: new Func<[], {}, []>(abi, '0x25692962'),
  setFeeData: new Func<
    [feeTo_: string, defaultFeeRakeBps_: bigint],
    { defaultFeeRakeBps_: bigint; feeTo_: string },
    []
  >(abi, '0x7fea7466'),
  setFeeOverride: new Func<
    [token: string, bpsOverride: bigint, enabled: boolean],
    { bpsOverride: bigint; enabled: boolean; token: string },
    []
  >(abi, '0x891569aa'),
  setOriginateApproval: new Func<
    [who: string, approvalType: number],
    { approvalType: number; who: string },
    []
  >(abi, '0x8990a835'),
  settle: new Func<
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
  >(abi, '0x52107d30'),
  transferOwnership: new Func<[newOwner: string], { newOwner: string }, []>(
    abi,
    '0xf2fde38b'
  ),
  unpause: new Func<[], {}, []>(abi, '0x3f4ba83a'),
};

export class Contract extends ContractBase {
  BPS_DENOMINATOR(): Promise<bigint> {
    return this.eth_call(functions.BPS_DENOMINATOR, []);
  }

  CACHED_DOMAIN_SEPARATOR(): Promise<string> {
    return this.eth_call(functions.CACHED_DOMAIN_SEPARATOR, []);
  }

  CAVEAT_TYPEHASH(): Promise<string> {
    return this.eth_call(functions.CAVEAT_TYPEHASH, []);
  }

  DEFAULT_CUSTODIAN_CODE_HASH(): Promise<string> {
    return this.eth_call(functions.DEFAULT_CUSTODIAN_CODE_HASH, []);
  }

  EIP_DOMAIN(): Promise<string> {
    return this.eth_call(functions.EIP_DOMAIN, []);
  }

  INTENT_ORIGINATION_TYPEHASH(): Promise<string> {
    return this.eth_call(functions.INTENT_ORIGINATION_TYPEHASH, []);
  }

  LOAN_CLOSED_FLAG(): Promise<bigint> {
    return this.eth_call(functions.LOAN_CLOSED_FLAG, []);
  }

  LOAN_OPEN_FLAG(): Promise<bigint> {
    return this.eth_call(functions.LOAN_OPEN_FLAG, []);
  }

  MAX_FEE_RAKE_BPS(): Promise<bigint> {
    return this.eth_call(functions.MAX_FEE_RAKE_BPS, []);
  }

  NAME(): Promise<string> {
    return this.eth_call(functions.NAME, []);
  }

  SG(): Promise<string> {
    return this.eth_call(functions.SG, []);
  }

  VERSION(): Promise<string> {
    return this.eth_call(functions.VERSION, []);
  }

  applyRefinanceConsiderationToLoan(
    considerationPayment: Array<
      [itemType: number, token: string, identifier: bigint, amount: bigint] & {
        amount: bigint;
        identifier: bigint;
        itemType: number;
        token: string;
      }
    >,
    carryPayment: Array<
      [itemType: number, token: string, identifier: bigint, amount: bigint] & {
        amount: bigint;
        identifier: bigint;
        itemType: number;
        token: string;
      }
    >
  ): Promise<
    Array<
      [itemType: number, token: string, identifier: bigint, amount: bigint] & {
        amount: bigint;
        identifier: bigint;
        itemType: number;
        token: string;
      }
    >
  > {
    return this.eth_call(functions.applyRefinanceConsiderationToLoan, [
      considerationPayment,
      carryPayment,
    ]);
  }

  approvals(arg0: string, arg1: string): Promise<number> {
    return this.eth_call(functions.approvals, [arg0, arg1]);
  }

  caveatNonces(arg0: string): Promise<bigint> {
    return this.eth_call(functions.caveatNonces, [arg0]);
  }

  chainId(): Promise<bigint> {
    return this.eth_call(functions.chainId, []);
  }

  closed(loanId: bigint): Promise<boolean> {
    return this.eth_call(functions.closed, [loanId]);
  }

  defaultFeeRakeBps(): Promise<bigint> {
    return this.eth_call(functions.defaultFeeRakeBps, []);
  }

  domainSeparator(): Promise<string> {
    return this.eth_call(functions.domainSeparator, []);
  }

  feeOverrides(arg0: string): Promise<
    [enabled: boolean, bpsOverride: bigint] & {
      bpsOverride: bigint;
      enabled: boolean;
    }
  > {
    return this.eth_call(functions.feeOverrides, [arg0]);
  }

  feeTo(): Promise<string> {
    return this.eth_call(functions.feeTo, []);
  }

  hashCaveatWithSaltAndNonce(
    account: string,
    singleUse: boolean,
    salt: string,
    deadline: bigint,
    caveats: Array<
      [enforcer: string, data: string] & { data: string; enforcer: string }
    >
  ): Promise<string> {
    return this.eth_call(functions.hashCaveatWithSaltAndNonce, [
      account,
      singleUse,
      salt,
      deadline,
      caveats,
    ]);
  }

  invalidSalts(arg0: string, arg1: string): Promise<boolean> {
    return this.eth_call(functions.invalidSalts, [arg0, arg1]);
  }

  loanState(arg0: bigint): Promise<bigint> {
    return this.eth_call(functions.loanState, [arg0]);
  }

  open(loanId: bigint): Promise<boolean> {
    return this.eth_call(functions.open, [loanId]);
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
}
