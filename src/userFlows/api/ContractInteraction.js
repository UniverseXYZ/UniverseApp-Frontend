/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
import { parseDataForBatchMint } from '../../utils/helpers/pureFunctions/minting';

/**
 * @param {Object} data
 * @param {Array} data.tokens
 * @param {Array} data.royalties
 * @param data.address
 * @param data.contract
 */
const sendTransactions = async ({ address, tokens, royalties, contract }) => {
  const mintTransaction = await contract.batchMintWithDifferentFees(address, tokens, royalties);

  return mintTransaction;
};

const mintTransactions = async (req) => {
  const mintReceipt = await req.wait();

  if (!mintReceipt.status) console.error('satus code:', mintReceipt.status);

  return mintTransaction.hash;
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
 * @param helpers.setActiveTxHashes
 * @param helpers.activeTxHashes
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

  if (helpers.setActiveTxHashes)
    helpers.setActiveTxHashes([...helpers.activeTxHashes, mintTransaction.hash]);

  const mintReceipt = await mintTransaction.wait();

  if (!mintReceipt.status) console.error('satus code:', mintReceipt.status);

  return mintTransaction.hash;
}

/**
 * @param {Object} requiredContracts
 * @param {Contract} requiredContracts.collectionId
 * @param {Object} tokenURIsAndRoyaltiesObject
 * @param {Object[]} tokenURIsAndRoyaltiesObject.collectionId
 * @param {Array} tokenURIsAndRoyaltiesObject.collectionId.royalties
 * @param {String} tokenURIsAndRoyaltiesObject.collectionId.token
 * @param {Object} helpers
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
  const txPromises = [];
  const mintPromises = [];

  const txHashesArray = [];

  collectionsIdsArray.forEach((collectionId) => {
    const { tokensChunks, royaltiesChunks } = parseDataForBatchMint(
      tokenURIsAndRoyaltiesObject[collectionId]
    );

    tokensChunks.map((tokenChunk, i) =>
      txPromises.push(
        sendTransactions({
          address: helpers.address,
          tokens: tokenChunk,
          royalties: royaltiesChunks[i],
          contract: requiredContracts[collectionId],
          txHashesArray,
        })
      )
    );
  });

  const contractPromises = await Promise.all(txPromises);
  const txHashes = contractPromises.map((res) => res.hash);
  helpers.setActiveTxHashes(txHashes);
  return txHashes;

  // const txResponse = await Promise.all(txPromises);

  // txResponse.forEach((res) => {
  //   txHashesArray.push(res.hash);
  //   mintPromises.push(res);
  // });

  // await Promise.all(mintPromises);
}
