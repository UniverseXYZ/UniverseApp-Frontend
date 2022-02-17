import { NFTArtworkType } from '../types';

export const isNFTAssetAudio = (type: NFTArtworkType) => {
  return [NFTArtworkType.MP3].includes(type);
}
