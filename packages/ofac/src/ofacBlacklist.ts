import { type Address } from 'viem'

import ofacBlacklist from './ofac-blacklist.json'

export const OFAC_BLACKLIST = ofacBlacklist as Address[]
