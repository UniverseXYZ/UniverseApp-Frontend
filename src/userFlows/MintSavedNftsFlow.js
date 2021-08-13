/* eslint-disable no-debugger */
/* eslint-disable no-unused-expressions */
import { pipe, asyncPipe } from '../utils/helpers/pureFunctions/pipe';
import {
  getCollectionsAdddresses,
  createContractInstancesFromAddresses,
  extractRequiredDataForMinting,
  formatRoyalties,
  returnTokenURIsAndRoyalties,
} from '../utils/helpers/pureFunctions/minting';

import { getTokenURIsForSavedNfts } from './api/BEInteraction';
import { sendMintRequest, sendBatchMintRequest } from './api/ContractInteraction';

/**
 * @param {Object} data
 * @param {Array} data.nfts
 * @param {Object} data.helpers
 * @param data.helpers.collectionsIdAddressMapping
 * @param data.helpers.UniverseERC721Core
 * @param data.helpers.signer
 * @param data.helpers.universeERC721CoreContract
 * @param data.nfts.
 */
export async function MintSavedNftsFlow({ nfts, helpers }) {
  const requiredContracts = pipe(
    getCollectionsAdddresses,
    createContractInstancesFromAddresses
  )({ nfts, helpers });

  console.log(requiredContracts);

  const { tokenURIsAndRoyaltiesObject, isSingle } = await asyncPipe(
    extractRequiredDataForMinting,
    getTokenURIsForSavedNfts,
    formatRoyalties,
    returnTokenURIsAndRoyalties
  )({ nfts });

  isSingle
    ? await sendMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers)
    : await sendBatchMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers);
}
