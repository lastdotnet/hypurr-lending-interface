import { writeFileSync } from 'node:fs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import CONFIG from '../../contracts/out/anvil-config.json';

writeFileSync(
  'src/config.ts',
  `export const CONFIG = ${JSON.stringify(CONFIG)};\n`
);
