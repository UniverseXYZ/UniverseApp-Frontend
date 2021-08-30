import { asyncPipe } from '../utils/helpers/pureFunctions/pipe';
import { sendCreateAuctionRequest } from './api/BEInteraction';
import {
  createRequestObject,
  attachTokenData,
  parseNumbers,
  attachTierNftsIds,
} from '../utils/helpers/pureFunctions/auctions';

/**
 * @param {Object} data
 * @param {Object} data.collectionInput
 * @param data.collection.file
 * @param data.collection.name
 * @param data.collection.symbol
 * @param data.collection.description
 * @param {Object} data.helpers
 * @param data.helpers.universeERC721FactoryContract
 * @returns {Object} collection: { ...collection, transactionHash, from, id }
 */
export async function AuctionCreate({ auction, bidtype }) {
  const res = await asyncPipe(
    createRequestObject,
    attachTokenData,
    parseNumbers,
    attachTierNftsIds,
    sendCreateAuctionRequest
  )({ auction, bidtype });

  return res;
}
