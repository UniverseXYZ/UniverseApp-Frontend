import { NFTArtworkType } from '../types';

export const isNFTAssetImage = (type: NFTArtworkType) => {
  return ['', NFTArtworkType.JPG, NFTArtworkType.JPEG, NFTArtworkType.PNG].includes(type);
}
