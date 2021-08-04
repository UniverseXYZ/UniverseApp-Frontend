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

export const getEditionsCount = (nft) =>
  nft?.generatedEditions?.length ? nft.generatedEditions.length : 1;
