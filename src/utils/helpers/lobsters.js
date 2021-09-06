import { BigNumber } from 'ethers';
import cover from '../../assets/images/cover.png';

export const LOBSTER_COLLECTION_NAME = 'Universe Lobby Lobsters';
const extractTokenIdFromURI = (tokenURI) =>
  tokenURI.substring(process.env.REACT_APP_LOBSTER_IMAGES_URL.length, tokenURI.length);

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
