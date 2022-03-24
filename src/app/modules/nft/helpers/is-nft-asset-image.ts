import { NFTArtworkType } from '../types';

export const isNFTAssetImage = (types: NFTArtworkType[]) => {
  return types.some(type => [
    NFTArtworkType.JPG,
    NFTArtworkType.JPEG,
    NFTArtworkType.PNG,
    NFTArtworkType.IMAGE,
    NFTArtworkType.WEBP,
    NFTArtworkType.GIF,
  ].includes(type));
}
