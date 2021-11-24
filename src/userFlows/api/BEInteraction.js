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
  removeRewardTier,
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
  // Remvoe the locally deleted reward tiers from the Create Auction request
  const rewardTiers = requestObject.rewardTiers.filter((t) => !t.removed);
  requestObject.rewardTiers = rewardTiers;

  const res = await createAuction(requestObject);
  return res;
};

export const sendUpdateAuctionRequest = async ({ requestObject }) => {
  const res = await editAuction(requestObject);

  const auctionId = requestObject.id;
  const newTiers = requestObject.rewardTiers.filter(
    (tier) => !tier.removed && typeof tier.id === 'string' && tier.id.startsWith('new-tier')
  );
  const updateTiers = requestObject.rewardTiers.filter(
    (tier) =>
      tier.id && !tier.removed && !(typeof tier.id === 'string' && tier.id.startsWith('new-tier'))
  );

  const removeTiers = requestObject.rewardTiers.filter((t) => t.removed);
  let error = null;

  // eslint-disable-next-line no-restricted-syntax
  for (const tier of removeTiers) {
    const { id } = tier;
    const r = await removeRewardTier(id);
    if (r.error) {
      error = r.error;
      break;
    }
  }

  if (error) {
    return {
      error: true,
      errors: error,
    };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const tier of updateTiers) {
    const { name, numberOfWinners, nftsPerWinner, minimumBid, nftSlots, id } = tier;
    const minBid = parseFloat(minimumBid);
    const requestTier = {
      name,
      numberOfWinners,
      nftsPerWinner,
      minimumBid: minBid,
      nftSlots,
    };
    const r = await editRewardTier(requestTier, id);
    if (r.error) {
      error = r.error;
      break;
    }
  }

  if (error) {
    return {
      error: true,
      errors: error,
    };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const tier of newTiers) {
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
    const r = await addRewardTier(body);
    if (r.error) {
      error = r.error;
      break;
    }
  }

  if (error) {
    return {
      error: true,
      errors: error,
    };
  }
  return res;
};
