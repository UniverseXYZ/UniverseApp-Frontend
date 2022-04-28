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

  try {
    // Here we have only one transaction --> we don't need to track minted count
    // The transaction is either rejected/failed or successful
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

    if (!mintReceipt.status) console.error('status code:', mintReceipt.status);

    return [
      {
        transaction: mintTransaction,
        tokens: mintingData.token,
        mintingIds: [mintingData.mintingId],
        status: mintReceipt.status,
      },
    ];
  } catch (err) {
    // This means user rejected the transaction
    if (err?.code === 4001) {
      // This status is used below to show error
      return [
        {
          status: 2,
        },
      ];
    }
    // This status means the tx failed
    return [{ status: 0 }];
  }
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

  collectionsIdsArray.forEach((collectionId) => {
    const { tokensChunks, royaltiesChunks, mintingIdChunks } = parseDataForBatchMint(
      tokenURIsAndRoyaltiesObject[collectionId]
    );
    const mints = tokensChunks.map(async (tokenChunk, i) => {
      try {
        const mintingIdChunk = mintingIdChunks[i];
        const txn = await sendTransactions({
          address: helpers.address,
          tokens: tokenChunk,
          royalties: royaltiesChunks[i],
          contract: requiredContracts[collectionId],
        });

        helpers.setActiveTxHashes([...helpers.activeTxHashes, txn.hash]);

        const mintReceipt = await txn.wait();

        return {
          transaction: txn,
          tokens: tokenChunk,
          mintingIds: mintingIdChunk,
          status: mintReceipt.status,
        };
      } catch (err) {
        // This means user rejected the transaction
        if (err?.code === 4001) {
          // This status is used below to show error
          return {
            status: 2,
          };
        }
        // This status means the tx failed
        return { status: 0 };
      }
    });
    txPromises.push(...mints);
  });

  const contractData = await Promise.all(txPromises);
  return contractData;
}
