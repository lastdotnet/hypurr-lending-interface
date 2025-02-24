/* generated using openapi-typescript-codegen -- do no edit */

/* istanbul ignore file */

/* tslint:disable */

/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import type { CancelablePromise } from '../core/CancelablePromise'

export class DefaultService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * NFTs by Wallet(s)
   * @returns any 200
   * @throws ApiError
   */
  public nftsByOwners({
    chains = 'polygon,ethereum',
    walletAddresses = '0xfa6E0aDDF68267b8b6fF2dA55Ce01a53Fad6D8e2',
    queriedWalletBalances,
    contractAddresses,
    collectionIds,
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain(s), comma-separated for multiple values (e.g., polygon,ethereum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include a field "queried_wallet_balances" that includes the quantity owned and acquired dates of each passed wallet address on each NFT response body (useful for NFTs with many owners, such as ERC1155s) (pass queried_wallet_balances=1)
     */
    queriedWalletBalances?: '1' | '0'
    /**
     * NFT contract addresses to filter on. Limit of 20 addresses.
     */
    contractAddresses?: string
    /**
     * List of Collection IDs to filter on, comma-separated. Limit of 40 collection IDs.
     */
    collectionIds?: string
    /**
     * Include the total distinct count of tokens in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    nfts?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      name?: string
      description?: string
      previews?: {
        image_small_url?: string
        image_medium_url?: string
        image_large_url?: string
        image_opengraph_url?: string
        blurhash?: string
        predominant_color?: string
      }
      image_url?: string
      image_properties?: {
        width?: number
        height?: number
        size?: number
        mime_type?: string
      }
      video_url?: any
      video_properties?: any
      audio_url?: any
      audio_properties?: any
      model_url?: any
      model_properties?: any
      background_color?: any
      external_url?: string
      created_date?: string
      status?: string
      token_count?: number
      owner_count?: number
      owners?: Array<{
        owner_address?: string
        quantity?: number
        first_acquired_date?: string
        last_acquired_date?: string
      }>
      contract?: {
        type?: string
        name?: string
        symbol?: string
        deployed_by?: string
        deployed_via_contract?: string
      }
      collection?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: string
        category?: string
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: string
        discord_url?: any
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          nft_url?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: string
            decimals?: number
          }
        }>
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        top_contracts?: Array<string>
      }
      last_sale?: any
      first_created?: {
        minted_to?: string
        quantity?: number
        timestamp?: string
        block_number?: number
        transaction?: string
        transaction_initiator?: string
      }
      rarity?: {
        rank?: number
        score?: number
        unique_attributes?: number
      }
      royalty?: Array<{
        source?: string
        total_creator_fee_basis_points?: number
        recipients?: Array<{
          address?: string
          percentage?: number
          basis_points?: number
        }>
      }>
      extra_metadata?: {
        attributes?: Array<{
          trait_type?: string
          value?: string
          display_type?: any
        }>
        properties?: {
          Creator?: string
        }
        image_original_url?: string
        animation_original_url?: any
        metadata_original_url?: string
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/owners',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        queried_wallet_balances: queriedWalletBalances,
        contract_addresses: contractAddresses,
        collection_ids: collectionIds,
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * NFTs by Contract
   * @returns any 200
   * @throws ApiError
   */
  public nftsByContract({
    chain = 'ethereum',
    contractAddress = '0x4a8c9d751eeabc5521a68fb080dd7e72e46462af',
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Include the total distinct count of tokens in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    nfts?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      name?: string
      description?: string
      previews?: {
        image_small_url?: string
        image_medium_url?: string
        image_large_url?: string
        image_opengraph_url?: string
        blurhash?: string
        predominant_color?: string
      }
      image_url?: string
      image_properties?: {
        width?: number
        height?: number
        size?: number
        mime_type?: string
      }
      video_url?: any
      video_properties?: any
      audio_url?: any
      audio_properties?: any
      model_url?: any
      model_properties?: any
      background_color?: any
      external_url?: any
      created_date?: string
      status?: string
      token_count?: number
      owner_count?: number
      owners?: Array<{
        owner_address?: string
        quantity?: number
        first_acquired_date?: string
        last_acquired_date?: string
      }>
      contract?: {
        type?: string
        name?: string
        symbol?: string
        deployed_by?: string
        deployed_via_contract?: any
      }
      collection?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: string
        category?: string
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: string
        discord_url?: string
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          nft_url?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        spam_score?: number
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        top_bids?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        top_contracts?: Array<string>
      }
      last_sale?: any
      first_created?: {
        minted_to?: string
        quantity?: number
        timestamp?: string
        block_number?: number
        transaction?: string
        transaction_initiator?: string
      }
      rarity?: {
        rank?: number
        score?: number
        unique_attributes?: number
      }
      royalty?: Array<{
        source?: string
        total_creator_fee_basis_points?: number
        recipients?: Array<{
          address?: string
          percentage?: number
          basis_points?: number
        }>
      }>
      extra_metadata?: {
        attributes?: Array<{
          trait_type?: string
          value?: string
          display_type?: any
        }>
        image_original_url?: string
        animation_original_url?: any
        metadata_original_url?: string
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Sales & Transfers by Wallet(s)
   * @returns any 200
   * @throws ApiError
   */
  public transfersByWallets({
    chains = 'ethereum',
    walletAddresses = '0xfa6e0addf68267b8b6ff2da55ce01a53fad6d8e2',
    includeNftDetails,
    includeAttributePercentages,
    fromTimestamp,
    toTimestamp,
    includeLazyMints,
    onlySales,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain(s) (e.g., optimism), comma-separated for multiple values (e.g, optimism,ethereum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * When ```include_nft_details=1``` is passed, for NFTs with structured attributes in their ```extra_metadata```, include the percentage of tokens in the collection that have each trait_type + value (pass ```include_attribute_percentages=1```)
     */
    includeAttributePercentages?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include lazy mint events alongside the on-chain activity. Only applies to the OpenSea shared contracts (`ethereum.0x495f947276749ce646f68ac8c248420045cb7b5e` and `polygon.0x2953399124f0cbb46d2cbacd8a89cf0599974963`)
     */
    includeLazyMints?: '1' | '0'
    /**
     * Filter results for only records with sales information (pass only_sales=1)
     */
    onlySales?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: {
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        unit_price?: number
        total_price?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/transfers/wallets',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        include_nft_details: includeNftDetails,
        include_attribute_percentages: includeAttributePercentages,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        include_lazy_mints: includeLazyMints,
        only_sales: onlySales,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Sales & Transfers by NFT
   * @returns any 200
   * @throws ApiError
   */
  public transfersByNft({
    chain = 'ethereum',
    contractAddress = '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    tokenId = '8999',
    includeNftDetails,
    fromTimestamp,
    toTimestamp,
    fromBlock,
    toBlock,
    includeLazyMints,
    excludeSelfTransfers,
    onlySales,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Token ID of the given NFT. For Solana and Bitcoin, this can be omitted or set to 0.
     */
    tokenId?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Lower bound block_number (inclusive). The from_timestamp param takes precedence if both from_timestamp and from_block are specified.
     */
    fromBlock?: number
    /**
     * Upper bound block_number (inclusive). The to_timestamp param takes precedence if both to_timestamp and to_block are specified.
     */
    toBlock?: number
    /**
     * Include lazy mint events alongside the on-chain activity. Only applies to the OpenSea shared contracts (`ethereum.0x495f947276749ce646f68ac8c248420045cb7b5e` and `polygon.0x2953399124f0cbb46d2cbacd8a89cf0599974963`)
     */
    includeLazyMints?: '1' | '0'
    /**
     * Exclude transfers where `from_address_id` == `to_address_id`
     */
    excludeSelfTransfers?: '1' | '0'
    /**
     * Filter results for only records with sales information (pass only_sales=1)
     */
    onlySales?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: any
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/transfers/{chain}/{contract_address}/{token_id}',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      query: {
        include_nft_details: includeNftDetails,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        from_block: fromBlock,
        to_block: toBlock,
        include_lazy_mints: includeLazyMints,
        exclude_self_transfers: excludeSelfTransfers,
        only_sales: onlySales,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * NFT by Token ID
   * @returns any 200
   * @throws ApiError
   */
  public nftByTokenId1({
    chain = 'ethereum',
    contractAddress = '0xed5af388653567af2f388e6224dc7c4b3241c544',
    tokenId = '4666',
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Contract address of the NFT. For Solana, this is the mint address. For Bitcoin, this is the inscription ID.
     */
    contractAddress?: string
    /**
     * Token ID of the NFT. For Solana & Bitcoin, this can be omitted or set to 0
     */
    tokenId?: string
  }): CancelablePromise<{
    nft_id?: string
    chain?: string
    contract_address?: string
    token_id?: string
    name?: string
    description?: any
    previews?: {
      image_small_url?: string
      image_medium_url?: string
      image_large_url?: string
      image_opengraph_url?: string
      blurhash?: string
      predominant_color?: string
    }
    image_url?: string
    image_properties?: {
      width?: number
      height?: number
      size?: number
      mime_type?: string
    }
    video_url?: any
    video_properties?: any
    audio_url?: any
    audio_properties?: any
    model_url?: any
    model_properties?: any
    background_color?: any
    external_url?: any
    created_date?: string
    status?: string
    token_count?: number
    owner_count?: number
    owners?: Array<{
      owner_address?: string
      quantity?: number
      first_acquired_date?: string
      last_acquired_date?: string
    }>
    contract?: {
      type?: string
      name?: string
      symbol?: string
      deployed_by?: string
      deployed_via_contract?: any
    }
    collection?: {
      collection_id?: string
      name?: string
      description?: string
      image_url?: string
      banner_image_url?: string
      category?: string
      is_nsfw?: boolean
      external_url?: string
      twitter_username?: string
      discord_url?: string
      instagram_username?: string
      medium_username?: any
      telegram_url?: any
      marketplace_pages?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        marketplace_collection_id?: string
        nft_url?: string
        collection_url?: string
        verified?: boolean
      }>
      metaplex_mint?: any
      metaplex_first_verified_creator?: any
      floor_prices?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        value?: number
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
      }>
      top_bids?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        value?: number
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
      }>
      distinct_owner_count?: number
      distinct_nft_count?: number
      total_quantity?: number
      top_contracts?: Array<string>
    }
    last_sale?: {
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      transaction?: string
      marketplace_id?: string
      marketplace_name?: string
      is_bundle_sale?: boolean
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
      unit_price?: number
      total_price?: number
    }
    first_created?: {
      minted_to?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      transaction?: string
      transaction_initiator?: string
    }
    rarity?: {
      rank?: number
      score?: number
      unique_attributes?: number
    }
    royalty?: Array<{
      source?: string
      total_creator_fee_basis_points?: number
      recipients?: Array<{
        address?: string
        percentage?: number
        basis_points?: number
      }>
    }>
    extra_metadata?: {
      attributes?: Array<{
        trait_type?: string
        value?: string
        display_type?: any
      }>
      image_original_url?: string
      animation_original_url?: any
      metadata_original_url?: string
    }
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/{chain}/{contract_address}/{token_id}',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Sales & Transfers by Chain
   * @returns any 200
   * @throws ApiError
   */
  public transfersByChain({
    chain = 'ethereum',
    includeNftDetails,
    fromTimestamp,
    toTimestamp,
    fromBlock,
    toBlock,
    contractAddresses,
    includeLazyMints,
    excludeSelfTransfers,
    onlySales,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Lower bound block_number (inclusive). The from_timestamp param takes precedence if both from_timestamp and from_block are specified.
     */
    fromBlock?: number
    /**
     * Upper bound block_number (inclusive). The to_timestamp param takes precedence if both to_timestamp and to_block are specified.
     */
    toBlock?: number
    /**
     * Filter to specific contracts (e.g., 0x60e4d786628fea6478f785a6d7e704777c86a7c6), comma-separated for multiple values (e.g., 0x60e4d786628fea6478f785a6d7e704777c86a7c6,0x8a90cab2b38dba80c64b7734e58ee1db38b8992e). Maximum of 100 addresses. When this parameter is specified, a time window of <= 7 days must also be provided, using from_timestamp and to_timestamp.
     */
    contractAddresses?: string
    /**
     * Include lazy mint events alongside the on-chain activity. Only applies to the OpenSea shared contracts (`ethereum.0x495f947276749ce646f68ac8c248420045cb7b5e` and `polygon.0x2953399124f0cbb46d2cbacd8a89cf0599974963`)
     */
    includeLazyMints?: '1' | '0'
    /**
     * Exclude transfers where `from_address_id` == `to_address_id`
     */
    excludeSelfTransfers?: '1' | '0'
    /**
     * Filter results for only records with sales information (pass only_sales=1)
     */
    onlySales?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: {
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        unit_price?: number
        total_price?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/transfers/{chain}',
      path: {
        chain: chain,
      },
      query: {
        include_nft_details: includeNftDetails,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        from_block: fromBlock,
        to_block: toBlock,
        contract_addresses: contractAddresses,
        include_lazy_mints: includeLazyMints,
        exclude_self_transfers: excludeSelfTransfers,
        only_sales: onlySales,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Ownership Summary by Wallet(s)
   * @returns any 200
   * @throws ApiError
   */
  public ownershipSummaryByWallets({
    chains = 'ethereum,polygon',
    walletAddresses = '0xC01A0311708476E586fc194eB433979FF904E6Dd',
    contractAddresses = '0x6d4530149e5B4483d2F7E60449C02570531A0751,0x892848074ddeA461A15f337250Da3ce55580CA85',
    excludedContractIds,
  }: {
    /**
     * Chain(s) to query - may be comma delimited (e.g., ethereum,arbitrum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * NFT contract address(es) to filter on, comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    contractAddresses?: string
    /**
     * Comma-separated list of contract_id values to hide from the results. For example: `excluded_contract_ids=ethereum.0xc0cb81c1f89ab0873653f67eea42652f13cd8416,polygon.0x3147f9c776f59231226504c77332ad952a6d2402`
     */
    excludedContractIds?: string
  }): CancelablePromise<{
    wallets?: Array<{
      wallet_address?: string
      contracts?: Array<{
        contract_address?: string
        token_ids?: Array<string>
        chain?: string
        nfts_owned?: number
      }>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/contracts',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        contract_addresses: contractAddresses,
        excluded_contract_ids: excludedContractIds,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Owners by NFT
   * @returns any 200
   * @throws ApiError
   */
  public ownersByNft({
    chain = 'ethereum',
    contractAddress = '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
    tokenId = '9541',
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Token ID of the given NFT. For Solana and Bitcoin, this can be omitted or set to 0.
     */
    tokenId?: string
    /**
     * Include the total distinct count of Owners in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Change the default page limit.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    owners?: Array<{
      owner_address?: string
      quantity?: number
      first_acquired_date?: string
      last_acquired_date?: string
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/owners/{chain}/{contract_address}/{token_id}',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      query: {
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * NFTs by Collection ID / Mint
   * @returns any 200
   * @throws ApiError
   */
  public nftsByCollection({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    count,
    includeAttributePercentages,
    includeUnitPriceEthWei,
    chains,
    cursor,
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints). On Solana this field also accepts a verified metaplex_mint identifier (also known as a Metaplex certified collection, or "On-chain Collection")
     */
    collectionId?: string
    /**
     * Include the total distinct count of tokens in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * For NFTs with structured attributes in their ```extra_metadata```, include the percentage of tokens in the collection that have each trait_type + value (pass ```include_attribute_percentages=1```)
     */
    includeAttributePercentages?: '1' | '0'
    /**
     * For NFTs with last_sale information, include the equivalent ETH unit price, in wei, of the transaction
     */
    includeUnitPriceEthWei?: '1' | '0'
    /**
     * Optional name of the chain(s), comma-separated for multiple values (e.g., polygon,ethereum). This is useful for filtering by chain for collections that span multiple chains.
     */
    chains?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    nfts?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      name?: string
      description?: string
      previews?: {
        image_small_url?: string
        image_medium_url?: string
        image_large_url?: string
        image_opengraph_url?: string
        blurhash?: string
        predominant_color?: string
      }
      image_url?: string
      image_properties?: {
        width?: number
        height?: number
        size?: number
        mime_type?: string
      }
      video_url?: any
      video_properties?: any
      audio_url?: any
      audio_properties?: any
      model_url?: any
      model_properties?: any
      background_color?: any
      external_url?: any
      created_date?: string
      status?: string
      token_count?: number
      owner_count?: number
      owners?: Array<{
        owner_address?: string
        quantity?: number
        first_acquired_date?: string
        last_acquired_date?: string
      }>
      contract?: {
        type?: string
        name?: string
        symbol?: string
        deployed_by?: string
        deployed_via_contract?: any
      }
      collection?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: string
        category?: string
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: string
        discord_url?: string
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          nft_url?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        spam_score?: number
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        top_bids?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        top_contracts?: Array<string>
      }
      last_sale?: {
        from_address?: string
        to_address?: string
        quantity?: number
        timestamp?: string
        transaction?: string
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        unit_price?: number
        total_price?: number
      }
      first_created?: {
        minted_to?: string
        quantity?: number
        timestamp?: string
        block_number?: number
        transaction?: string
        transaction_initiator?: string
      }
      rarity?: {
        rank?: number
        score?: number
        unique_attributes?: number
      }
      royalty?: Array<{
        source?: string
        total_creator_fee_basis_points?: number
        recipients?: Array<{
          address?: string
          percentage?: number
          basis_points?: number
        }>
      }>
      extra_metadata?: {
        attributes?: Array<{
          trait_type?: string
          value?: string
          display_type?: any
        }>
        image_original_url?: string
        animation_original_url?: any
        metadata_original_url?: string
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        count: count,
        include_attribute_percentages: includeAttributePercentages,
        include_unit_price_eth_wei: includeUnitPriceEthWei,
        chains: chains,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Owners by Contract
   * @returns any 200
   * @throws ApiError
   */
  public ownersByContract({
    chain = 'ethereum',
    contractAddress = '0x12f28e2106ce8fd8464885b80ea865e98b465149',
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Include the total distinct count of Owners in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Change the default page limit.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    owners?: Array<{
      nft_id?: string
      owner_address?: string
      token_id?: string
      quantity?: number
      first_acquired_date?: string
      last_acquired_date?: string
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/owners/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Sales & Transfers by Collection
   * @returns any 200
   * @throws ApiError
   */
  public transfersByCollection({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    includeNftDetails,
    fromTimestamp,
    toTimestamp,
    fromBlock,
    toBlock,
    includeLazyMints,
    includeUnitPriceEthWei,
    excludeSelfTransfers,
    onlySales,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Lower bound block_number (inclusive). The from_timestamp param takes precedence if both from_timestamp and from_block are specified.
     */
    fromBlock?: number
    /**
     * Upper bound block_number (inclusive). The to_timestamp param takes precedence if both to_timestamp and to_block are specified.
     */
    toBlock?: number
    /**
     * Include lazy mint events alongside the on-chain activity. Only applies to the OpenSea shared contracts (`ethereum.0x495f947276749ce646f68ac8c248420045cb7b5e` and `polygon.0x2953399124f0cbb46d2cbacd8a89cf0599974963`)
     */
    includeLazyMints?: '1' | '0'
    /**
     * For sales, include the equivalent ETH price, in wei, of the transaction
     */
    includeUnitPriceEthWei?: '1' | '0'
    /**
     * Exclude transfers where `from_address_id` == `to_address_id`
     */
    excludeSelfTransfers?: '1' | '0'
    /**
     * Filter results for only records with sales information (pass only_sales=1)
     */
    onlySales?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: any
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/transfers/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        include_nft_details: includeNftDetails,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        from_block: fromBlock,
        to_block: toBlock,
        include_lazy_mints: includeLazyMints,
        include_unit_price_eth_wei: includeUnitPriceEthWei,
        exclude_self_transfers: excludeSelfTransfers,
        only_sales: onlySales,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Sales & Transfers by Contract
   * @returns any 200
   * @throws ApiError
   */
  public transfersByContract({
    chain = 'ethereum',
    contractAddress = '0x582048c4077a34e7c3799962f1f8c5342a3f4b12',
    includeNftDetails,
    fromTimestamp,
    toTimestamp,
    fromBlock,
    toBlock,
    includeLazyMints,
    excludeSelfTransfers,
    onlySales,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Lower bound block_number (inclusive). The from_timestamp param takes precedence if both from_timestamp and from_block are specified.
     */
    fromBlock?: number
    /**
     * Upper bound block_number (inclusive). The to_timestamp param takes precedence if both to_timestamp and to_block are specified.
     */
    toBlock?: number
    /**
     * Include lazy mint events alongside the on-chain activity. Only applies to the OpenSea shared contracts (`ethereum.0x495f947276749ce646f68ac8c248420045cb7b5e` and `polygon.0x2953399124f0cbb46d2cbacd8a89cf0599974963`)
     */
    includeLazyMints?: '1' | '0'
    /**
     * Exclude transfers where `from_address_id` == `to_address_id`
     */
    excludeSelfTransfers?: '1' | '0'
    /**
     * Filter results for only records with sales information (pass only_sales=1)
     */
    onlySales?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: {
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        unit_price?: number
        total_price?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/transfers/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        include_nft_details: includeNftDetails,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        from_block: fromBlock,
        to_block: toBlock,
        include_lazy_mints: includeLazyMints,
        exclude_self_transfers: excludeSelfTransfers,
        only_sales: onlySales,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * NFTs by Token List
   * @returns any 200
   * @throws ApiError
   */
  public nftsByTokenList({
    nftIds = 'solana.2iZBbRGnLVEEZH6JDsaNsTo66s2uxx7DTchVWKU8oisR,solana.3knghmwnuaMxkiuqXrqzjL7gLDuRw6DkkZcW7F4mvkK8,ethereum.0xed5af388653567af2f388e6224dc7c4b3241c544.2767',
    orderBy,
  }: {
    /**
     * The comma delimited list of NFT IDs to include ```chain.contract.token_id``` for EVM chains, ```chain.token_id``` for Solana. Limit of 50 addresses.
     */
    nftIds?: string
    /**
     * Optionally sort the results by last sale price (in USD) or date
     */
    orderBy?: '' | 'last_sale_date__desc' | 'last_sale_date__asc' | 'last_sale_price__desc' | 'last_sale_price__asc'
  }): CancelablePromise<{
    nfts?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      name?: string
      description?: any
      previews?: {
        image_small_url?: string
        image_medium_url?: string
        image_large_url?: string
        image_opengraph_url?: string
        blurhash?: string
        predominant_color?: string
      }
      image_url?: string
      image_properties?: {
        width?: number
        height?: number
        size?: number
        mime_type?: string
      }
      video_url?: any
      video_properties?: any
      audio_url?: any
      audio_properties?: any
      model_url?: any
      model_properties?: any
      background_color?: any
      external_url?: any
      created_date?: string
      status?: string
      token_count?: number
      owner_count?: number
      owners?: Array<{
        owner_address?: string
        quantity?: number
        first_acquired_date?: string
        last_acquired_date?: string
      }>
      contract?: {
        type?: string
        name?: string
        symbol?: string
        deployed_by?: string
        deployed_via_contract?: any
      }
      collection?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: string
        category?: string
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: string
        discord_url?: string
        instagram_username?: string
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          nft_url?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        spam_score?: number
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        top_bids?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        top_contracts?: Array<string>
      }
      last_sale?: {
        from_address?: string
        to_address?: string
        quantity?: number
        timestamp?: string
        transaction?: string
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: any
          address?: string
          decimals?: number
        }
        unit_price?: number
        total_price?: number
      }
      first_created?: {
        minted_to?: string
        quantity?: number
        timestamp?: string
        block_number?: number
        transaction?: string
        transaction_initiator?: string
      }
      rarity?: {
        rank?: number
        score?: number
        unique_attributes?: number
      }
      royalty?: Array<{
        source?: string
        total_creator_fee_basis_points?: number
        recipients?: Array<{
          address?: string
          percentage?: number
          basis_points?: number
        }>
      }>
      extra_metadata?: {
        attributes?: Array<{
          trait_type?: string
          value?: string
          display_type?: any
        }>
        image_original_url?: string
        animation_original_url?: any
        metadata_original_url?: string
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/assets',
      query: {
        nft_ids: nftIds,
        order_by: orderBy,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Refresh Contract Metadata
   * @returns any 200
   * @throws ApiError
   */
  public refreshContractMetadata({
    contractAddress,
    chain = 'ethereum',
  }: {
    /**
     * The contract address to be refreshed
     */
    contractAddress: string
    /**
     * The chain of the contract to be refreshed
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/nfts/refresh/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      errors: {
        400: '400',
      },
    })
  }
  /**
   * Refresh NFT Metadata
   * @returns any 200
   * @throws ApiError
   */
  public refreshNftMetadata({
    contractAddress,
    tokenId,
    chain = 'ethereum',
  }: {
    /**
     * The contract address of the NFT to be refreshed
     */
    contractAddress: string
    /**
     * The token id of the NFT to be refreshed. For Solana and Bitcoin NFTs, this can be omitted or set to 0.
     */
    tokenId: string
    /**
     * The chain of the contract / NFT to be refreshed
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/nfts/refresh/{chain}/{contract_address}/{token_id}',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      errors: {
        400: '400',
      },
    })
  }
  /**
   * Refresh Collection Metadata
   * @returns any 200
   * @throws ApiError
   */
  public refreshCollectionMetadata({
    collectionId,
  }: {
    /**
     * The collection id to be refreshed
     */
    collectionId: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/nfts/refresh/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      errors: {
        400: '400',
      },
    })
  }
  /**
   * Refresh Wallet Metadata
   * @returns any 200
   * @throws ApiError
   */
  public refreshWalletMetadata({
    walletAddress,
    chains = 'ethereum,polygon',
  }: {
    /**
     * The wallet address to be refreshed
     */
    walletAddress: string
    /**
     * Name of the chain(s) (e.g., optimism), comma-separated for multiple values (e.g, optimism,ethereum)
     */
    chains?: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/nfts/refresh/wallet/{wallet_address}',
      path: {
        wallet_address: walletAddress,
      },
      query: {
        chains: chains,
      },
      errors: {
        400: '400',
      },
    })
  }
  /**
   * Active Listings by Contract
   * @returns any 200
   * @throws ApiError
   */
  public listingsByContract1({
    chain = 'ethereum',
    contractAddress = '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea, blur, x2y2, looksrare, tensor, cryptopunks, magiceden
     */
    marketplaces?: string
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    listings?: Array<{
      id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: any
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
      is_private?: boolean
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listings/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Collections by Chain
   * @returns any 200
   * @throws ApiError
   */
  public collectionsByChain({
    chain = 'ethereum',
    cursor,
    limit = 50,
    contractAddresses,
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * (Optional). Comma-delimited string of contract addresses to filter on (up to 20).
     */
    contractAddresses?: string
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    collections?: Array<{
      collection_id?: string
      name?: string
      description?: string
      image_url?: string
      banner_image_url?: string
      external_url?: any
      twitter_username?: any
      discord_url?: any
      marketplace_pages?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        marketplace_collection_id?: string
        collection_url?: string
        verified?: boolean
      }>
      metaplex_mint?: any
      metaplex_first_verified_creator?: any
      floor_prices?: any[]
      distinct_owner_count?: number
      distinct_nft_count?: number
      total_quantity?: number
      top_contracts?: Array<string>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections/{chain}',
      path: {
        chain: chain,
      },
      query: {
        cursor: cursor,
        limit: limit,
        contract_addresses: contractAddresses,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Active Listings by Collection
   * @returns any 200
   * @throws ApiError
   */
  public listingsByCollection({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    orderBy = 'listing_timestamp_desc',
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea, blur, x2y2, looksrare, tensor, cryptopunks, magiceden
     */
    marketplaces?: string
    /**
     * Lower bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are: listing_timestamp_desc (default), listing_timestamp_asc, price_asc, or price_desc
     */
    orderBy?: 'listing_timestamp_desc' | 'listing_timestamp_asc' | 'price_asc' | 'price_desc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    listings?: Array<{
      id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listings/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Collections by Contract
   * @returns any 200
   * @throws ApiError
   */
  public collectionsByContract({
    chain = 'ethereum',
    contractAddress = '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270',
    includeTopContractDetails,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Include the associated contract details for the addresses listed in ```top_contracts```
     */
    includeTopContractDetails?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    collections?: Array<{
      collection_id?: string
      name?: string
      description?: string
      image_url?: string
      banner_image_url?: string
      external_url?: string
      twitter_username?: any
      discord_url?: any
      marketplace_pages?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        marketplace_collection_id?: string
        collection_url?: string
        verified?: boolean
      }>
      metaplex_mint?: any
      metaplex_first_verified_creator?: any
      floor_prices?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        value?: number
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
      }>
      distinct_owner_count?: number
      distinct_nft_count?: number
      total_quantity?: number
      top_contracts?: Array<string>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        include_top_contract_details: includeTopContractDetails,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Collections by Marketplace
   * @returns any 200
   * @throws ApiError
   */
  public collectionsByMarketplace({
    marketplace = 'opensea',
    chains = 'ethereum',
    slugs,
    includeTopContractDetails,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the NFT marketplace
     */
    marketplace?: 'opensea' | 'magiceden' | 'tensor' | 'trove'
    /**
     * Name of the chain(s) (e.g., optimism), comma-separated for multiple values (e.g., optimism,ethereum)
     */
    chains?: string
    /**
     * Marketplace-specific collection slug(s) (e.g., doodle), comma-separated for multiple values (e.g., doodle,yaypegs,mutant-ape-yacht-club). Limit of 20 slugs
     */
    slugs?: string
    /**
     * Include the associated contract details for the addresses listed in ```top_contracts```
     */
    includeTopContractDetails?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    collections?: Array<{
      collection_id?: string
      name?: string
      description?: string
      image_url?: string
      banner_image_url?: string
      external_url?: any
      twitter_username?: string
      discord_url?: string
      marketplace_pages?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        marketplace_collection_id?: string
        collection_url?: string
        verified?: boolean
      }>
      metaplex_mint?: any
      metaplex_first_verified_creator?: any
      floor_prices?: any[]
      distinct_owner_count?: number
      distinct_nft_count?: number
      total_quantity?: number
      top_contracts?: Array<string>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections/marketplace/{marketplace}',
      path: {
        marketplace: marketplace,
      },
      query: {
        chains: chains,
        slugs: slugs,
        include_top_contract_details: includeTopContractDetails,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Collections by ID(s)
   * @returns any 200
   * @throws ApiError
   */
  public collectionsByIds({
    collectionIds = 'fa5a665f6d37ba338f4df83054f431db,510139ec0d8cf5513d59a8d3afa1c061',
    includeTopContractDetails,
  }: {
    /**
     * The unique identifier of the collection(s), comma separated for multiple values (e.g., fa5a665f6d37ba338f4df83054f431db,510139ec0d8cf5513d59a8d3afa1c061). Limit of 20 collections. Also accepts metaplex_mint addresses for Solana.
     */
    collectionIds?: string
    /**
     * Include the associated contract details for the addresses listed in ```top_contracts```
     */
    includeTopContractDetails?: '1' | '0'
  }): CancelablePromise<{
    collections?: Array<{
      collection_id?: string
      name?: string
      description?: string
      image_url?: string
      banner_image_url?: string
      external_url?: string
      twitter_username?: string
      discord_url?: string
      marketplace_pages?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        marketplace_collection_id?: string
        collection_url?: string
        verified?: boolean
      }>
      metaplex_mint?: any
      metaplex_first_verified_creator?: any
      spam_score?: number
      floor_prices?: Array<{
        marketplace_id?: string
        marketplace_name?: string
        value?: number
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
      }>
      distinct_owner_count?: number
      distinct_nft_count?: number
      total_quantity?: number
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections/ids',
      query: {
        collection_ids: collectionIds,
        include_top_contract_details: includeTopContractDetails,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Collection Volumes & Market Caps
   * @returns any 200
   * @throws ApiError
   */
  public collectionVolumesMarketCaps({
    collectionIds = '510139ec0d8cf5513d59a8d3afa1c061',
    marketplaceId,
    includeCollectionDetails,
    includeTopContractDetails,
  }: {
    /**
     * The unique identifier of the collection(s), comma separated for mulitple values (e.g., fa5a665f6d37ba338f4df83054f431db,510139ec0d8cf5513d59a8d3afa1c061). Limit of 5 collections.
     */
    collectionIds?: string
    marketplaceId?: 'blur' | 'opensea' | 'x2y2' | 'looksrare' | 'magiceden' | 'tensor'
    /**
     * Include the full collection response
     */
    includeCollectionDetails?: '1' | '0'
    /**
     * Include the associated contract details for the addresses listed in ```top_contracts```
     */
    includeTopContractDetails?: '1' | '0'
  }): CancelablePromise<{
    collections?: Array<{
      collection_id?: string
      name?: string
      '1_day_volume'?: number
      '1_day_volume_usd_cents'?: number
      '1_day_prior_volume'?: number
      '1_day_prior_volume_usd_cents'?: number
      '1_day_volume_change_percent'?: number
      '1_day_transaction_count'?: number
      '1_day_seller_count'?: number
      '1_day_buyer_count'?: number
      '1_day_trader_count'?: number
      '7_day_volume'?: number
      '7_day_volume_usd_cents'?: number
      '7_day_prior_volume'?: number
      '7_day_prior_volume_usd_cents'?: number
      '7_day_volume_change_percent'?: number
      '7_day_transaction_count'?: number
      '7_day_seller_count'?: number
      '7_day_buyer_count'?: number
      '7_day_trader_count'?: number
      '30_day_volume'?: number
      '30_day_volume_usd_cents'?: number
      '30_day_prior_volume'?: number
      '30_day_prior_volume_usd_cents'?: number
      '30_day_volume_change_percent'?: number
      '30_day_transaction_count'?: number
      '30_day_seller_count'?: number
      '30_day_buyer_count'?: number
      '30_day_trader_count'?: number
      '90_day_volume'?: number
      '90_day_volume_usd_cents'?: number
      '90_day_transaction_count'?: number
      '90_day_seller_count'?: number
      '90_day_buyer_count'?: number
      '90_day_trader_count'?: number
      all_time_volume?: number
      market_cap?: number
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections_activity',
      query: {
        collection_ids: collectionIds,
        marketplace_id: marketplaceId,
        include_collection_details: includeCollectionDetails,
        include_top_contract_details: includeTopContractDetails,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Send Spam Report
   * @returns any 200
   * @throws ApiError
   */
  public sendSpamReport({
    requestBody,
  }: {
    requestBody?: {
      /**
       * SimpleHash collection id of the NFT reported
       */
      collection_id?: string
      /**
       * contract_address of the NFT reported, or the contract itself
       */
      contract_address?: string
      /**
       * chain_id (e.g., ethereum) of the NFT or contract reported
       */
      chain_id?: string
      /**
       * token_id of the NFT reported
       */
      token_id?: string
      /**
       * one of `user_hid`, `user_unhid`, `user_burned`, `mark_as_spam`, `mark_as_not_spam`
       */
      event_type?: string
    }
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/nfts/report/spam',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: '400',
      },
    })
  }
  /**
   * Traits by Collection
   * @returns any 200
   * @throws ApiError
   */
  public traitsByCollection({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    traitTypes,
    cursor,
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Comma-separated list of traits (e.g. body,face). Limit of 20 trait types
     */
    traitTypes?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    items?: Array<{
      trait_type?: string
      values?: Array<{
        value?: string
        count?: number
      }>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/traits/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        trait_types: traitTypes,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Owners by Collection
   * @returns any 200
   * @throws ApiError
   */
  public ownersByCollection({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Include the total distinct count of Owners in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Change the default page limit.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    owners?: Array<{
      nft_id?: string
      owner_address?: string
      token_id?: string
      quantity?: number
      first_acquired_date?: string
      last_acquired_date?: string
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/owners/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Sales & Transfers by Tx Hash
   * @returns any 200
   * @throws ApiError
   */
  public salesTransfersByTxHash({
    chain = 'ethereum',
    transactionHash = '0xbf4562e56ebade3653f8a548cd1f9fae20aa6d84e0c6fac5bc81fc3a9df20372',
    includeNftDetails,
    excludeSelfTransfers,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    transactionHash?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '0' | '1'
    /**
     * Exclude transfers where `from_address_id` == `to_address_id`
     */
    excludeSelfTransfers?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: any
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: any
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/transfers/transaction/{chain}/{transaction_hash}',
      path: {
        chain: chain,
        transaction_hash: transactionHash,
      },
      query: {
        include_nft_details: includeNftDetails,
        exclude_self_transfers: excludeSelfTransfers,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
      },
    })
  }
  /**
   * Active Listings by NFT
   * @returns any 200
   * @throws ApiError
   */
  public listingsByNft({
    chain = 'ethereum',
    contractAddress = '0x4a8c9d751eeabc5521a68fb080dd7e72e46462af',
    tokenId = '513',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    orderBy = 'listing_timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Token ID of the given NFT. For Solana and Bitcoin, this can be omitted or set to 0.
     */
    tokenId?: string
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea, blur, x2y2, looksrare, tensor, cryptopunks, magiceden
     */
    marketplaces?: string
    /**
     * Lower bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are: listing_timestamp_desc (default), listing_timestamp_asc, price_asc, or price_desc
     */
    orderBy?: 'listing_timestamp_desc' | 'listing_timestamp_asc' | 'price_asc' | 'price_desc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    listings?: Array<{
      id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listings/{chain}/{contract_address}/{token_id}',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      query: {
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Trait Floor Price by Collection
   * @returns any 200
   * @throws ApiError
   */
  public traitFloor({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    traitType = 'background',
    value = 'green',
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Trait (e.g. background)
     */
    traitType?: string
    /**
     * Value (e.g. green)
     */
    value?: string
  }): CancelablePromise<{
    floor_price?: {
      marketplace_id?: string
      marketplace_name?: string
      value?: number
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
      listing_url?: string
    }
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/traits/collection/{collection_id}/floor',
      path: {
        collection_id: collectionId,
      },
      query: {
        trait_type: traitType,
        value: value,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Listing Events by Chain
   * @returns any 200
   * @throws ApiError
   */
  public listingEventsByChain({
    chain = 'ethereum',
    fromTimestamp,
    toTimestamp,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    events?: Array<{
      id?: string
      event_type?: string
      event_reason?: any
      event_timestamp?: string
      listing_id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listing_events/{chain}',
      path: {
        chain: chain,
      },
      query: {
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Listing Events by Contract
   * @returns any 200
   * @throws ApiError
   */
  public listingEventsByContract({
    chain = 'ethereum',
    fromTimestamp,
    toTimestamp,
    cursor,
    limit = 50,
    contractAddress = '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    events?: Array<{
      id?: string
      event_type?: string
      event_reason?: any
      event_timestamp?: string
      listing_id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listing_events/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Listing Events by Collection
   * @returns any 200
   * @throws ApiError
   */
  public listingEventsByCollection({
    fromTimestamp,
    toTimestamp,
    cursor,
    limit = 50,
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
  }: {
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    events?: Array<{
      id?: string
      event_type?: string
      event_reason?: string
      event_timestamp?: string
      listing_id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listing_events/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Listing Events by NFT
   * @returns any 200
   * @throws ApiError
   */
  public listingEventsByNft({
    chain = 'ethereum',
    fromTimestamp,
    toTimestamp,
    cursor,
    limit = 50,
    contractAddress = '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    tokenId = '20035',
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Token ID of the given NFT. For Solana and Bitcoin, this can be omitted or set to 0.
     */
    tokenId?: string
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    events?: Array<{
      id?: string
      event_type?: string
      event_reason?: any
      event_timestamp?: string
      listing_id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listing_events/{chain}/{contract_address}/{token_id}',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      query: {
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Wallet Valuation
   * @returns any 200
   * @throws ApiError
   */
  public walletValue({
    walletAddresses = '0xC01A0311708476E586fc194eB433979FF904E6Dd',
  }: {
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 10 addresses.
     */
    walletAddresses?: string
  }): CancelablePromise<{
    wallets?: Array<{
      address?: string
      usd_value?: number
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/owners/value',
      query: {
        wallet_addresses: walletAddresses,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * NFTs by POAP Event ID
   * @returns any 200
   * @throws ApiError
   */
  public nftsByPoapEventId({
    eventId = 5,
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * The event_id for the POAP event. This can be retrieved from the "extra_metadata" on any POAP NFT response.
     */
    eventId?: number
    /**
     * Include the total distinct count of tokens in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    nfts?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      name?: string
      description?: string
      previews?: {
        image_small_url?: string
        image_medium_url?: string
        image_large_url?: string
        image_opengraph_url?: string
        blurhash?: string
        predominant_color?: string
      }
      image_url?: string
      image_properties?: {
        width?: number
        height?: number
        size?: number
        mime_type?: string
      }
      video_url?: any
      video_properties?: any
      audio_url?: any
      audio_properties?: any
      model_url?: any
      model_properties?: any
      background_color?: any
      external_url?: string
      created_date?: string
      status?: string
      token_count?: number
      owner_count?: number
      owners?: Array<{
        owner_address?: string
        quantity?: number
        first_acquired_date?: string
        last_acquired_date?: string
      }>
      contract?: {
        type?: string
        name?: string
        symbol?: string
        deployed_by?: string
        deployed_via_contract?: any
      }
      collection?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: any
        category?: string
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: any
        discord_url?: any
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          nft_url?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        top_bids?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        top_contracts?: Array<string>
      }
      last_sale?: any
      first_created?: {
        minted_to?: string
        quantity?: number
        timestamp?: string
        block_number?: number
        transaction?: string
        transaction_initiator?: string
      }
      rarity?: {
        rank?: number
        score?: number
        unique_attributes?: number
      }
      royalty?: Array<{
        source?: string
        total_creator_fee_basis_points?: number
        recipients?: any[]
      }>
      extra_metadata?: {
        attributes?: Array<{
          trait_type?: string
          value?: string
          display_type?: any
        }>
        home_url?: string
        year?: number
        tags?: Array<string>
        event_id?: number
        image_original_url?: string
        animation_original_url?: any
        metadata_original_url?: string
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/poap_event/{event_id}',
      path: {
        event_id: eventId,
      },
      query: {
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Top Wallets
   * @returns any 200
   * @throws ApiError
   */
  public topWallets({
    chain = 'ethereum',
  }: {
    /**
     * Name of the chain (e.g., ethereum). While this endpoint is in preview, only ethereum sales are counted against wallet totals.
     */
    chain?: 'ethereum'
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    top_wallets?: Array<{
      address_id?: string
      chain?: string
      volume?: number
      transaction_count?: number
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
      rank?: number
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/top_wallets',
      query: {
        chain: chain,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Listing Events by Event IDs
   * @returns any 200
   * @throws ApiError
   */
  public listingEventsByEventId({
    listingEventIds = 'dc84df4f59b12df33a9a4f7c81c148a0,5bd76f858ba910287070829c4fe05cf2',
  }: {
    /**
     * Comma delimited string of listing event IDs (up to 20).
     */
    listingEventIds?: string
  }): CancelablePromise<{
    events?: Array<{
      id?: string
      event_type?: string
      event_reason?: any
      event_timestamp?: string
      listing_id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listing_events/ids',
      query: {
        listing_event_ids: listingEventIds,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Listing Events by Listing ID
   * @returns any 200
   * @throws ApiError
   */
  public listingEventsByListingId({
    fromTimestamp,
    toTimestamp,
    cursor,
    limit = 50,
    listingId = 'b762ea8cd2d1707a4a94af66a49ad6f5',
  }: {
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * The parent NFT listing ID of the listing events to be retrieved
     */
    listingId?: string
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    events?: Array<{
      id?: string
      event_type?: string
      event_reason?: any
      event_timestamp?: string
      listing_id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listing_events/listing_id/{listing_id}',
      path: {
        listing_id: listingId,
      },
      query: {
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Top Sales by Collection
   * @returns any 200
   * @throws ApiError
   */
  public topSalesByCollection({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    includeNftDetails,
    cursor,
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    top_sales?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: {
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: string
          decimals?: number
        }
        unit_price?: number
        total_price?: number
        unit_price_usd_cents?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/top_sales/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        include_nft_details: includeNftDetails,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Top Collectors by Collection
   * @returns any 200
   * @throws ApiError
   */
  public topCollectorsByCollection({
    collectionId = '510139ec0d8cf5513d59a8d3afa1c061',
    includeOwnerImage,
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Include a link to the collector profile image in the response
     */
    includeOwnerImage?: '1' | '0'
    /**
     * Include the total distinct count of Owners in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    top_collectors?: Array<{
      owner_address?: string
      owner_ens_name?: any
      distinct_nfts_owned?: number
      total_copies_owned?: number
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/top_collectors/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        include_owner_image: includeOwnerImage,
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Contracts By Owner(s)
   * This endpoint provides a list of EVM-based NFT contracts owned by an address. Only contracts that have had at least one mint occur will be returned.
   * @returns any 200
   * @throws ApiError
   */
  public contractsByOwner({
    chains = 'ethereum',
    walletAddresses = '0xD6507fC98605eAb8775f851c25A5E09Dc12ab7A7',
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Chain(s) to query - may be comma delimited (e.g., ethereum,arbitrum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 50 addresses.
     */
    walletAddresses?: string
    /**
     * Include the total distinct count of contracts in the response (pass count=1)
     */
    count?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    contracts?: Array<{
      chain?: string
      contract_address?: string
      name?: string
      type?: string
      symbol?: string
      distinct_nft_count?: number
      deployed_by?: string
      deployed_via_contract?: any
      deployment_date?: string
      owned_by?: string
      top_collections?: Array<{
        collection_id?: string
        name?: string
        description?: any
        image_url?: any
        banner_image_url?: any
        category?: any
        is_nsfw?: boolean
        external_url?: any
        twitter_username?: any
        discord_url?: any
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        floor_prices?: any[]
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        chains?: Array<string>
        top_contracts?: Array<string>
      }>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/contracts_by_owner',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * NFT by Inscription Number
   * @returns any 200
   * @throws ApiError
   */
  public nftByInscriptionNumber({
    chain = 'bitcoin',
    inscriptionNumber,
  }: {
    /**
     * Name of the chain. Currently only Bitcoin mainnet is supported.
     */
    chain?: 'bitcoin'
    /**
     * Inscription number for the ordinal, as a positive or negative integer
     */
    inscriptionNumber: number
  }): CancelablePromise<{
    nft_id?: string
    chain?: string
    contract_address?: string
    token_id?: any
    name?: any
    description?: any
    previews?: {
      image_small_url?: string
      image_medium_url?: string
      image_large_url?: string
      image_opengraph_url?: string
      blurhash?: string
      predominant_color?: string
    }
    image_url?: string
    image_properties?: {
      width?: number
      height?: number
      size?: number
      mime_type?: string
    }
    video_url?: any
    video_properties?: any
    audio_url?: any
    audio_properties?: any
    model_url?: any
    model_properties?: any
    background_color?: any
    external_url?: any
    created_date?: string
    status?: string
    token_count?: number
    owner_count?: number
    owners?: Array<{
      owner_address?: string
      quantity?: number
      first_acquired_date?: string
      last_acquired_date?: string
    }>
    contract?: {
      type?: string
      name?: string
      symbol?: any
      deployed_by?: any
      deployed_via_contract?: any
    }
    collection?: {
      collection_id?: any
      name?: any
      description?: any
      image_url?: any
      banner_image_url?: any
      category?: any
      is_nsfw?: any
      external_url?: any
      twitter_username?: any
      discord_url?: any
      instagram_username?: any
      medium_username?: any
      telegram_url?: any
      marketplace_pages?: any[]
      metaplex_mint?: any
      metaplex_first_verified_creator?: any
      spam_score?: any
      floor_prices?: any[]
      distinct_owner_count?: any
      distinct_nft_count?: any
      total_quantity?: any
      chains?: any[]
      top_contracts?: any[]
    }
    last_sale?: any
    first_created?: {
      minted_to?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      transaction?: string
      transaction_initiator?: any
    }
    rarity?: {
      rank?: any
      score?: any
      unique_attributes?: any
    }
    royalty?: any[]
    extra_metadata?: {
      attributes?: any[]
      ordinal_details?: {
        inscription_id?: string
        inscription_number?: number
        content_length?: number
        content_type?: string
        sat_number?: any
        sat_name?: any
        sat_rarity?: any
      }
      image_original_url?: string
      animation_original_url?: any
      metadata_original_url?: any
    }
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/{chain}/inscription_number/{inscription_number}',
      path: {
        chain: chain,
        inscription_number: inscriptionNumber,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Top Collectors by Contract
   * @returns any 200
   * @throws ApiError
   */
  public topCollectorsByContract({
    chain = 'ethereum',
    contractAddress = '0xed5af388653567af2f388e6224dc7c4b3241c544',
    includeOwnerImage,
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Include a link to the collector profile image in the response
     */
    includeOwnerImage?: '1' | '0'
    /**
     * Include the total distinct count of Owners in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    top_collectors?: Array<{
      owner_address?: string
      owner_ens_name?: any
      distinct_nfts_owned?: number
      total_copies_owned?: number
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/top_collectors/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        include_owner_image: includeOwnerImage,
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Top Sales by Contract
   * @returns any 200
   * @throws ApiError
   */
  public topSalesByContract({
    chain = 'ethereum',
    includeNftDetails,
    cursor,
    limit = 50,
    contractAddress = '0xed5af388653567af2f388e6224dc7c4b3241c544',
  }: {
    /**
     * Name of the chain
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    top_sales?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: {
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        unit_price?: number
        total_price?: number
        unit_price_usd_cents?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/top_sales/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        include_nft_details: includeNftDetails,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Listing Events by Wallet(s)
   * @returns any 200
   * @throws ApiError
   */
  public listingEventsByWallets({
    walletAddresses = '0x280B81fceDBeC6274db4f7f595F28af3eeCf81d8,0xA15d302aB420E13616Bd2728Eb44d9348A4002ef',
    includeNftDetails,
    fromTimestamp,
    toTimestamp,
    cursor,
    limit = 50,
  }: {
    /**
     * Seller wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    events?: Array<{
      id?: string
      is_private?: any
      event_type?: string
      event_reason?: any
      event_timestamp?: string
      listing_id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listing_events/wallets',
      query: {
        wallet_addresses: walletAddresses,
        include_nft_details: includeNftDetails,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Available Chains
   * @returns any 200
   * @throws ApiError
   */
  public chains(): CancelablePromise<
    Array<{
      chain?: string
      eip155_network_id?: number
      is_testnet?: boolean
    }>
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/chains',
      errors: {
        401: '401',
      },
    })
  }
  /**
   * Sales Volume by Chain(s)
   * @returns any 200
   * @throws ApiError
   */
  public salesVolumeByChains({
    chains = 'ethereum,polygon',
    startDate,
    endDate,
    washTradeScoreLte,
  }: {
    /**
     * Chain(s) to query - may be comma delimited (e.g., ethereum,arbitrum)
     */
    chains?: string
    /**
     * Start date (inclusive)
     */
    startDate?: string
    /**
     * End date (inclusive)
     */
    endDate?: string
    /**
     * Filter transactions to those with a wash trade likelihood "score" of less than or equal to this value (valid range: 0-100, inclusive.  100 is very high liklihood of being a wash trade; 0 is very low liklihood).  Recommended starting value is 30
     */
    washTradeScoreLte?: number
  }): CancelablePromise<{
    stats?: Array<{
      chain?: string
      start_date?: string
      end_date?: string
      period?: string
      volume?: number
      volume_usd_cents?: number
      transaction_count?: number
      seller_count?: number
      buyer_count?: number
      trader_count?: number
      marketplaces?: Array<{
        marketplace_id?: string
        volume?: number
        volume_usd_cents?: number
        transaction_count?: number
        seller_count?: number
        buyer_count?: number
        trader_count?: number
      }>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/sales_volume',
      query: {
        chains: chains,
        start_date: startDate,
        end_date: endDate,
        wash_trade_score__lte: washTradeScoreLte,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * NFTs by Contract Owner(s)
   * @returns any 200
   * @throws ApiError
   */
  public nftsByContractOwners({
    chains = 'ethereum,polygon-mumbai',
    walletAddresses = '0xD6507fC98605eAb8775f851c25A5E09Dc12ab7A7,0x5f7f9c4bb2897c6c2b6b64fccbad02e243a01cef',
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Name of the chain(s), comma-separated for multiple values (e.g., polygon,ethereum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include the total distinct count of tokens in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    nfts?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      name?: string
      description?: string
      previews?: {
        image_small_url?: string
        image_medium_url?: string
        image_large_url?: string
        image_opengraph_url?: string
        blurhash?: string
        predominant_color?: string
      }
      image_url?: string
      image_properties?: {
        width?: number
        height?: number
        size?: number
        mime_type?: string
      }
      video_url?: any
      video_properties?: any
      audio_url?: any
      audio_properties?: any
      model_url?: any
      model_properties?: any
      background_color?: any
      external_url?: any
      created_date?: string
      status?: string
      token_count?: number
      owner_count?: number
      owners?: Array<{
        owner_address?: string
        quantity?: number
        first_acquired_date?: string
        last_acquired_date?: string
      }>
      contract?: {
        type?: string
        name?: string
        symbol?: string
        deployed_by?: string
        deployed_via_contract?: any
      }
      collection?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: string
        category?: string
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: string
        discord_url?: string
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          nft_url?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        spam_score?: number
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        top_bids?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        top_contracts?: Array<string>
      }
      last_sale?: any
      first_created?: {
        minted_to?: string
        quantity?: number
        timestamp?: string
        block_number?: number
        transaction?: string
        transaction_initiator?: string
      }
      rarity?: {
        rank?: number
        score?: number
        unique_attributes?: number
      }
      royalty?: Array<{
        source?: string
        total_creator_fee_basis_points?: number
        recipients?: Array<{
          address?: string
          percentage?: number
          basis_points?: number
        }>
      }>
      extra_metadata?: {
        attributes?: Array<{
          trait_type?: string
          value?: string
          display_type?: any
        }>
        image_original_url?: string
        animation_original_url?: any
        metadata_original_url?: string
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/contract_owner',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Collection Historical Floor Prices
   * @returns any 200
   * @throws ApiError
   */
  public collectionHistoricalFloorPrices({
    collectionId = '09954610564c25f6910ccd963c09a3fa',
    granularity = 'daily',
    marketplaceIds = 'opensea,blur',
    fromTimestamp,
    toTimestamp,
    startDate = '2023-05-31',
    endDate = '2023-06-15',
  }: {
    /**
     * The SimpleHash Collection ID
     */
    collectionId?: string
    /**
     * The frequency at which you'd like floor price data points
     */
    granularity?: 'daily' | 'hourly'
    /**
     * A comma-separated list of marketplace ids to filter the floor price data. Options are: blur,opensea,x2y2,looksrare,magiceden,tensor
     */
    marketplaceIds?: string
    /**
     * For "hourly" granularity only. Lower bound timestamp to filter data. Seconds since the Unix epoch.
     */
    fromTimestamp?: string
    /**
     * For for "hourly" granularity only. Upper bound timestamp. Seconds since the Unix epoch.
     */
    toTimestamp?: string
    /**
     * For "daily" granularity only. Lower bound date to filter data. An ISO 8601 date stamp.
     */
    startDate?: string
    /**
     * For "daily" granularity only. Upper bound date to filter data. An ISO 8601 date stamp.
     */
    endDate?: string
  }): CancelablePromise<{
    payment_token?: {
      payment_token_id?: string
      name?: string
      symbol?: string
      address?: any
      decimals?: number
    }
    floor_prices?: Array<{
      marketplace_id?: string
      floor_price?: any
      timestamp?: string
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/floor_prices_v2/collection/{collection_id}/{granularity}',
      path: {
        collection_id: collectionId,
        granularity: granularity,
      },
      query: {
        marketplace_ids: marketplaceIds,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        start_date: startDate,
        end_date: endDate,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Reverse ENS Lookup
   * @returns any 200
   * @throws ApiError
   */
  public reverseEnsLookup({
    walletAddresses = '0xfa6E0aDDF68267b8b6fF2dA55Ce01a53Fad6D8e2,0x588672a61Fb89f2dcD9a70001F06E8B692567755',
  }: {
    /**
     * Wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
  }): CancelablePromise<
    Array<{
      address?: string
      ens?: string
    }>
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/ens/reverse_lookup',
      query: {
        wallet_addresses: walletAddresses,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Top Sales by Contract Owner(s)
   * @returns any 200
   * @throws ApiError
   */
  public topSalesByContractOwners({
    chains = 'polygon',
    walletAddresses = '0xD6507fC98605eAb8775f851c25A5E09Dc12ab7A7,0x5f7f9c4bb2897c6c2b6b64fccbad02e243a01cef',
    includeNftDetails,
    fromTimestamp,
    toTimestamp,
    includeLazyMints,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain(s) (e.g., optimism), comma-separated for multiple values (e.g, optimism,ethereum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include lazy mint events alongside the on-chain activity. Only applies to the OpenSea shared contracts (`ethereum.0x495f947276749ce646f68ac8c248420045cb7b5e` and `polygon.0x2953399124f0cbb46d2cbacd8a89cf0599974963`)
     */
    includeLazyMints?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: {
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        unit_price?: number
        total_price?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/top_sales/contract_owner',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        include_nft_details: includeNftDetails,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        include_lazy_mints: includeLazyMints,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Sales & Transfers by Contract Owner(s)
   * @returns any 200
   * @throws ApiError
   */
  public salesTransfersByContractOwners({
    chains = 'ethereum,polygon',
    walletAddresses = '0xD6507fC98605eAb8775f851c25A5E09Dc12ab7A7,0x5f7f9c4bb2897c6c2b6b64fccbad02e243a01cef',
    includeNftDetails,
    fromTimestamp,
    toTimestamp,
    includeLazyMints,
    onlySales,
    cursor,
    orderBy = 'timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain(s) (e.g., optimism), comma-separated for multiple values (e.g, optimism,ethereum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include the associated NFT details for the transfer within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Lower bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include lazy mint events alongside the on-chain activity. Only applies to the OpenSea shared contracts (`ethereum.0x495f947276749ce646f68ac8c248420045cb7b5e` and `polygon.0x2953399124f0cbb46d2cbacd8a89cf0599974963`)
     */
    includeLazyMints?: '1' | '0'
    /**
     * Filter results for only records with sales information (pass only_sales=1)
     */
    onlySales?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are timestamp_desc (default) or timestamp_asc
     */
    orderBy?: 'timestamp_desc' | 'timestamp_asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: any
    next?: any
    previous?: any
    transfers?: Array<{
      nft_id?: string
      chain?: string
      contract_address?: string
      token_id?: string
      collection_id?: string
      event_type?: string
      from_address?: string
      to_address?: string
      quantity?: number
      timestamp?: string
      block_number?: number
      block_hash?: string
      transaction?: string
      transaction_initiator?: string
      log_index?: number
      batch_transfer_index?: number
      sale_details?: {
        marketplace_id?: string
        marketplace_name?: string
        is_bundle_sale?: boolean
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        unit_price?: number
        total_price?: number
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/transfers/contract_owner',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        include_nft_details: includeNftDetails,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        include_lazy_mints: includeLazyMints,
        only_sales: onlySales,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Top Collections
   * @returns any 200
   * @throws ApiError
   */
  public topCollections({
    chains = 'ethereum,polygon,solana',
    timePeriod,
    referenceDate,
    includeTopContractDetails,
    cursor,
    limit = 100,
  }: {
    /**
     * Name of the chain(s) (e.g., ethereum), comma-separated for multiple values (e.g., ethereum,polygon)
     */
    chains?: string
    /**
     * Time period for which total volume is calculated.  Options are: ```24h```: trailing 24 hours' volume, ending at the start of the prior hour (default); ```1d```: prior day's volume, ending at midnight GMT; ```7d```: prior seven days' volume; ```30d```: prior 30 days' volume
     */
    timePeriod?: '24h' | '1d' | '7d' | '30d'
    /**
     * Calculate volume relative to this date (must be in ```yyyy-mm-dd``` format)
     */
    referenceDate?: string
    /**
     * Include the associated contract details for the addresses listed in ```top_contracts```
     */
    includeTopContractDetails?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 100, capped at 100.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    collections?: Array<{
      collection_id?: string
      volume?: number
      volume_string?: string
      volume_usd_cents?: number
      transaction_count?: number
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
      collection_details?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: string
        category?: string
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: string
        discord_url?: string
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        top_bids?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
        }>
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        chains?: Array<string>
        top_contracts?: Array<string>
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections/top_v2',
      query: {
        chains: chains,
        time_period: timePeriod,
        reference_date: referenceDate,
        include_top_contract_details: includeTopContractDetails,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Trending Collections
   * @returns any 200
   * @throws ApiError
   */
  public trendingCollections({
    chains = 'ethereum,polygon,solana',
    timePeriod,
    includeTopContractDetails,
    cursor,
    limit = 100,
  }: {
    /**
     * Name of the chain(s) (e.g., ethereum), comma-separated for multiple values (e.g., ethereum,polygon)
     */
    chains?: string
    /**
     * Time period for which total volume is calculated.  Options are: ```24h```: trailing 24 hours' volume, ending at the start of the prior hour (default); ```1d```: prior day's volume, ending at midnight GMT; ```7d```: prior seven days' volume; 30d: prior 30 days' volume
     */
    timePeriod?: '24h' | '1d' | '7d' | '30d'
    /**
     * Include the associated contract details for the addresses listed in ```top_contracts```
     */
    includeTopContractDetails?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 100, capped at 100.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    collections?: Array<{
      collection_id?: string
      volume?: number
      volume_string?: string
      volume_usd_cents?: number
      volume_percent_change?: number
      transaction_count?: number
      transaction_count_percent_change?: number
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
      collection_details?: {
        collection_id?: string
        name?: string
        description?: string
        image_url?: string
        banner_image_url?: string
        category?: any
        is_nsfw?: boolean
        external_url?: string
        twitter_username?: string
        discord_url?: any
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        spam_score?: number
        floor_prices?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          value?: number
          payment_token?: {
            payment_token_id?: string
            name?: string
            symbol?: string
            address?: any
            decimals?: number
          }
          value_usd_cents?: number
        }>
        top_bids?: any[]
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        chains?: Array<string>
        top_contracts?: Array<string>
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections/trending',
      query: {
        chains: chains,
        time_period: timePeriod,
        include_top_contract_details: includeTopContractDetails,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Collections by Wallet(s)
   * @returns any 200
   * @throws ApiError
   */
  public collectionsByWallets({
    chains = 'ethereum',
    walletAddresses = '0xC01A0311708476E586fc194eB433979FF904E6Dd',
    spamScoreLte,
    spamScoreLt,
    spamScoreGte,
    spamScoreGt,
    nftIds = '1',
    includeTopContractDetails,
    cursor,
    orderBy = 'transfer_time__desc',
    limit = 50,
  }: {
    /**
     * Chain(s) to query - may be comma delimited (e.g., ethereum,arbitrum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Filter to collections with spam score less than or equal to this value (valid range: 0-100, inclusive)
     */
    spamScoreLte?: number
    /**
     * Filter to collections with spam score less than this value (valid range: 1-101, inclusive)
     */
    spamScoreLt?: number
    /**
     * Filter to collections with spam score greater than or equal to this value (valid range: 0-100, inclusive)
     */
    spamScoreGte?: number
    /**
     * Filter to collections with spam score greater than this value (valid range: -1-99, inclusive)
     */
    spamScoreGt?: number
    /**
     * Optional parameter to include a field called `nft_ids` providing the nft_ids from that collection held by the wallet(s)
     */
    nftIds?: string
    /**
     * Include the associated contract details for the addresses listed in ```top_contracts```
     */
    includeTopContractDetails?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * The default is `transfer_time__desc`.  For convenience, we have provided `transfer_time__desc` and `transfer_time__asc` as abstractions over acquired date, to provide more intuitive ordering when there are multiple copies acquired at different times or the same NFT is received and sent multiple times.
     */
    orderBy?:
      | 'transfer_time__desc'
      | 'transfer_time__asc'
      | 'name__desc'
      | 'name__asc'
      | 'last_acquired_date__desc'
      | 'last_acquired_date__asc'
      | 'first_acquired_date__desc'
      | 'first_acquired_date__asc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    collections?: Array<{
      collection_id?: string
      distinct_nfts_owned?: number
      distinct_nfts_owned_string?: string
      total_copies_owned?: number
      total_copies_owned_string?: string
      last_acquired_date?: string
      nft_ids?: Array<string>
      collection_details?: {
        collection_id?: string
        name?: string
        description?: any
        image_url?: string
        banner_image_url?: any
        category?: any
        is_nsfw?: any
        external_url?: any
        twitter_username?: any
        discord_url?: any
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: any[]
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        floor_prices?: any[]
        top_bids?: any[]
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        chains?: Array<string>
        top_contracts?: Array<string>
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/collections_by_wallets_v2',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        spam_score__lte: spamScoreLte,
        spam_score__lt: spamScoreLt,
        spam_score__gte: spamScoreGte,
        spam_score__gt: spamScoreGt,
        nft_ids: nftIds,
        include_top_contract_details: includeTopContractDetails,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Contracts By Deployer(s)
   * This endpoint provides a list of EVM-based NFT contracts deployed by an address. Only contracts that have had at least one mint occur will be returned.
   * @returns any 200
   * @throws ApiError
   */
  public contractsByDeployer({
    chains = 'ethereum',
    walletAddresses = '0xD6507fC98605eAb8775f851c25A5E09Dc12ab7A7',
    count,
    cursor,
    limit = 50,
  }: {
    /**
     * Chain(s) to query - may be comma delimited (e.g., ethereum,arbitrum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 50 addresses.
     */
    walletAddresses?: string
    /**
     * Include the total distinct count of contracts in the response (pass count=1)
     */
    count?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    contracts?: Array<{
      chain?: string
      contract_address?: string
      name?: string
      type?: string
      symbol?: string
      distinct_nft_count?: number
      deployed_by?: string
      deployed_via_contract?: any
      deployment_date?: string
      owned_by?: string
      top_collections?: Array<{
        collection_id?: string
        name?: string
        description?: any
        image_url?: any
        banner_image_url?: any
        category?: any
        is_nsfw?: boolean
        external_url?: any
        twitter_username?: any
        discord_url?: any
        instagram_username?: any
        medium_username?: any
        telegram_url?: any
        marketplace_pages?: Array<{
          marketplace_id?: string
          marketplace_name?: string
          marketplace_collection_id?: string
          collection_url?: string
          verified?: boolean
        }>
        metaplex_mint?: any
        metaplex_first_verified_creator?: any
        floor_prices?: any[]
        distinct_owner_count?: number
        distinct_nft_count?: number
        total_quantity?: number
        chains?: Array<string>
        top_contracts?: Array<string>
      }>
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/contracts_by_deployer',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        count: count,
        cursor: cursor,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * ENS Lookup
   * @returns any 200
   * @throws ApiError
   */
  public ensLookup({
    ensNames = 'kilkka.eth,krocold.eth',
  }: {
    /**
     * ENS name(s), comma-separated for multiple values (e.g., kilkka.eth,krocold.eth). Limit of 20 names.
     */
    ensNames?: string
  }): CancelablePromise<
    Array<{
      ens?: string
      address?: string
    }>
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/ens/lookup',
      query: {
        ens_names: ensNames,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Active Listings by Wallet(s)
   * @returns any 200
   * @throws ApiError
   */
  public activeListingsByWallets({
    chains = 'ethereum,polygon',
    walletAddresses = '0x234C472e21DEdb9737c63e396669D07411A9B723,0x2294326Bd4DA3891822a8AFd44656810384D3B8B,0xA15d302aB420E13616Bd2728Eb44d9348A4002ef,0x272982074bf6e976bbD1876b264497f7d9f300f4,',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    orderBy = 'listing_timestamp_desc',
    limit = 50,
  }: {
    /**
     * Name of the chain(s), comma-separated for multiple values (e.g., polygon,ethereum)
     */
    chains?: string
    /**
     * Owner wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea, blur, x2y2, looksrare, tensor, cryptopunks, magiceden
     */
    marketplaces?: string
    /**
     * Lower bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: string
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Available values are: listing_timestamp_desc (default), listing_timestamp_asc, price_asc, or price_desc
     */
    orderBy?: 'listing_timestamp_desc' | 'listing_timestamp_asc' | 'price_asc' | 'price_desc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<{
    next_cursor?: string
    next?: string
    previous?: any
    listings?: Array<{
      id?: string
      permalink?: string
      bundle_item_number?: any
      listing_timestamp?: string
      expiration_timestamp?: string
      seller_address?: string
      auction_type?: any
      quantity?: number
      quantity_remaining?: number
      price?: number
      marketplace_id?: string
      collection_id?: string
      nft_id?: string
      payment_token?: {
        payment_token_id?: string
        name?: string
        symbol?: string
        address?: any
        decimals?: number
      }
      is_private?: boolean
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/listings/wallets',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
  /**
   * Active Bids By Collection
   * This endpoint is currently in beta.
   * @returns any 200
   * @throws ApiError
   */
  public bidsByCollection({
    collectionId = '2ccfd6cb165074e4881906dcc701f1d8',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    orderBy = 'bid_timestamp__desc',
    limit = 50,
  }: {
    /**
     * The unique identifier of the collection (obtainable from an NFT response, or from the Collection endpoints)
     */
    collectionId?: string
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea
     */
    marketplaces?: string
    /**
     * Lower bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Used to sort bids (defaults to bid_timestamp__desc)
     */
    orderBy?: 'bid_timestamp__desc' | 'bid_timestamp__asc' | 'bid_price__asc' | 'bid_price__desc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/bids/collection/{collection_id}',
      path: {
        collection_id: collectionId,
      },
      query: {
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
      },
    })
  }
  /**
   * Active Bids By NFT
   * This endpoint is currently in beta.
   * @returns any 200
   * @throws ApiError
   */
  public activeBidsByNft({
    chain = 'ethereum',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    orderBy = 'bid_timestamp__desc',
    limit = 50,
    contractAddress = '0xed5af388653567af2f388e6224dc7c4b3241c544',
    tokenId = '0',
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea
     */
    marketplaces?: string
    /**
     * Lower bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Used to sort bids (defaults to bid_timestamp__desc)
     */
    orderBy?: 'bid_timestamp__desc' | 'bid_timestamp__asc' | 'bid_price__asc' | 'bid_price__desc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Token ID of the given NFT. For Solana and Bitcoin, this can be omitted or set to 0.
     */
    tokenId?: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/bids/{chain}/{contract_address}/{token_id}',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      query: {
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
      },
    })
  }
  /**
   * Active Bids By Contract
   * This endpoint is currently in beta.
   * @returns any 200
   * @throws ApiError
   */
  public activeBidsByContract({
    chain = 'ethereum',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    orderBy = 'bid_timestamp__desc',
    limit = 50,
    contractAddress = '0xed5af388653567af2f388e6224dc7c4b3241c544',
  }: {
    /**
     * Name of the chain (e.g., ethereum)
     */
    chain?:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea
     */
    marketplaces?: string
    /**
     * Lower bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Used to sort bids (defaults to bid_timestamp__desc)
     */
    orderBy?: 'bid_timestamp__desc' | 'bid_timestamp__asc' | 'bid_price__asc' | 'bid_price__desc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/bids/{chain}/{contract_address}',
      path: {
        chain: chain,
        contract_address: contractAddress,
      },
      query: {
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
      },
    })
  }
  /**
   * Active Bids By Wallet
   * This endpoint is currently in beta.
   * @returns any 200
   * @throws ApiError
   */
  public activeBidsByWallets({
    chains = 'ethereum',
    walletAddresses = '0x48AAbAb1e5224540dfD31E48DeD0Ba6725185C93,0x272982074bf6e976bbD1876b264497f7d9f300f4,',
    includeNftDetails,
    marketplaces,
    fromTimestamp,
    toTimestamp,
    count,
    cursor,
    orderBy = 'bid_timestamp__desc',
    limit = 50,
  }: {
    /**
     * Name of the chain(s), comma-separated for multiple values (e.g., polygon,ethereum)
     */
    chains?: string
    /**
     * Bidder wallet address(es), comma-separated for multiple values (e.g., 0xa12,0xb34). Limit of 20 addresses.
     */
    walletAddresses?: string
    /**
     * Include the associated NFT details for the listing within the response (pass include_nft_details=1)
     */
    includeNftDetails?: '1' | '0'
    /**
     * Marketplace IDs, comma separated for mulitple values (e.g., opensea, x2y2). Allowed values: opensea
     */
    marketplaces?: string
    /**
     * Lower bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    fromTimestamp?: number
    /**
     * Upper bound listing timestamp (inclusive). Seconds since the Unix epoch.
     */
    toTimestamp?: number
    /**
     * Include the total distinct count of Listings in the response (pass count=1)
     */
    count?: '1' | '0'
    /**
     * Used to retrieve the next page of results
     */
    cursor?: string
    /**
     * Used to sort bids (defaults to bid_timestamp__desc)
     */
    orderBy?: 'bid_timestamp__desc' | 'bid_timestamp__asc' | 'bid_price__asc' | 'bid_price__desc'
    /**
     * Limit. Defaults to 50, capped at 50.
     */
    limit?: number
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/bids/wallets',
      query: {
        chains: chains,
        wallet_addresses: walletAddresses,
        include_nft_details: includeNftDetails,
        marketplaces: marketplaces,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        count: count,
        cursor: cursor,
        order_by: orderBy,
        limit: limit,
      },
      errors: {
        400: '400',
        401: '401',
      },
    })
  }
  /**
   * Trait Floor Prices by NFT
   * @returns any 200
   * @throws ApiError
   */
  public traitFloorPricesByNft({
    chain,
    contractAddress = '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    tokenId = '19360',
  }: {
    /**
     * Name of the chain (e.g. ethereum)
     */
    chain:
      | 'ethereum'
      | 'solana'
      | 'bitcoin'
      | 'polygon'
      | 'arbitrum'
      | 'arbitrum-nova'
      | 'avalanche'
      | 'base'
      | 'bsc'
      | 'celo'
      | 'flow'
      | 'gnosis'
      | 'godwoken'
      | 'linea'
      | 'loot'
      | 'manta'
      | 'moonbeam'
      | 'optimism'
      | 'palm'
      | 'polygon-zkevm'
      | 'rari'
      | 'scroll'
      | 'zksync-era'
      | 'zora'
      | 'ethereum-goerli'
      | 'ethereum-rinkeby'
      | 'ethereum-sepolia'
      | 'solana-devnet'
      | 'solana-testnet'
      | 'polygon-mumbai'
      | 'arbitrum-goerli'
      | 'arbitrum-sepolia'
      | 'astria-devnet'
      | 'avalanche-fuji'
      | 'base-goerli'
      | 'base-sepolia'
      | 'bsc-testnet'
      | 'frame-testnet'
      | 'godwoken-testnet'
      | 'linea-testnet'
      | 'manta-testnet'
      | 'hokum-testnet'
      | 'optimism-goerli'
      | 'optimism-sepolia'
      | 'palm-testnet'
      | 'polygon-zkevm-testnet'
      | 'rari-testnet'
      | 'scroll-testnet'
      | 'scroll-sepolia'
      | 'zksync-era-testnet'
      | 'zora-testnet'
      | 'zora-sepolia'
    /**
     * Address of the NFT contract
     */
    contractAddress?: string
    /**
     * Token ID of the given NFT. For Solana and Bitcoin, this can be omitted or set to 0.
     */
    tokenId?: string
  }): CancelablePromise<{
    trait_floor_prices?: Array<{
      floor_price?: {
        marketplace_id?: string
        marketplace_name?: string
        value?: number
        payment_token?: {
          payment_token_id?: string
          name?: string
          symbol?: string
          address?: any
          decimals?: number
        }
        listing_url?: string
      }
      trait?: {
        trait_type?: string
        value?: string
      }
    }>
  }> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/nfts/traits/{chain}/{contract_address}/{token_id}/floors',
      path: {
        chain: chain,
        contract_address: contractAddress,
        token_id: tokenId,
      },
      errors: {
        400: '400',
        401: '401',
        403: '403',
      },
    })
  }
}
