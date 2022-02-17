import axios from 'axios';
import { ICollectionBackend, INFTBackend, IUserBackend } from '../types';
import { mapBackendCollection, mapBackendNft, mapBackendUser } from '../helpers';

interface IResponse {
  collection: ICollectionBackend;
  creator: IUserBackend;
  moreFromCollection: INFTBackend[];
  nft: INFTBackend;
  owner: IUserBackend;
  tokenIds: string[];
}

export const GetNFTApi = async (collectionAddress: string, tokenId: string) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/pages/nft/${collectionAddress}/${tokenId}`;

  const response = (await axios.get<IResponse>(url)).data;

  const NFT = mapBackendNft(response.nft);

  NFT.collection = mapBackendCollection(response.collection);
  NFT.creator = mapBackendUser(response.creator);
  NFT.owner = mapBackendUser(response.owner);

  NFT.tokenIds = response.tokenIds;
  NFT.moreFromCollection = response.moreFromCollection.map((NFTBackend) => mapBackendNft(NFTBackend));

  return NFT;
};
