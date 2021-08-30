export const getCollectionId = (nft) => nft.collection.id;
export const getNftImage = (nft) => nft.thumbnailUrl || nft.thumbnail_url;
export const getNftColletionImage = (nft) => nft.collection.cover;
export const getEditionsCount = (nft) =>
  nft?.generatedEditions?.length
    ? nft.generatedEditions.length
    : nft?.tokenIds?.length
    ? nft.tokenIds.length
    : 1;

export const ARTWORK_TYPES = {
  image: 'image',
  audio: 'audio',
  video: 'video',
};

export const GET_NFT_ARTWORK_TYPE = {
  png: ARTWORK_TYPES.image,
  jpeg: ARTWORK_TYPES.image,
  webp: ARTWORK_TYPES.image,
  gif: ARTWORK_TYPES.image,
  mp3: ARTWORK_TYPES.audio,
  mp4: ARTWORK_TYPES.video,
};

const getFileType = (nft) => nft.type || nft.artworkType;

export const isVideo = (nft) => GET_NFT_ARTWORK_TYPE[getFileType(nft)] === ARTWORK_TYPES.video;
export const isAudio = (nft) => GET_NFT_ARTWORK_TYPE[getFileType(nft)] === ARTWORK_TYPES.audio;
export const isImage = (nft) => GET_NFT_ARTWORK_TYPE[getFileType(nft)] === ARTWORK_TYPES.image;
