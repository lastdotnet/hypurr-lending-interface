import { EvmBatchProcessor } from '@subsquid/evm-processor';

import { type ChainId } from 'chains';
import { CONTRACTS } from 'contracts-internal';

import * as BaseRecall from '../abi/BaseRecall';
import * as Starport from '../abi/Starport';
import { configureArchive, getRPCUrl, getStartBlock } from '../utils/index';
import { runProcessor } from './runProcessor';

// Fix bigint serialization issues
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const TIME_TO_WAIT_FOR_CONFIRMATION = 75;

export const processChain = (chainId: ChainId) => {
  const processor = new EvmBatchProcessor()
    .setRpcEndpoint(getRPCUrl(chainId))
    .setFinalityConfirmation(TIME_TO_WAIT_FOR_CONFIRMATION)
    .setFields({
      transaction: {
        from: true,
        hash: true,
        value: true,
      },
    })
    .setBlockRange({
      from: getStartBlock({ chainId }),
    })
    .addLog({
      address: [CONTRACTS.Starport],
      topic0: [Starport.events.Open.topic],
    })
    .addLog({
      address: [CONTRACTS.Starport],
      topic0: [Starport.events.Close.topic],
    })
    .addLog({
      address: [CONTRACTS.Starport],
      topic0: [Starport.events.CaveatSaltInvalidated.topic],
    })
    .addLog({
      address: [CONTRACTS.Starport],
      topic0: [Starport.events.CaveatFilled.topic],
      transaction: true,
    })
    .addLog({
      address: [CONTRACTS.Starport],
      topic0: [Starport.events.CaveatNonceIncremented.topic],
    })
    .addLog({
      address: [CONTRACTS.V1Status],
      topic0: [BaseRecall.events.Recalled.topic],
    })
    .setFields({
      log: {
        transactionHash: true,
      },
    });

  // Add archive source for remote chains which enables faster historical sync
  configureArchive({ chainId, processor });

  runProcessor({ chainId, processor });

  return processor;
};
