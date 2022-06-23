import axios from 'axios';
import querystring from 'query-string';

import { getTokenAddressByTicker } from '@app/constants';
import { TokenTicker } from '@app/enums';
import { mapBackendOrder } from '@app/modules/nft';
import { INFT, IOrder, IOrderAssetTypeERC20, IOrderAssetTypeSingleListing } from '@app/modules/nft/types';

import { INFTBackend } from './types';
import { parseNFTBackend } from './get-nfts.parsers';

interface IQueryNFTsAPIRequestData {
  page: number;
  limit: number;
  search?: string;
  sortBy?: number;
  collection?: string;
  tokenIds?: string[];
  buyNow?: boolean;
  hasOffers?: boolean;
  newest?: boolean;
  singleListing?: boolean;
  bundleListing?: boolean;
  tokenTicker?: TokenTicker;
  minPrice?: number;
  maxPrice?: number;
  artist?: string;
  traits?: Record<string, string[]>;
}

interface IQueryNFTsAPIResponse {
  nfts: INFTBackend[];
  page: number;
  size: number;
}

export const queryNFTsApi = async (params: IQueryNFTsAPIRequestData = { page: 1, limit: 12 }) => {
  const url = `${process.env.REACT_APP_CLOUD_FUNCTIONS}/nfts`;

  const queryParams = querystring.stringify({
    action: 'query',
    page: params.page,
    limit: params.limit,
    searchQuery: params.search || undefined,
    sortBy: params.sortBy || undefined,
    contractAddress: params.collection,
    tokenIds: params.tokenIds ? params.tokenIds.join(',') : undefined,
    assetClass: [
      params.singleListing && 'ERC721',
      params.bundleListing && 'ERC721_BUNDLE'
    ].filter(Boolean).join(',').trim() || undefined,
    side: params.buyNow ? 1 : undefined,
    hasOffers: params.hasOffers || undefined,
    beforeTimestamp: params.newest ? Math.floor(new Date().getTime() / 1000) : undefined,
    tokenAddress: params.tokenTicker ? getTokenAddressByTicker(params.tokenTicker) : undefined,
    minPrice: params.minPrice || undefined,
    maxPrice: params.maxPrice || undefined,
    ownerAddress: params.artist || undefined,
    traits: !params.traits || !Object.keys(params.traits).length
      ? undefined
      : Object.keys(params.traits).map((key) => {
        return `${key}:${params.traits && params.traits[key].join(',')}`;
      }).join(':'),
  });

  const { data } = await axios.get<IQueryNFTsAPIResponse>(`${url}?${queryParams}`);

  const { nfts, ...rest } = data;

  type IResult = Array<{
    NFT: INFT;
    order?: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;
    owners: Array<{
      address: string;
      transactionHash?: string;
      value: number;
    }>;
  }>;

  return {
    ...rest,
    data: nfts.reduce<IResult>((acc, NFT) => {
      acc.push({
        NFT: parseNFTBackend(NFT),
        order: NFT.orders?.length
          ? mapBackendOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>(NFT.orders?.[0])
          : undefined,
        owners: NFT?.owners?.length
          ? NFT?.owners.map(({ value, owner, transactionHash }) => ({
            transactionHash,
            address: owner,
            value: +value
          }))
          : [],
      });

      return acc;
    }, [])
  };
}
