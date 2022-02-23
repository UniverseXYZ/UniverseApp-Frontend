import axios from 'axios';
import { INFT, NFTArtworkType, NFTStandard } from '../modules/nft/types';

interface IUserNFTsResponse {
  data: any[];
  page: number;
  size: string;
  total: number;
}

export const getUserNFTsApi = async (address: string, page: string | number, size: string | number) => {
  const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/users/${address}/tokens?page=${page}&size=${size}`;

  const { data: { data, ...responseData } } = await axios.get<IUserNFTsResponse>(url);

  return {
    data: data.map((nft) => {
      const extParts = nft.metadata?.image_original_url.split('.');

      return {
        name: nft.metadata?.name ?? '',
        tokenId: nft.tokenId,
        standard: nft.tokenType as NFTStandard,
        collection: undefined,
        tokenIds: [nft.tokenId], // TODO
        url: nft.metadata?.external_url, // TODO
        id: nft._id,
        createdAt: new Date(nft.createdAt),
        description: nft.metadata?.description,
        updatedAt: new Date(nft.updatedAt),
        thumbnailUrl: nft.metadata?.image_url, // TODO
        originalUrl: nft.metadata?.image_url, // TODO
        optimizedUrl: nft.metadata?.image_url, // TODO
        artworkType: extParts?.length ? extParts[extParts.length - 1] as NFTArtworkType : '',
        amount: 0, // TODO
        txHash: null,
        collectionId: 0,
        numberOfEditions: 1,
        properties: [],
        tokenUri: '',
        royalties: [],
        _ownerAddress: nft.owners?.length ? nft.owners[nft.owners.length - 1].address : undefined,
        _creatorAddress: nft.firstOwner,
        _collectionAddress: nft.contractAddress,
        _properties: nft?.metadata?.attributes?.length ? nft.metadata.attributes.map((attribute: any) => ({
          traitType: attribute.trait_type,
          value: attribute.value,
          displayType: attribute.display_type,
        })) : undefined,
      }
    }) as INFT[],
    ...responseData,
  }
};
