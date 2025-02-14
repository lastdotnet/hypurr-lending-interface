import { z } from 'zod';

import { ERC20AssetSchema, ERC20Schema } from './erc20';
import { ERC721Schema } from './erc721';

export const AssetSchema = z.union([ERC20Schema, ERC721Schema]);
export type Asset = z.infer<typeof AssetSchema>;

export const IntentAssetSchema = z.union([ERC20AssetSchema, ERC721Schema]);
export type IntentAsset = z.infer<typeof IntentAssetSchema>;
