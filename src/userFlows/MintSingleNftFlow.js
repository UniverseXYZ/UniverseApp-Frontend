/* eslint-disable no-debugger */
/* eslint-disable no-unused-expressions */
import { pipe, asyncPipe } from '../utils/helpers/pureFunctions/pipe';
import {
  getCollectionsAdddresses,
  createContractInstancesFromAddresses,
  formatRoyalties,
  returnTokenURIsAndRoyalties,
  createPlaceholders,
} from '../utils/helpers/pureFunctions/minting';

import { generateTokenURIs } from './api/BEInteraction';
import { sendMintRequest, sendBatchMintRequest } from './api/ContractInteraction';

/**
 * @param {Object} data
 * @param {Object} data.helpers
 * @param data.helpers.collectionsIdAddressMapping
 * @param data.helpers.contracts
 * @param data.helpers.signer
 * @param data.helpers.universeERC721CoreContract
 * @param {Object[]} data.nfts
 * @param data.nfts[].collectionId
 * @param data.nfts[].royalties
 * @param data.nfts[].numberOfEditions
 * @param data.nfts[].file
 * @param data.nfts[].name
 * @param data.nfts[].description
 * @param data.nfts[].propertiesParsed
 * @param data.nfts[].royaltiesParsed
 */
export async function MintSingleNftFlow({ nfts, helpers }) {
  const requiredContracts = pipe(
    getCollectionsAdddresses,
    createContractInstancesFromAddresses
  )({ nfts, helpers });

  const { tokenURIsAndRoyaltiesObject, isSingle } = await asyncPipe(
    generateTokenURIs,
    formatRoyalties,
    createPlaceholders,
    returnTokenURIsAndRoyalties
  )({ nfts });

  if (!tokenURIsAndRoyaltiesObject) return false;

  isSingle
    ? await sendMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers)
    : await sendBatchMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers);

  return true;
}
