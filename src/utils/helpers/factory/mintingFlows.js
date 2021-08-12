/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-classes-per-file */
import Minting from './mintingMethods';
import { removeSavedNft } from '../../api/mintNFT';

export class SingleNftMintingFlow extends Minting {
  constructor(context, nftData) {
    super(context);
    this.nfts = null;

    return (async () => {
      this.generateNftData(nftData);
      this.generateRequiredContracts();
      this.tokensCount = await this.generateTokenURIsAndRoyaltiesObject();
      this.isSingle = this.tokensCount === 1;

      this.isSingle ? await this.sendMintRequest() : await this.sendBatchMintRequest();
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

      isSingle ? await this.sendMintRequest() : await this.sendBatchMintRequest();
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

      isSingle ? await this.sendMintRequest() : await this.sendBatchMintRequest();
      return this;
    })();
  }
}

export class SaveNftForLaterFlow extends Minting {
  constructor(context, nft) {
    super(context);
    this.saveImageResult;
    this.nft = nft;

    return (async () => {
      await this.saveNftAndImage();

      return this;
    })();
  }
}

export class UpdateNftFlow extends Minting {
  constructor(context, nft) {
    super(context);
    this.saveImageResult;
    this.updateResult;
    this.nft = nft;

    return (async () => {
      await this.editNftAndImage();

      return this;
    })();
  }
}

export class RemoveNftFlow {
  constructor(id) {
    return (async () => {
      const result = removeSavedNft(id);

      return result;
    })();
  }
}
