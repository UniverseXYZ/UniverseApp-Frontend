import { INFT, INFTBackend } from '../types';
import { mapBackendUser } from './map-backend-user';

export function mapBackendNft(
  {
    optimized_url,
    original_url,
    thumbnail_url,
    createdAt,
    updatedAt,
    creator,
    owner,
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
    creator: creator && typeof creator === 'object' ? mapBackendUser(creator) : {
      address: creator,
      displayName: creator,
    },
    owner: owner && typeof owner === 'object' ? mapBackendUser(owner) : {
      address: owner,
      displayName: owner,
    },
  };
}
