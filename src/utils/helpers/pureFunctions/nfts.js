export const getCollectionId = (nft) => nft.collection.id;
export const getNftImage = (nft) => nft.thumbnailUrl || nft.thumbnail_url;

export const ARTWORK_TYPES = {
  image: 'image',
  audio: 'audio',
  video: 'video',
};

export const GET_NFT_ARTWORK_TYPE = {
  png: ARTWORK_TYPES.image,
  jpeg: ARTWORK_TYPES.image,
  gif: ARTWORK_TYPES.image,
  mp3: ARTWORK_TYPES.audio,
  mp4: ARTWORK_TYPES.video,
};

// list all properties that might contain the value of a file extension
const EXTENSION_PROPERTY_NAMES = ['artworkType', 'type'];
const extractFileType = (obj) => EXTENSION_PROPERTY_NAMES.reduce((name) => obj[name]);

export const isVideo = (dat) => GET_NFT_ARTWORK_TYPE[extractFileType(dat)] === ARTWORK_TYPES.video;
export const isAudio = (dat) => GET_NFT_ARTWORK_TYPE[extractFileType(dat)] === ARTWORK_TYPES.audio;
export const isImage = (dat) => GET_NFT_ARTWORK_TYPE[extractFileType(dat)] === ARTWORK_TYPES.image;

export const getEditionsCount = (nft) =>
  nft?.generatedEditions?.length ? nft.generatedEditions.length : 1;
