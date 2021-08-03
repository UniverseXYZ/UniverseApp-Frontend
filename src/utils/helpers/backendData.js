export const getEditionsCount = (nft) =>
  nft?.generatedEditions?.length ? nft.generatedEditions.length : 1;
