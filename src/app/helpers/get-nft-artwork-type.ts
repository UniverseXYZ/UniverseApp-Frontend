import { INFTBackendType } from '../types';
import { NFTArtworkType } from '../modules/nft/types';

export const getArtworkTypeByUrl = (url: string | null | undefined) => {
  const availableArtworkTypes = Object
    .keys(NFTArtworkType)
    .map((key) => (NFTArtworkType as Record<string, NFTArtworkType>)[key]);

  const urlComponents = (url || '').split(/[.]+/);
  const extension = urlComponents[urlComponents.length - 1].toLowerCase() as NFTArtworkType;
  if (availableArtworkTypes.includes(extension)) {
    return extension;
  }

  return null;
}

export const getArtworkType = (data: INFTBackendType) => {
  const urls = [
    data?.metadata?.animation_url,
    data?.metadata?.gif,
    data?.metadata?.image,
    data?.metadata?.image_url,
    data?.metadata?.image_original_url,
    data?.metadata?.image_preview_url,
    data?.metadata?.image_thumbnail_url,
    ...(data.alternativeMediaFiles ?? []).map((file) => file.type),
  ];

  const artworkTypes = [];
  for (const url of urls) {
    const result = getArtworkTypeByUrl(url);
    if (result) {
      artworkTypes.push(result);
    }
  }

  return artworkTypes;
}
