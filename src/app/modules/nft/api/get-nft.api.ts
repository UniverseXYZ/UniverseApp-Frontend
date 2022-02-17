import axios from 'axios';

import { ICollectionBackend, INFTBackend, IUserBackend } from '../types';
import { mapBackendCollection, mapBackendNft, mapBackendUser } from '../helpers';

interface IGetNFTResponse {
  collection: ICollectionBackend;
  creator: IUserBackend;
  moreFromCollection: INFTBackend[];
  nft: INFTBackend;
  owner: IUserBackend;
  tokenIds: string[];
}

export const GetNFTApi = async (collectionAddress: string, tokenId: string) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/pages/nft/${collectionAddress}/${tokenId}`;

  const { data } = await axios.get<IGetNFTResponse>(url);

  const NFT = mapBackendNft(data.nft);

  NFT.collection = mapBackendCollection(data.collection);
  NFT.creator = mapBackendUser(data.creator || {});
  NFT.owner = mapBackendUser(data.owner || {});

  NFT.tokenIds = data.tokenIds;
  NFT.moreFromCollection = data.moreFromCollection.map((NFTBackend) => ({
    ...mapBackendNft(NFTBackend),
    collection: NFT.collection
  }));

  return NFT;
};
