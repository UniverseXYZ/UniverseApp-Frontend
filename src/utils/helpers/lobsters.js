import { BigNumber } from 'ethers';
import cover from '../../assets/images/cover.png';

export const LOBSTER_BASE_URI =
  'https://us-central1-polymorphmetadata.cloudfunctions.net/lobster-images-function-ropsten?id=';
export const LOBSTER_COLLECTION_NAME = 'Universe Lobby Lobsters';
const extractTokenIdFromURI = (tokenURI) =>
  tokenURI.substring(LOBSTER_BASE_URI.length, tokenURI.length);

export const convertLobsterObjects = (nftMetadataObjects) =>
  nftMetadataObjects.map((nft) => ({
    id: extractTokenIdFromURI(nft?.config?.url),
    type: 'collection',
    previewImage: {
      type: 'image/jpg',
      url: nft?.data?.image,
    },
    name: nft?.data?.name,
    collectionAvatar: cover,
    collectionName: LOBSTER_COLLECTION_NAME,
  }));
