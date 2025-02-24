import { writeFileSync } from 'node:fs'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import CONTRACTS from '../../contracts/out/contract-addresses.json'

writeFileSync('src/contracts-foundry.ts', `export const FOUNDRY_CONTRACTS = ${JSON.stringify(CONTRACTS)} as const;\n`)
