import create from "zustand"
import { INFT, IOrder } from "../app/modules/nft/types"
import { ICollection } from "../app/modules/collection/types"

type INftCheckoutStore = {
  NFT: INFT,
  setNFT: (NFT: INFT) => void,
  collection: ICollection,
  setCollection: (collection: ICollection) => void,
  NFTs: INFT[],
  setNFTs: (nfts: INFT[]) => void,
  order: IOrder,
  setOrder: (order: IOrder) => void,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  onClose: () => void,
  setOnClose: (onClose: () => void) => void,
  closeCheckout: () => void;
}

export const useNftCheckoutStore = create<INftCheckoutStore>((set, get) => ({
  NFT: {} as INFT,
  collection: {} as ICollection,
  NFTs: [],
  order: {} as IOrder,
  isOpen: false,
  closeCheckout: () => {
    set(state => ({
      ...state,
      isOpen: false,
      NFT: {} as INFT,
      collection: {} as ICollection,
      NFTs: [],
      order: {} as IOrder,
      onClose: () => {}
    }))
  },
  onClose: () => {},
  setNFT: (NFT) => {
    set(state => ({
      ...state,
      NFT
    }))
  },
  setNFTs: (NFTs) => {
    set(state => ({
      ...state,
      NFTs
    }))
  },
  setCollection: (collection) => {
    set(state => ({
      ...state,
      collection
    }))
  },
  setOrder: (order) => {
    set(state => ({
      ...state,
      order
    }))
  },
  setIsOpen: (isOpen) => {
    set(state => ({
      ...state,
      isOpen
    }))
  },
  setOnClose: (onClose) => {
    set(state => ({
      ...state,
      onClose
    }))
  },
}))