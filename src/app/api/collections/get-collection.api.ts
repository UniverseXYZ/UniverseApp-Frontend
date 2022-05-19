import axios from "axios";
import { ethers } from "ethers";
import { mapNft } from "..";
import { IUserOwnedCollection } from "../../modules/account/types";
import { ICollection, ICollectionBackend, ISearchBarDropdownCollection, ICollectionScrapper, ICollectionInfoResponse } from "../../modules/collection/types/collection";
import { mapBackendCollection, mapDropdownCollection } from "../../modules/nft";
import { INFT } from "../../modules/nft/types";
import { INFTBackendType } from "../../types";

interface ICollectionNFTsResponse {
    data: any[];
    page: number;
    size: string;
    total: number;
}

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
  
export const GetMoreFromCollectionApi = async (collectionAddress: string, tokenId: string) => {
  try {
    const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/${collectionAddress}/more`;

    const { data } = await axios.get<INFTBackendType[]>(url, {params: { excludeTokenId: tokenId, maxCount: 4 }})

    const NFT = data.map((nft: INFTBackendType) => mapNft(nft, null));

    return NFT;
  } catch (e) {
    console.log(e);
    return [{}] as INFT[];
  }
};

/**
 * Fetch collection information from the Datascraper API
 * @param search :string
 * @returns ISearchBarDropdownCollection
 */
export const GetCollectionsFromScraperApi = async (search: string) : Promise<ISearchBarDropdownCollection[]> => {
  const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/search/collections?search=${search}`;

  try {
    const { data } = await axios.get<ICollectionScrapper[]>(url);

    const mappedData: ISearchBarDropdownCollection[] = data.map((item) => mapDropdownCollection(item));

    return mappedData;
  } catch (e) {
    console.log(e);
    return [];
  }
};

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

/**
 * Fetches collection nfts from Datascraper API
 * @param address collection address
 * @param page page
 * @param size size
 * @returns returns all the collection nfts
 */
export const GetCollectionNFTsApi = async (address: string, page: string | number, size: string | number, search?: string, traits?: Record<string, string[]>) => {
  try {
    const traitsQuery = !traits
      ? ''
      : Object.keys(traits).map((traitType) => `${traitType}=${traits[traitType].join(',')}`).join('&');

    const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/${address}/tokens?page=${page}&size=${size}&search=${search}&traits=${encodeURIComponent(traitsQuery)}`;

    const { data: { data, ...responseData } } = await axios.get<ICollectionNFTsResponse>(url);

    return {
      data: data.map((nft: INFTBackendType) => mapNft(nft, null)),
      ...responseData,
    }
  } catch (e) {
    console.log(e);
    return {} as ICollectionNFTsResponse;
  }
};

/**
 * Fetches collection owners count
 * @param address collection address
 * @returns returns owners count
 */
export const GetCollectionGeneralInfo = async (address: string) : Promise<ICollectionInfoResponse> => {
  try {
    const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/${ethers.utils.getAddress(address)}`;

    const { data } = await axios.get<ICollectionInfoResponse>(url);

    return data;
  } catch (e) {
    console.log(e);
    return {} as ICollectionInfoResponse;
  }
};

