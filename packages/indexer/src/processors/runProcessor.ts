import { type EvmBatchProcessor } from '@subsquid/evm-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import { IsNull } from 'typeorm';
import {
  type Address,
  type Chain,
  createPublicClient,
  fallback,
  http,
  webSocket,
} from 'viem';

import { type ChainId } from 'chains';

import { Erc20Stats } from '../model';
import { getChain, getRPCUrl, getStateSchema } from '../utils';
import { getErc20Decimals } from '../utils/getErc20Decimals';
import { processCaveatStatusUpdateEvents } from './_/processCaveatStatusUpdateEvents/processCaveatStatusUpdateEvents';
import { processLoanEvents } from './_/processLoanEvents';
import { scrapeEvents } from './_/scrapeEvents';

let hasUpdatedDecimals = false;

export function runProcessor({
  chainId,
  processor,
}: {
  chainId: ChainId;
  processor: EvmBatchProcessor;
}) {
  const rpcUrl = getRPCUrl(chainId);

  const publicClient = createPublicClient({
    chain: getChain({ chainId }) as Chain,
    transport: fallback([webSocket(rpcUrl), http(rpcUrl)]),
  });

  processor.run(
    new TypeormDatabase({
      stateSchema: getStateSchema({ chainId }),
      supportHotBlocks: true,
    }),
    async (ctx) => {
      //Event data to scrape and then process
      const {
        closedLoanIds,
        closedPoints,
        filledCaveats,
        incrementedNonces,
        invalidatedUserSalts,
        openedLoans,
        recallEvents,
      } = await scrapeEvents(ctx);

      //Following mutations are safe to execute in parallel
      await Promise.all([
        processLoanEvents({
          chainId,
          closedLoanIds,
          closedPoints,
          filledCaveats,
          incrementedNonces,
          invalidatedUserSalts,
          openedLoans,
          publicClient,
          recallEvents,
          store: ctx.store,
        }),
        processCaveatStatusUpdateEvents({
          chainId,
          filledCaveats,
          incrementedNonces,
          invalidatedUserSalts,
          store: ctx.store,
        }),
      ]);

      if (hasUpdatedDecimals) {
        return;
      }

      const erc20WithMissingDecimals = await ctx.store.findBy(Erc20Stats, {
        chainId,
        decimals: IsNull(),
      });

      for (const erc20 of erc20WithMissingDecimals) {
        const decimals = await getErc20Decimals(
          publicClient,
          erc20.address as Address
        );
        erc20.decimals = decimals;
        await ctx.store.save(erc20);
      }

      hasUpdatedDecimals = true;
    }
  );
}
