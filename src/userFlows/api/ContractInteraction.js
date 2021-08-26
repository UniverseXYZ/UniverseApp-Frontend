/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
import { getBatchMintingData, resolveAllPromises } from '../../utils/helpers/pureFunctions/minting';

/**
 * @param {Object} data
 * @param {Array} data.tokens
 * @param {Array} data.royalties
 * @param data.address
 * @param data.contract
 */
const mintChunkToContract = async ({ address, tokens, royalties, contract }) => {
  const mintTransaction = await contract.batchMintWithDifferentFees(address, tokens, royalties);

  const mintReceipt = await mintTransaction.wait();

  if (!mintReceipt.status) console.error('satus code:', mintReceipt.status);
};

/**
 * @param {Object} requiredContracts
 * @param {Contract} requiredContracts.collectionId
 * @param {Object} tokenURIsAndRoyaltiesObject
 * @param {Object[]} tokenURIsAndRoyaltiesObject.collectionId
 * @param {Array} tokenURIsAndRoyaltiesObject.collectionId.royalties
 * @param {String} tokenURIsAndRoyaltiesObject.collectionId.token
 * @param {Object} helpers
 * @param helpers.address
 */
export async function sendMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers) {
  const dataIsNotComplete = !requiredContracts || !tokenURIsAndRoyaltiesObject;
  if (dataIsNotComplete) {
    console.error('cannot mint with incomplete data');
    return;
  }

  const coreContractId = 0;
  const firstChunk = 0;
  const contract = Object.values(requiredContracts)[coreContractId];
  const mintingData = Object.values(tokenURIsAndRoyaltiesObject)[coreContractId][firstChunk];

  const mintTransaction = await contract.mint(
    helpers.address,
    mintingData.token,
    mintingData.royalties
  );

  const mintReceipt = await mintTransaction.wait();

  if (!mintReceipt.status) console.error('satus code:', mintReceipt.status);
}

/**
 * @param {Object} requiredContracts
 * @param {Contract} requiredContracts.collectionId
 * @param {Object} tokenURIsAndRoyaltiesObject
 * @param {Object[]} tokenURIsAndRoyaltiesObject.collectionId
 * @param {Array} tokenURIsAndRoyaltiesObject.collectionId.royalties
 * @param {String} tokenURIsAndRoyaltiesObject.collectionId.token
 * @param {Object} helpers
 * @param helpers.address
 */
export async function sendBatchMintRequest(
  requiredContracts,
  tokenURIsAndRoyaltiesObject,
  helpers
) {
  const dataIsNotComplete = !requiredContracts || !tokenURIsAndRoyaltiesObject;
  if (dataIsNotComplete) {
    console.error('cannot mint with incomplete data');
    return;
  }

  const collectionsIdsArray = Object.keys(requiredContracts);
  const promises = [];

  collectionsIdsArray.forEach((collectionId) => {
    const { tokensChunks, royaltiesChunks } = getBatchMintingData(
      tokenURIsAndRoyaltiesObject[collectionId]
    );

    tokensChunks.map((tokenChunk, i) =>
      promises.push(
        mintChunkToContract({
          address: helpers.address,
          tokens: tokenChunk,
          royalties: royaltiesChunks[i],
          contract: requiredContracts[collectionId],
        })
      )
    );
  });

  await resolveAllPromises(promises);
}

/**
 * @param {Object} data
 * @param {Object} data.helpers
 * @param data.helpers.universeERC721FactoryContract
 * @param {Object} data.collection
 * @param data.collection.name
 * @param data.collection.symbol
 * @returns {Object} nfts: { collection: { ...collection, transactionHash, from }, helpers }
 */
export const deployCollection = async ({ collection, helpers }) => {
  if (collection.id) {
    const tx = await helpers.universeERC721FactoryContract.deployUniverseERC721(
      collection.name,
      collection.symbol
    );

    const res = await tx.wait();

    if (!res.status) {
      console.error('satus code:', res.status);
      return;
    }

    collection.transactionHash = res.transactionHash;
    collection.from = res.from;
  } else {
    console.error('There was an error');
  }

  return {
    collection,
    helpers,
  };
};
