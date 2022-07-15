import axios from 'axios';
import { ethers } from 'ethers';
import { INFTBackendType } from '@app/types';
import { getArtworkType } from '@app/helpers';
import { ARTWORK_TYPES } from '@legacy/helpers/pureFunctions/nfts';
import { GetCollectionApi } from '../collections';
import { ICollection } from '../../modules/collection/types/collection';
import { INFT, NFTStandard } from '../../modules/nft/types';

export const GetNFTApi = async (collectionAddress: string, tokenId: string | number, fetchCollection = true) => {
  const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/tokens/${ethers.utils.getAddress(collectionAddress)}/${tokenId}`;

  if (fetchCollection) {
    const [{ data }, collectionData] = await Promise.all([
      axios.get<INFTBackendType>(url),
      GetCollectionApi(collectionAddress)
    ])

    return mapNft(data, collectionData);
  }

  const [{ data }] = await Promise.all([
    axios.get<INFTBackendType>(url),
  ])

  return mapNft(data, null);

};

export const getURL = (url: string | null | undefined) => {
  if (!url) {
    return undefined;
  }

  if (url.startsWith('ipfs://ipfs')) {
    return url.replace('ipfs://', 'https://ipfs.io/');
  }
  else if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  return url;
}

/**
 * @deprecated
 * @param data
 * @param collectionData
 */
export const mapNft = (data: INFTBackendType, collectionData: ICollection | null): INFT => {
  const alternativeImage = data.alternativeMediaFiles.find(file => file.type === ARTWORK_TYPES.image);
  const altImgComponents = alternativeImage?.url.split('.');

  let isSvg: boolean = false;

  if (altImgComponents && altImgComponents.length && altImgComponents[altImgComponents.length - 1] === 'svg'){
      isSvg = true;
  }

  // Use alternative svg sources as our s3 bucket svg storage format is broken at the moment...
  const altImageUrl = !isSvg && alternativeImage ? alternativeImage?.url : '';

  return {
    name: data.metadata?.name ?? `#${data.tokenId}`,
    tokenId: data.tokenId,
    standard: data.tokenType as NFTStandard,
    collection: collectionData,
    tokenIds: [data.tokenId],
    url: data.metadata?.external_url,
    id: data._id || data.id || `${data.tokenId}-${data.contractAddress?.toLowerCase()}`,
    createdAt: new Date(data.createdAt),
    description: data.metadata?.description,
    updatedAt: new Date(data.updatedAt),
    videoUrl: getURL(data.metadata?.animation_url) || '',
    gifUrl: getURL(data.metadata?.gif) || '',
    previewUrl: getURL(data.metadata?.image_preview_url) || '',
    thumbnailUrl: getURL(altImageUrl ||
      data.metadata?.image_thumbnail_url ||
      data.metadata?.image_preview_url ||
      data.metadata?.image_original_url ||
      data.metadata?.image ||
      alternativeImage?.url ||
      data.metadata?.image_url) || '',
    originalUrl: getURL(altImageUrl ||
      data.metadata?.image_original_url ||
      data.metadata?.image_preview_url ||
      data.metadata?.image ||
      data.metadata?.image_url ||
      data.metadata?.image_thumbnail_url) || '',
    optimizedUrl: getURL(altImageUrl ||
      data.metadata?.image_preview_url ||
      data.metadata?.image_original_url ||
      data.metadata?.image ||
      data.metadata?.image_url ||
      data.metadata?.image_thumbnail_url) || '',
    artworkTypes: getArtworkType(data),
    amount: 0,
    txHash: null,
    collectionId: 0,
    numberOfEditions: 1,
    properties: [],
    tokenUri: '',
    royalties: data.metadata?.royalties?.length ? data.metadata?.royalties : undefined,
    creatorAddress: data.firstOwner,
    _ownerAddress: data.owners?.length ? data.owners[data.owners.length - 1].owner || data.owners[data.owners.length - 1].address : undefined,
    _creatorAddress: data.firstOwner,
    _collectionAddress: data.contractAddress,
    _properties: data.metadata?.attributes?.length ? data.metadata?.attributes.map((attribute) => ({
      traitType: attribute.trait_type,
      value: attribute.value,
      displayType: attribute.display_type,
    })) : undefined,
  };
}
