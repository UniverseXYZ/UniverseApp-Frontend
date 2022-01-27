import { NFTArtworkType } from '../types';

export const isNFTAssetVideo = (type: NFTArtworkType) => {
  return [NFTArtworkType.MP4].includes(type);
}
