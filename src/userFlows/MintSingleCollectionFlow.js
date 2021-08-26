/* eslint-disable no-debugger */
/* eslint-disable import/named */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import { asyncPipe } from '../utils/helpers/pureFunctions/pipe';
import {
  sendSaveCollectionRequest,
  updateCollectionTxHash,
} from './api/BEInteraction';
import { deployCollection } from './api/ContractInteraction';

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
export async function MintSingleCollectionFlow({ collection, helpers }) {
  const res = await asyncPipe(
    sendSaveCollectionRequest,
    deployCollection,
    updateCollectionTxHash
  )({ collection, helpers });

  return res;
}
