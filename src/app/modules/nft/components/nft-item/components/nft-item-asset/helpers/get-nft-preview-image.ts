import { INFT } from '@app/modules/nft/types';

export const getNFTPreviewImage = (NFT: INFT) => {
  return [
    NFT.optimizedUrl,
    NFT.originalUrl,
    NFT.previewUrl,
    NFT.thumbnailUrl,
  ].find(url => !!url);
};
