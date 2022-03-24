import { NFTArtworkType } from '../types';

export const isNFTAssetVideo = (types: NFTArtworkType[]) => {
  return types.some(type => [NFTArtworkType.MP4, NFTArtworkType.VIDEO].includes(type));
}
