import axios from 'axios';

import {
  ICollectionBackend,
  INFT,
  INFTBackend,
  IUserBackend,
  NFTArtworkType,
  NFTStandard,
  ICollectionScrapper,
  ISearchBarDropdownCollection,
  IUserOwnedCollection,
  ICollection,
} from '../types';
import { mapBackendCollection, mapBackendNft, mapBackendUser, mapDropdownCollection } from '../helpers';
import { ethers } from 'ethers';

interface IGetNFTResponse {
  _id: string;
  contractAddress: string;
  tokenId: string;
  createdAt: string;
  needToRefresh: boolean;
  alternativeMediaFiles: Array<{
    type: string; // image
    url: string;
  }>;
  firstOwner: string;
  owners: Array<{
    address: string;
    transactionHash: string;
    value: number;
  }>;
  tokenType: string;
  updatedAt: string;
  sentAt: string;
  externalDomainViewUrl: string;
  metadata: {
    description: string;
    name: string;
    image: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    external_url: string;
    attributes: Array<{
      trait_type: string;
      value: string;
      display_type?: string;
    }>;
    royalties?: Array<{
      address: string;
      amount: number;
    }>;
  };
  sentForMediaAt: string;
}

export const GetNFT2Api = async (collectionAddress: string, tokenId: string | number) => {
  try {
    const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/tokens/${ethers.utils.getAddress(collectionAddress)}/${tokenId}`;

    const [{ data }, collectionData] = await Promise.all([
      axios.get<IGetNFTResponse>(url),
      GetCollectionApi(collectionAddress)
    ])

    const NFT: INFT = mapNft(data, collectionData);

    return NFT;
  } catch (e) {
    console.log(e);
    return {} as INFT;
  }
};

export const GetMoreFromCollectionApi = async (collectionAddress: string, tokenId: string) => {
  try {
    const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/${collectionAddress}/more`;

    const [{ data }, collectionData] = await Promise.all([
      axios.get<IGetNFTResponse[]>(url, {params: { excludeTokenId: tokenId, maxCount: 4 }}),
      GetCollectionApi(collectionAddress)
    ])

    const NFT = data.map((nft: IGetNFTResponse) => mapNft(nft, collectionData));

    return NFT;
  } catch (e) {
    console.log(e);
    return [{}] as INFT[];
  }
};

const tryGetArtworkType = (data: IGetNFTResponse) => {
  if (data.alternativeMediaFiles && data.alternativeMediaFiles.length && data.alternativeMediaFiles[0].type) {
    return data.alternativeMediaFiles[0].type as NFTArtworkType;
  }

  const url = data?.metadata?.image_preview_url || data?.metadata?.image_thumbnail_url || data?.metadata?.image_thumbnail_url;
  if (url) {
    const urlComponents = url.split(/[.]+/);
    const extension =  urlComponents[urlComponents.length - 1];
    return extension as NFTArtworkType;
  }

  return "" as NFTArtworkType;
}

export const GetUserApi = async (address: string) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/get-profile-info/${address.toLowerCase()}`;

  const { data } = await axios.get<IUserBackend>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  return data ? mapBackendUser(data) : undefined;
};

/**
 * Fetch collection Information from the Universe Backend API
 * @param address :string
 * @returns ICollectionBackend
 */
export const GetCollectionApi = async (address: string) : Promise<ICollection>=> {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/pages/collection/${address.toLowerCase()}`;

  try {
    const { data } = await axios.get<{ collection: ICollectionBackend; }>(url, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });

    const mappedData: ICollection = mapBackendCollection(data.collection);

    return mappedData;
  } catch (e) {
    console.log(e);
    return {} as ICollection;
  }
};


/**
 * Fetch collection information from the Datascraper API
 * @param search :string
 * @returns ISearchBarDropdownCollection
 */
export const GetCollectionsFromScraperApi = async (search: string) : Promise<ISearchBarDropdownCollection[]> => {
  const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/search?search=${search}`;

  try {
    const { data } = await axios.get<ICollectionScrapper[]>(url);

    const mappedData: ISearchBarDropdownCollection[] = data.map((item) => mapDropdownCollection(item));

    return mappedData;
  } catch (e) {
    console.log(e);
    return [];
  }
};

function mapNft(data: IGetNFTResponse, collectionData: ICollection | undefined): INFT {
  return {
    name: data?.metadata?.name ?? '',
    tokenId: data.tokenId,
    standard: data.tokenType as NFTStandard,
    collection: collectionData,
    tokenIds: [data.tokenId],
    url: data?.metadata?.external_url,
    id: data._id.toString(),
    createdAt: new Date(data.createdAt),
    description: data?.metadata?.description,
    updatedAt: new Date(data.updatedAt),
    thumbnailUrl: data?.metadata?.image_thumbnail_url,
    originalUrl: data?.metadata?.image_original_url,
    optimizedUrl: data?.metadata?.image_preview_url,
    artworkType: tryGetArtworkType(data),
    amount: 0,
    txHash: null,
    collectionId: 0,
    numberOfEditions: 1,
    properties: [],
    tokenUri: '',
    royalties: [],
    _ownerAddress: data?.owners?.length ? data.owners[data.owners.length - 1].address : undefined,
    _creatorAddress: data.firstOwner,
    _collectionAddress: data.contractAddress,
    _properties: data?.metadata?.attributes?.length ? data.metadata.attributes.map((attribute) => ({
      traitType: attribute.trait_type,
      value: attribute.value,
      displayType: attribute.display_type,
    })) : undefined,
  };
}


/**
 * Fetches user owned collections info from the Datascraper API
 * @param address user address
 * @returns returns all the collections from which the user has NFTs
 */
export const GetUserCollectionsFromScraperApi = async (address: string) : Promise<IUserOwnedCollection[]> => {
  try {
    const checkedAddress = ethers.utils.getAddress(address)
    const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/user/${checkedAddress}`;

    const { data } = await axios.get<IUserOwnedCollection[]>(url);

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
