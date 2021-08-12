/* eslint-disable no-await-in-loop */
import { asyncPipe, pipe } from '../pureFunctions/pipe';
import {
  getCollectionsAdddresses,
  createContractInstancesFromAddresses,
  extractRequiredDataForMinting,
  generateTokenURIsForSavedNfts,
  generateTokenURIs,
  returnTokenURIsAndRoyalties,
  formatRoyalties,
  getBatchMintingData,
  mintChunkToContract,
  sendSaveCollectionRequest,
  deployCollection,
  updateCollectionTxHash,
  getSingleCollectionAddress,
  createSingleContract,
  attachCollectionIdToNfts,
} from '../pureFunctions/minting';

export default class Minting {
  constructor(context) {
    this.requiredContracts = null;
    this.tokenURIsAndRoyaltiesObject = null;
    this.context = context;
  }

  generateNftData(data) {
    const formated = [
      {
        collectionId: data.collectionId,
        royalties: data.royalties,
        numberOfEditions: data.editions,
        file: data.file,
        name: data.name,
        description: data.description,
        propertiesParsed: data.propertiesParsed,
        royaltiesParsed: data.royaltiesParsed,
      },
    ];

    this.nfts = formated;
  }

  generateRequiredContracts() {
    const { data: res } = pipe(
      getCollectionsAdddresses,
      createContractInstancesFromAddresses
    )({
      data: this.nfts,
      context: this.context,
    });

    this.requiredContracts = res;
  }

  async generateSingleContract() {
    const result = await asyncPipe(
      getSingleCollectionAddress,
      createSingleContract
    )({
      collection: this.collection,
      context: this.context,
    });

    this.requiredContracts = result.contract;
    this.collection = result.collection;
  }

  async generateTokenURIsAndRoyaltiesObjectForSavedNfts() {
    const res = await asyncPipe(
      extractRequiredDataForMinting,
      generateTokenURIsForSavedNfts,
      formatRoyalties,
      returnTokenURIsAndRoyalties
    )(this.nfts);

    this.tokenURIsAndRoyaltiesObject = res;
  }

  async generateTokenURIsAndRoyaltiesObject() {
    const res = await asyncPipe(
      generateTokenURIs,
      formatRoyalties,
      returnTokenURIsAndRoyalties
    )(this.nfts);

    this.tokenURIsAndRoyaltiesObject = res;

    return Object.values(res)[0].length;
  }

  async generateTokenURIsAndRoyaltiesObjectCollectibles() {
    const res = await asyncPipe(
      attachCollectionIdToNfts,
      generateTokenURIs,
      formatRoyalties,
      returnTokenURIsAndRoyalties
    )({ nfts: this.nfts, collection: this.collection });

    this.tokenURIsAndRoyaltiesObject = res;

    return Object.values(res)[0].length;
  }

  async sendMintRequest() {
    const dataIsNotComplete = !this.requiredContracts || !this.tokenURIsAndRoyaltiesObject;
    if (dataIsNotComplete) {
      console.error('cannot mint with incomplete data');
      return;
    }

    const contract = Object.values(this.requiredContracts)[0];
    const data = Object.values(this.tokenURIsAndRoyaltiesObject)[0][0];

    const mintTransaction = await contract.mint(this.context.address, data.token, data.royalties);

    const mintReceipt = await mintTransaction.wait();

    if (!mintReceipt.status) console.error('satus code:', mintReceipt.status);
  }

  async sendBatchMintRequest() {
    const dataIsNotComplete = !this.requiredContracts || !this.tokenURIsAndRoyaltiesObject;
    if (dataIsNotComplete) {
      console.error('cannot mint with incomplete data');
      return;
    }

    const collectionsIdsArray = Object.keys(this.requiredContracts);
    const promises = [];

    collectionsIdsArray.forEach((collectionId) => {
      const { tokensChunks, royaltiesChunks } = getBatchMintingData(
        this.tokenURIsAndRoyaltiesObject[collectionId]
      );

      tokensChunks.map((tokenChunk, i) =>
        promises.push(
          mintChunkToContract({
            address: this.context.address,
            tokens: tokenChunk,
            royalties: royaltiesChunks[i],
            contract: this.requiredContracts[collectionId],
          })
        )
      );
    });

    Promise.all(promises);
  }

  async mintCollection() {
    const result = await asyncPipe(
      sendSaveCollectionRequest,
      deployCollection,
      updateCollectionTxHash
    )({ collection: this.collection, context: this.context });

    this.collection = result;
  }
}
