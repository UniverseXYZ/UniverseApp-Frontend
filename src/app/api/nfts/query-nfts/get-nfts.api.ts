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
  buyNow?: boolean;
  hasOffers?: boolean;
  newest?: boolean;
  singleListing?: boolean;
  bundleListing?: boolean;
  tokenTicker?: TokenTicker;
  minPrice?: number;
  maxPrice?: number;
  artist?: string;
}

interface IQueryNFTsAPIResponse {
  nfts: INFTBackend[];
  page: number;
  size: number;
}

export const queryNFTsApi = async (params: IQueryNFTsAPIRequestData = { page: 1, limit: 12 }) => {
  const url = `${process.env.REACT_APP_CLOUD_FUNCTIONS}/queryNfts`;

  const queryParams = querystring.stringify({
    page: params.page,
    limit: params.limit,
    searchQuery: params.search || undefined,
    sortBy: params.sortBy || undefined,
    contractAddress: params.collection,
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
  });

  const { data } = await axios.get<IQueryNFTsAPIResponse>(`${url}?${queryParams}`);

  const { nfts, ...rest } = data;

  type IResult = Array<{
    order: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20> | undefined;
    NFT: INFT;
  }>;

  return {
    ...rest,
    data: nfts.reduce<IResult>((acc, NFT) => {
      acc.push({
        order: NFT.orders?.length
          ? mapBackendOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>(NFT.orders?.[0])
          : undefined,
        NFT: parseNFTBackend(NFT),
      });

      return acc;
    }, [])
  };
}
