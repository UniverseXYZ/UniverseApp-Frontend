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

function MintingFlowFactory() {
  return {
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
    },

    generateRequiredContracts() {
      const { data: res } = pipe(
        getCollectionsAdddresses,
        createContractInstancesFromAddresses
      )({
        data: this.nfts,
        context: this.context,
      });

      this.requiredContracts = res;
    },

    async generateSingleContract() {
      const result = await asyncPipe(
        getSingleCollectionAddress,
        createSingleContract
      )({
        collection: this.collection,
        context: this.context,
      });

      console.log(result);

      this.requiredContracts = result.contract;
      this.collection = result.collection;
    },

    async generateTokenURIsAndRoyaltiesObjectForSavedNfts() {
      const res = await asyncPipe(
        extractRequiredDataForMinting,
        generateTokenURIsForSavedNfts,
        formatRoyalties,
        returnTokenURIsAndRoyalties
      )(this.nfts);

      this.tokenURIsAndRoyaltiesObject = res;
    },

    async generateTokenURIsAndRoyaltiesObject() {
      const res = await asyncPipe(
        generateTokenURIs,
        formatRoyalties,
        returnTokenURIsAndRoyalties
      )(this.nfts);

      this.tokenURIsAndRoyaltiesObject = res;

      return Object.values(res)[0].length;
    },

    async generateTokenURIsAndRoyaltiesObjectCollectibles() {
      const res = await asyncPipe(
        attachCollectionIdToNfts,
        generateTokenURIs,
        formatRoyalties,
        returnTokenURIsAndRoyalties
      )({ nfts: this.nfts, collection: this.collection });

      this.tokenURIsAndRoyaltiesObject = res;

      return Object.values(res)[0].length;
    },

    async sendMintRequest() {
      if (!this.requiredContracts || !this.tokenURIsAndRoyaltiesObject) {
        console.log(
          'You need to call generateRequiredContracts and generateTokenURIsAndRoyaltiesObject/ForSavedNfts before using this method'
        );
      }

      console.log(this.tokenURIsAndRoyaltiesObject);
      const contract = Object.values(this.requiredContracts)[0];
      const data = Object.values(this.tokenURIsAndRoyaltiesObject)[0][0];
      console.log(data);
      console.log(contract);

      console.log('MINTING.....');
      const mintTransaction = await contract.mint(this.context.address, data.token, data.royalties);

      const mintReceipt = await mintTransaction.wait();

      console.log('printing receipt...', mintReceipt);
    },

    async sendBatchMintRequest() {
      if (!this.requiredContracts || !this.tokenURIsAndRoyaltiesObject) {
        console.log(
          'You need to call generateRequiredContracts and generateTokenURIsAndRoyaltiesObject/ForSavedNfts before using this method'
        );
      }

      const collectionsIdsArray = Object.keys(this.requiredContracts);

      console.log(
        `calling ${collectionsIdsArray.length} contract${collectionsIdsArray.length > 1 ? 's' : ''}`
      );

      for (let index = 0; index < collectionsIdsArray.length; index += 1) {
        const collectionId = collectionsIdsArray[index];

        const { tokensChunks, royaltiesChunks, chunksCount } = getBatchMintingData(
          this.tokenURIsAndRoyaltiesObject[collectionId]
        );

        for (let chunk = 0; chunk < chunksCount; chunk += 1) {
          console.log(
            `minting chunk ${chunk + 1} / ${royaltiesChunks.length} to contract number ${
              index + 1
            }: ${this.requiredContracts[collectionId].address}`
          );

          await mintChunkToContract({
            address: this.context.address,
            tokens: tokensChunks[chunk],
            royalties: royaltiesChunks[chunk],
            contract: this.requiredContracts[collectionId],
          });
        }
      }
    },

    async mintCollection() {
      const result = await asyncPipe(
        sendSaveCollectionRequest,
        deployCollection,
        updateCollectionTxHash
      )({ collection: this.collection, context: this.context });

      this.collection = result;
    },
  };
}

export function SavedNFTsMintingFlowFactory(nfts, context) {
  const {
    generateRequiredContracts,
    generateTokenURIsAndRoyaltiesObjectForSavedNfts,
    sendBatchMintRequest,
    sendMintRequest,
  } = MintingFlowFactory();

  return {
    nfts,
    context,
    requiredContracts: null,
    tokenURIsAndRoyaltiesObject: null,
    generateRequiredContracts,
    generateTokenURIsAndRoyaltiesObjectForSavedNfts,
    sendBatchMintRequest,
    sendMintRequest,
  };
}

export function SingleNftMintingFlowFactory(context) {
  const {
    generateNftData,
    generateRequiredContracts,
    generateTokenURIsAndRoyaltiesObject,
    sendMintRequest,
    sendBatchMintRequest,
  } = MintingFlowFactory();

  return {
    nfts: null,
    context,
    requiredContracts: null,
    tokenURIsAndRoyaltiesObject: null,
    generateNftData,
    generateRequiredContracts,
    generateTokenURIsAndRoyaltiesObject,
    sendMintRequest,
    sendBatchMintRequest,
  };
}

export function CollectionMintingFlow(collection, nfts, context) {
  const {
    mintCollection,
    generateSingleContract,
    generateTokenURIsAndRoyaltiesObjectCollectibles,
    sendMintRequest,
  } = MintingFlowFactory();

  return {
    collection,
    nfts,
    context,
    requiredContracts: null,
    tokenURIsAndRoyaltiesObject: null,
    mintCollection,
    generateSingleContract,
    generateTokenURIsAndRoyaltiesObjectCollectibles,
    sendMintRequest,
  };
}
