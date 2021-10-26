/* eslint-disable no-debugger */
/* eslint-disable arrow-body-style */
/* eslint-disable no-await-in-loop */
import {
  getMetaForSavedNft,
  getTokenURI,
  saveCollection,
  attachTxHashToCollection,
} from '../../utils/api/mintNFT';
import {
  createAuction,
  editAuction,
  editRewardTier,
  addRewardTier,
} from '../../utils/api/auctions';
import { resolveAllPromises } from '../../utils/helpers/pureFunctions/minting';

/**
 * @param {Object} nfts
 * @param {Array} res
 * @returns {Object[]} nfts: { tokenUri }
 */
const attachTokenURIs = (nfts, res) =>
  nfts.map((nft, i) => ({
    ...nft,
    tokenUri: res[i],
  }));

/**
 * @param {Object} data
 * @param {Object[]} nfts
 * @param data.nfts.id
 * @returns {Object[]} nfts: { tokenUri }
 */
export const getTokenURIsForSavedNfts = async ({ nfts }) => {
  const promises = [];

  nfts.forEach((nft) => promises.push(getMetaForSavedNft(nft.id)));

  const res = await resolveAllPromises(promises);

  if (!res.length) {
    console.error('server error. cannot get meta data');
    return {};
  }

  const nftsAttachedTokenUri = attachTokenURIs(nfts, res);

  return { nfts: nftsAttachedTokenUri };
};

/**
 * @param {Object} data
 * @param {Object} data.helpers
 * @param {Object} data.collection
 * @param data.collection.file
 * @param data.collection.name
 * @param data.collection.symbol
 * @param data.collection.description
 * @param data.collection.shortUrl
 * @param data.collection.id
 * @returns {Object} nfts: { collection: { ...collection, id }, helpers }
 */
export const sendSaveCollectionRequest = async ({ collection, helpers }) => {
  const { file, name, symbol, description } = collection;
  const collectionCreationResult = await saveCollection({
    file,
    name,
    symbol,
    description,
  });

  collection.id = collectionCreationResult?.id;

  return {
    collection,
    helpers,
  };
};

// /**
//  * @param {Object} data
//  * @param {Object} data.collection
//  * @param data.collection.transactionHash
//  * @param data.collection.id
//  */
// export const updateCollectionTxHash = async ({ collection }) => {
//   const response = await attachTxHashToCollection(collection.transactionHash, collection.id);

//   if (!response.ok && response.status !== 201) {
//     console.error(`Error while trying to save a new collection: ${response.statusText}`);
//   }

//   return response;
// };

//
// Auctions
//

export const sendCreateAuctionRequest = async ({ requestObject }) => {
  const res = await createAuction(requestObject);
  return res;
};

export const sendUpdateAuctionRequest = async ({ requestObject }) => {
  const res = await editAuction(requestObject);

  const auctionId = requestObject.id;
  const newTiers = requestObject.rewardTiers.filter((tier) => !tier.id);
  const updateTiers = requestObject.rewardTiers.filter((tier) => tier.id);

  const updateRewardTiersPromises = updateTiers.map(async (tier) => {
    const { name, numberOfWinners, nftsPerWinner, minimumBid, nftSlots, id } = tier;
    const minBid = parseFloat(minimumBid);
    const requestTier = {
      name,
      numberOfWinners,
      nftsPerWinner,
      minimumBid: minBid,
      nftSlots,
    };
    return editRewardTier(requestTier, id);
  });

  const updatedTiers = await Promise.all(updateRewardTiersPromises);
  const hasUpdateError = updatedTiers.filter((el) => el.error);

  if (hasUpdateError.length) {
    return {
      error: true,
      errors: hasUpdateError,
    };
  }

  const addRewardTiersPromises = newTiers.map(async (tier) => {
    const { name, numberOfWinners, nftsPerWinner, minimumBid, nftSlots } = tier;
    const minBid = parseFloat(minimumBid);
    const requestTier = {
      name,
      numberOfWinners,
      nftsPerWinner,
      minimumBid: minBid,
      nftSlots,
    };

    const body = {
      auctionId,
      rewardTier: requestTier,
    };
    return addRewardTier(body);
  });

  const addedTiers = await Promise.all(addRewardTiersPromises);
  const hasAddError = addedTiers.filter((el) => el.error);

  if (hasAddError.length) {
    return {
      error: true,
      errors: hasAddError,
    };
  }

  return res;
};
