import create from "zustand"
import {
  INFT,
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from '../app/modules/nft/types';
import { ICollection } from "../app/modules/collection/types"

type ICheckoutOrder = IOrder<
  IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20
  >;

type INftCheckoutStore = {
  NFT?: INFT,
  collection?: ICollection,
  NFTs?: INFT[],
  order?: ICheckoutOrder,
  isOpen: boolean,

  checkoutNFT: (NFT: INFT, collection: ICollection, order: ICheckoutOrder) => void;
  closeCheckout: () => void;
}

export const useNftCheckoutStore = create<INftCheckoutStore>((set, get) => ({
  isOpen: false,
  NFT: undefined,
  NFTs: undefined,
  collection: undefined,
  order: undefined,

  checkoutNFT: (NFT, collection, order) => {
    set(state => ({
      ...state,
      isOpen: true,
      NFT,
      collection,
      order,
    }))
  },
  closeCheckout: () => {
    set(state => ({
      ...state,
      isOpen: false,
      NFT: undefined,
      NFTs: undefined,
      collection: undefined,
      order: undefined,
    }))
  },
}))
