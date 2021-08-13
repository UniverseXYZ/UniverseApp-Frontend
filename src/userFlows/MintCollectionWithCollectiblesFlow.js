/* eslint-disable no-unused-expressions */
import { asyncPipe } from '../utils/helpers/pureFunctions/pipe';
import {
  attachCollectionIdToNfts,
  formatRoyalties,
  returnTokenURIsAndRoyalties,
  createSingleContract,
} from '../utils/helpers/pureFunctions/minting';
import {
  generateTokenURIs,
  sendSaveCollectionRequest,
  updateCollectionTxHash,
  getSingleCollectionAddress,
} from './api/BEInteraction';
import { sendMintRequest, sendBatchMintRequest, deployCollection } from './api/ContractInteraction';

export async function MintCollectionWithCollectiblesFlow({ collectionInput, nfts, helpersInput }) {
  const helpers = helpersInput;
  let collection = collectionInput;
  let requiredContract = null;

  collection = await asyncPipe(
    sendSaveCollectionRequest,
    deployCollection,
    updateCollectionTxHash
  )({ collection, helpers });

  const contractCreationResponse = await asyncPipe(
    getSingleCollectionAddress,
    createSingleContract
  )({ collection, helpers });

  collection = contractCreationResponse.collection;
  requiredContract = contractCreationResponse.contract;

  const { tokenURIsAndRoyaltiesObject, isSingle } = await asyncPipe(
    attachCollectionIdToNfts,
    generateTokenURIs,
    formatRoyalties,
    returnTokenURIsAndRoyalties
  )({ nfts, collection });

  isSingle
    ? await sendMintRequest(requiredContract, tokenURIsAndRoyaltiesObject)
    : await sendBatchMintRequest(requiredContract, tokenURIsAndRoyaltiesObject);
}
