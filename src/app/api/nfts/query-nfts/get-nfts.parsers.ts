import { getURL } from '@app/api';
import { getArtworkType } from '@app/helpers';
import { INFT, NFTStandard } from '@app/modules/nft/types';
import { INFTBackendType } from '@app/types';
import { ARTWORK_TYPES } from '@legacy/helpers/pureFunctions/nfts';

import { INFTBackend } from './types';

export const parseNFTBackend = (NFTData: INFTBackend): INFT => {
  const alternativeImage = NFTData.alternativeMediaFiles?.find(file => file.type === ARTWORK_TYPES.image);
  const altImgComponents = alternativeImage?.url.split('.');

  let isSvg: boolean = false;

  if (altImgComponents && altImgComponents.length && altImgComponents[altImgComponents.length - 1] === 'svg'){
    isSvg = true;
  }

  // Use alternative svg sources as our s3 bucket svg storage format is broken at the moment...
  const altImageUrl = !isSvg && alternativeImage ? alternativeImage?.url : '';

  return {
    _creatorAddress: undefined,
    _collectionAddress: NFTData.contractAddress,
    _ownerAddress: undefined,

    tokenId: NFTData.tokenId,
    name: NFTData.metadata?.name ?? '',
    description: NFTData.metadata?.description ?? '',
    url: NFTData.externalDomainViewUrl,
    standard: NFTData.tokenType as NFTStandard,

    thumbnailUrl: getURL(
      altImageUrl ||
      NFTData.metadata?.image_thumbnail_url ||
      NFTData.metadata?.image_preview_url ||
      NFTData.metadata?.image_original_url ||
      NFTData.metadata?.image ||
      NFTData.metadata?.image_url) || '',
    originalUrl: getURL(
      altImageUrl ||
      NFTData.metadata?.image_original_url ||
      NFTData.metadata?.image_preview_url ||
      NFTData.metadata?.image ||
      NFTData.metadata?.image_url ||
      NFTData.metadata?.image_thumbnail_url) || '',
    optimizedUrl: getURL(
      altImageUrl ||
      NFTData.metadata?.image_preview_url ||
      NFTData.metadata?.image_original_url ||
      NFTData.metadata?.image ||
      NFTData.metadata?.image_url ||
      NFTData.metadata?.image_thumbnail_url) || '',
    videoUrl: getURL(NFTData.metadata?.animation_url) || '',
    gifUrl: getURL(NFTData.metadata?.gif) || '',
    previewUrl: getURL(NFTData.metadata?.image_preview_url) || '',

    properties: [],
    _properties: (NFTData.metadata?.attributes ?? []).map(attribute => ({
      traitType: attribute.trait_type,
      value: attribute.value,
      displayType: attribute.display_type,
    })),
    artworkTypes: getArtworkType(NFTData as unknown as INFTBackendType),

    // Unused properties
    collectionId: 0,
    collection: null,
    amount: 1,
    createdAt: undefined,
    updatedAt: undefined,
    hidden: undefined,
    id: '',
    numberOfEditions: 0,
    txHash: null,
    royalties: [],
    tokenUri: '',
    tokenIds: [],
  };
}
