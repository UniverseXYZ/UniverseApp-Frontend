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
} from '../pureFunctions/batchMinting';

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

    async sendMintRequest() {
      if (!this.requiredContracts || !this.tokenURIsAndRoyaltiesObject) {
        console.log(
          'You need to call generateRequiredContracts and generateTokenURIsAndRoyaltiesObject/ForSavedNfts before using this method'
        );
      }
      const contract = Object.values(this.requiredContracts)[0];
      const data = Object.values(this.tokenURIsAndRoyaltiesObject)[0][0];

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
  };
}

export function SavedNFTsMintingFlowFactory(nfts, context) {
  const methods = MintingFlowFactory();

  return {
    nfts,
    context,
    requiredContracts: null,
    tokenURIsAndRoyaltiesObject: null,
    generateRequiredContracts: methods.generateRequiredContracts,
    generateTokenURIsAndRoyaltiesObjectForSavedNfts:
      methods.generateTokenURIsAndRoyaltiesObjectForSavedNfts,
    sendBatchMintRequest: methods.sendBatchMintRequest,
    sendMintRequest: methods.sendMintRequest,
  };
}

export function SingleNftMintingFlowFactory(context) {
  const methods = MintingFlowFactory();

  return {
    nfts: null,
    context,
    requiredContracts: null,
    tokenURIsAndRoyaltiesObject: null,
    generateNftData: methods.generateNftData,
    generateRequiredContracts: methods.generateRequiredContracts,
    generateTokenURIsAndRoyaltiesObject: methods.generateTokenURIsAndRoyaltiesObject,
    sendMintRequest: methods.sendMintRequest,
    sendBatchMintRequest: methods.sendBatchMintRequest,
  };
}
