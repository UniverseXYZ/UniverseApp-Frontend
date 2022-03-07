import { NFTArtworkType } from '../types';

export const isNFTAssetVideo = (type: NFTArtworkType | null) => {
  return type && [NFTArtworkType.MP4].includes(type);
}
