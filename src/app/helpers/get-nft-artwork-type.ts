import { INFTBackendType } from '../types';
import { NFTArtworkType } from '../modules/nft/types';

export const getArtworkType = (data: INFTBackendType) => {
  const availableArtworkTypes = Object
    .keys(NFTArtworkType)
    .map((key) => (NFTArtworkType as Record<string, NFTArtworkType>)[key]);

  const urls = [
    data?.metadata?.image_url,
    data?.metadata?.image_original_url,
    data?.metadata?.image_preview_url,
    data?.metadata?.image_thumbnail_url,
    ...(data.alternativeMediaFiles ?? []).map((file) => file.type),
  ];

  for (const url of urls) {
    const urlComponents = (url || '').split(/[.]+/);
    const extension = urlComponents[urlComponents.length - 1] as NFTArtworkType;
    if (availableArtworkTypes.includes(extension)) {
      return extension;
    }
  }

  return null;
}
