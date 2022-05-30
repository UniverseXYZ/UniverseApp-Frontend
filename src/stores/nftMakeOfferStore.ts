import create from "zustand"
import {
  INFT,
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from "@app/modules/nft/types";

type IMakeOfferOrder = IOrder<
  IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20
  >;

type INFTMakeOfferStore = {
  isOpen: boolean,
  NFT?: INFT,
  order?: IMakeOfferOrder,

  makeOffer: (NFT: INFT, order: IMakeOfferOrder) => void;
  close: () => void;
}

export const useNFTMakeOfferStore = create<INFTMakeOfferStore>((set, get) => ({
  isOpen: false,
  NFT: undefined,
  order: undefined,

  makeOffer: (NFT, order) => {
    set(state => ({
      ...state,
      isOpen: true,
      NFT,
      order,
    }))
  },
  close: () => {
    set(state => ({
      ...state,
      isOpen: false,
      NFT: undefined,
      order: undefined,
    }))
  },
}))
