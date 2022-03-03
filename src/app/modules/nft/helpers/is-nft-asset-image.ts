import { NFTArtworkType } from '../types';

export const isNFTAssetImage = (type: NFTArtworkType) => {
  return [NFTArtworkType.JPG, NFTArtworkType.JPEG, NFTArtworkType.PNG, NFTArtworkType.IMAGE, NFTArtworkType.WEBP].includes(type);
}
