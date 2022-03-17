import { NFTArtworkType } from '../types';

export const isNFTAssetAudio = (types: NFTArtworkType[]) => {
  return types.some(type => [NFTArtworkType.MP3].includes(type));
}
