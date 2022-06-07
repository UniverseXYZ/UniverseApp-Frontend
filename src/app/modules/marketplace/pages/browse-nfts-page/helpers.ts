import axios from 'axios';
import querystring from 'query-string';
import {
  INFT,
  IOrder,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
  IOrderBackend,
  NFTStandard,
} from '@app/modules/nft/types';
import { mapBackendOrder } from '@app/modules/nft';
import { getURL } from '@app/api';
import { TokenTicker } from '@app/enums';
import { getTokenAddressByTicker } from '@app/constants';
import { ARTWORK_TYPES } from '@legacy/helpers/pureFunctions/nfts';
import { getArtworkType } from '@app/helpers';
import { INFTBackendType } from '@app/types';

// TODO: move to shared (general) folder

interface INFTBackend {
  contractAddress: string;
  tokenId: string;
  tokenType: string; // ERC721 | ERC1155
  externalDomainViewUrl: string;
  metadata?: {
    name?: string;
    description?: string;
    dna?: string;
    image: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url?: string;
    gif?: string;
    royalties: Array<{
      address: string;
      amount: number;
    }>;
    attributes?: Array<{
      trait_type: string;
      value: string;
      display_type?: string;
    }>;
  };
  processingSentAt: string; // date
  sentAt: string; // date
  sentForMediaAt: string; // date
  alternativeMediaFiles: Array<{
    type: string; // image
    url: string;
  }>;
  needToRefresh: boolean;
  source: string;
  orders?: IOrderBackend<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>[];
}

interface IGetActiveListingsRequestData {
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

interface IGetActiveListingsResponse {
  nfts: INFTBackend[];
  page: number;
  size: number;
}

export const getActiveListingsApi = async (params: IGetActiveListingsRequestData = { page: 1, limit: 12 }) => {
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

  const { data } = await axios.get<IGetActiveListingsResponse>(`${url}?${queryParams}`);

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

export const parseNFTBackend = (NFTData: INFTBackend): INFT => {
  const alternativeImage = NFTData.alternativeMediaFiles.find(file => file.type === ARTWORK_TYPES.image);
  const altImgComponents = alternativeImage?.url.split('.');

  let isSvg: boolean = false;

  if (altImgComponents && altImgComponents.length && altImgComponents[altImgComponents.length - 1] === 'svg'){
    isSvg = true;
  }

  // Use alternative svg sources as our s3 bucket svg storage format is broken at the moment...
  const altImageUrl = !isSvg && alternativeImage ? alternativeImage?.url : '';

  return {
    // TODO
    _creatorAddress: undefined,
    _collectionAddress: NFTData.contractAddress,
    _ownerAddress: undefined,

    tokenId: NFTData.tokenId,
    name: NFTData.metadata?.name ?? '',
    description: NFTData.metadata?.description ?? '',
    url: NFTData.externalDomainViewUrl,
    standard: NFTData.tokenType as NFTStandard,

    thumbnailUrl: getURL(
      altImageUrl ||
      NFTData.metadata?.image_thumbnail_url ||
      NFTData.metadata?.image_preview_url ||
      NFTData.metadata?.image_original_url ||
      NFTData.metadata?.image ||
      NFTData.metadata?.image_url) || '',
    originalUrl: getURL(
      altImageUrl ||
      NFTData.metadata?.image_original_url ||
      NFTData.metadata?.image_preview_url ||
      NFTData.metadata?.image ||
      NFTData.metadata?.image_url ||
      NFTData.metadata?.image_thumbnail_url) || '',
    optimizedUrl: getURL(
      altImageUrl ||
      NFTData.metadata?.image_preview_url ||
      NFTData.metadata?.image_original_url ||
      NFTData.metadata?.image ||
      NFTData.metadata?.image_url ||
      NFTData.metadata?.image_thumbnail_url) || '',
    videoUrl: getURL(NFTData.metadata?.animation_url) || '',
    gifUrl: getURL(NFTData.metadata?.gif) || '',
    previewUrl: getURL(NFTData.metadata?.image_preview_url) || '',

    properties: [],
    _properties: (NFTData.metadata?.attributes ?? []).map(attribute => ({
      traitType: attribute.trait_type,
      value: attribute.value,
      displayType: attribute.display_type,
    })),
    artworkTypes: getArtworkType(NFTData as unknown as INFTBackendType),

    // TODO: clear unused propertires
    collectionId: 0,
    collection: null,
    amount: 1,
    createdAt: undefined,
    updatedAt: undefined,
    hidden: undefined,
    id: '',
    numberOfEditions: 0,
    txHash: null,
    royalties: [],
    tokenUri: '',
    // artworkTypes: [],
    tokenIds: [],
  };
}
