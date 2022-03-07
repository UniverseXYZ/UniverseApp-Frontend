import { NFTArtworkType } from '../types';

export const isNFTAssetAudio = (type: NFTArtworkType | null) => {
  return type && [NFTArtworkType.MP3].includes(type);
}
