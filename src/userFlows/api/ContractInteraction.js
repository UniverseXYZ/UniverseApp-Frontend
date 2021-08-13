/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
import { getBatchMintingData, resolveAllPromises } from '../../utils/helpers/pureFunctions/minting';

const mintChunkToContract = async ({ address, tokens, royalties, contract }) => {
  const mintTransaction = await contract.batchMintWithDifferentFees(address, tokens, royalties);

  const mintReceipt = await mintTransaction.wait();

  if (!mintReceipt.status) console.error('satus code:', mintReceipt.status);
};

export async function sendMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers) {
  const dataIsNotComplete = !requiredContracts || !tokenURIsAndRoyaltiesObject;
  if (dataIsNotComplete) {
    console.error('cannot mint with incomplete data');
    return;
  }

  const contract = Object.values(requiredContracts)[0];
  const data = Object.values(tokenURIsAndRoyaltiesObject)[0][0];

  const mintTransaction = await contract.mint(helpers.address, data.token, data.royalties);

  const mintReceipt = await mintTransaction.wait();

  if (!mintReceipt.status) console.error('satus code:', mintReceipt.status);
}

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

export const deployCollection = async ({ collection, helpers }) => {
  if (collection.id) {
    const unsignedMintCollectionTx =
      await helpers.universeERC721FactoryContract.deployUniverseERC721(
        collection.name,
        collection.tokenName
      );

    const res = await unsignedMintCollectionTx.wait();

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
