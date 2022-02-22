import axios from 'axios';

import { ICollectionBackend, INFT, INFTBackend, IUserBackend, NFTArtworkType, NFTStandard } from '../types';
import { mapBackendCollection, mapBackendNft, mapBackendUser } from '../helpers';
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

  const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/tokens/${ethers.utils.getAddress(collectionAddress)}/${tokenId}`;

  const { data } = await axios.get<IGetNFTResponse>(url);

  const NFT: INFT = {
    name: data.metadata?.name ?? '',
    tokenId: data.tokenId,
    standard: data.tokenType as NFTStandard,
    collection: (await GetCollectionApi(data.contractAddress)),
    tokenIds: [data.tokenId], // TODO
    url: data.metadata?.external_url, // TODO
    id: 1, // TODO
    createdAt: new Date(data.createdAt),
    description: data.metadata?.description,
    updatedAt: new Date(data.updatedAt),
    thumbnailUrl: data.metadata?.image_url, // TODO
    originalUrl: data.metadata?.image_url, // TODO
    optimizedUrl: data.metadata?.image_url, // TODO
    artworkType: (data.alternativeMediaFiles && data.alternativeMediaFiles.length ? data.alternativeMediaFiles[0].type : '') as NFTArtworkType,
    amount: 0, // TODO
    txHash: null,
    collectionId: 0,
    numberOfEditions: 1,
    properties: [],
    tokenUri: '',
    royalties: [],
    _ownerAddress: data.owners?.length ? data.owners[data.owners.length - 1].address : undefined,
    _creatorAddress: data.firstOwner,
    _collectionAddress: data.contractAddress,
    _properties: data?.metadata?.attributes?.length ? data.metadata.attributes.map((attribute) => ({
      traitType: attribute.trait_type,
      value: attribute.value,
      displayType: attribute.display_type,
    })) : undefined,
  };

  return NFT;
};

export const GetUserApi = async (address: string) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/get-profile-info/${address.toLowerCase()}`;

  const { data } = await axios.get<IUserBackend>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  return data ? mapBackendUser(data) : undefined;
};

export const GetCollectionApi = async (address: string) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/pages/collection/${address.toLowerCase()}`;

  const { data } = await axios.get<{ collection: ICollectionBackend; }>(url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  });

  return data ? mapBackendCollection(data.collection) : undefined;
};
