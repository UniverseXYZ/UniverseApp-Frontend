/* eslint-disable no-debugger */
/* eslint-disable arrow-body-style */
/* eslint-disable no-await-in-loop */
import { getMetaForSavedNft, getTokenURI } from '../../utils/api/mintNFT';
import { resolveAllPromises } from '../../utils/helpers/pureFunctions/minting';

const attachTokenURIs = (nfts, res) =>
  nfts.map((nft, i) => ({
    ...nft,
    tokenUri: res[i],
  }));

export const getTokenURIsForSavedNfts = async ({ nfts }) => {
  const promises = [];

  nfts.forEach((nft) => promises.push(getMetaForSavedNft(nft.id)));

  const res = await resolveAllPromises(promises);
  const nftsAttachedTokenUri = attachTokenURIs(nfts, res);

  return { nfts: nftsAttachedTokenUri };
};

export const generateTokenURIs = async ({ nfts }) => {
  const promises = [];

  nfts.forEach((nft) =>
    promises.push(
      getTokenURI({
        file: nft.previewImage || nft.file,
        name: nft.name,
        description: nft.description,
        editions: nft.numberOfEditions,
        propertiesParsed: nft.properties,
        royaltiesParsed: nft.royalties,
      })
    )
  );

  const res = await resolveAllPromises(promises);
  const nftsAttachedTokenUri = attachTokenURIs(nfts, res);

  return { nfts: nftsAttachedTokenUri };
};

export const sendSaveCollectionRequest = async ({ collection, helpers }) => {
  const { file, name, symbol, description, shortUrl } = collection;
  const collectionCreationResult = await saveCollection({
    file,
    name,
    symbol,
    description,
    shortUrl,
  });

  collection.id = collectionCreationResult?.id;

  return {
    collection,
    helpers,
  };
};

export const updateCollectionTxHash = async ({ collection }) => {
  const response = await attachTxHashToCollection(collection.transactionHash, collection.id);

  if (!response.ok && response.status !== 201) {
    console.error(`Error while trying to save a new collection: ${response.statusText}`);
  }

  return collection;
};

export const getSingleCollectionAddress = async (data) => {
  // get collection address
  return data;
};
