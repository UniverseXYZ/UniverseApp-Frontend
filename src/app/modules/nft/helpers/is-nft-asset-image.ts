import { NFTArtworkType } from '../types';

export const isNFTAssetImage = (type: NFTArtworkType) => {
  return [NFTArtworkType.JPEG, NFTArtworkType.PNG].includes(type);
}
