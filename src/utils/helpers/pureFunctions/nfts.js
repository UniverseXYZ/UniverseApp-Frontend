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
  webp: ARTWORK_TYPES.image,
  gif: ARTWORK_TYPES.image,
  mp3: ARTWORK_TYPES.audio,
  mp4: ARTWORK_TYPES.video,
};

// list all properties that might contain the value of a file extension
const EXTENSION_PROPERTY_NAMES = ['artworkType', 'type'];
// test if any of the properies that hold the extension name will be found on the nft object
const extractFileType = (obj) => EXTENSION_PROPERTY_NAMES.reduce((name) => obj[name]);

export const isVideo = (nft) => GET_NFT_ARTWORK_TYPE[extractFileType(nft)] === ARTWORK_TYPES.video;
export const isAudio = (nft) => GET_NFT_ARTWORK_TYPE[extractFileType(nft)] === ARTWORK_TYPES.audio;
export const isImage = (nft) => GET_NFT_ARTWORK_TYPE[extractFileType(nft)] === ARTWORK_TYPES.image;

export const getEditionsCount = (nft) =>
  nft?.generatedEditions?.length ? nft.generatedEditions.length : 1;
