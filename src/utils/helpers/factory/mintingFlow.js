/* eslint-disable no-unused-expressions */
/* eslint-disable max-classes-per-file */
import Minting from './mintingMethods';

export class SingleNftMintingFlow extends Minting {
  constructor(context, nftData) {
    super(context);
    this.nfts = null;

    return (async () => {
      super.generateNftData(nftData);
      super.generateRequiredContracts();
      this.tokensCount = await super.generateTokenURIsAndRoyaltiesObject();
      this.isSingle = this.tokensCount === 1;

      this.isSingle ? await super.sendMintRequest() : await super.sendBatchMintRequest();
      return this;
    })();
  }
}

export class SavedNFTsMintingFlow extends Minting {
  constructor(nfts, context, isSingle) {
    super(context);
    this.nfts = nfts;

    return (async () => {
      this.generateRequiredContracts();
      await this.generateTokenURIsAndRoyaltiesObjectForSavedNfts();

      isSingle ? await super.sendMintRequest() : await super.sendBatchMintRequest();
      return this;
    })();
  }
}

export class CollectionMintingFlow extends Minting {
  constructor(collection, nfts, context, isSingle) {
    super(context);
    this.collection = collection;
    this.nfts = nfts;

    return (async () => {
      await this.mintCollection();
      await this.generateSingleContract();
      await this.generateTokenURIsAndRoyaltiesObjectCollectibles();

      isSingle ? await super.sendMintRequest() : await super.sendBatchMintRequest();
      return this;
    })();
  }
}
