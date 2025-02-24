import { isAddressEqual } from 'viem'

import { type ERC721, ERC_721_COLLECTIONS_WHITELIST } from 'assets'

export const isVerifiedCollection = (erc721: ERC721) =>
  ERC_721_COLLECTIONS_WHITELIST.some((verifiedCollection) => isAddressEqual(verifiedCollection, erc721.address))
