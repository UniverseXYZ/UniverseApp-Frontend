import { INFT, INFTBackend } from '../types';

export function mapBackendNft(
  {
    optimized_url,
    original_url,
    thumbnail_url,
    createdAt,
    updatedAt,
    ...NFT
  }: INFTBackend
): INFT {
  return {
    ...NFT,
    optimizedUrl: optimized_url,
    originalUrl: original_url,
    thumbnailUrl: thumbnail_url,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
