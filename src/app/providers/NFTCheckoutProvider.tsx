import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ICollection } from '../modules/collection/types';
import { INFT, IOrder, IOrderAssetTypeERC20, IOrderAssetTypeSingleListing } from '../modules/nft/types';

interface INFTCheckoutValue {
  NFT?: INFT,
  setNFT: (nft: INFT) => void,
  collection?: ICollection,
  setCollection: (collection: ICollection) => void,
  NFTs: INFT[],
  setNFTs: (NFTs: INFT[]) => void,
  order?: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>,
  setOrder: (order: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>) => void,
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  onClose: () => void,
  setOnClose: React.Dispatch<React.SetStateAction<() => void>>,
  closeCheckout: () => void;
}

const NFTCheckoutPopupContext = createContext({} as INFTCheckoutValue);

interface INFTCheckoutProviderProps {
  children: React.ReactNode;
}


const NFTCheckoutContextProvider = (props: INFTCheckoutProviderProps) => {
  const [NFT, setNFT] = useState<INFT>();
  const [collection, setCollection] = useState<ICollection>();
  const [NFTs, setNFTs] = useState<INFT[]>([]);
  const [order, setOrder] = useState<IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>>();
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState<() => void>(() => {})

  const closeCheckout = () => {
    setIsOpen(false);
    setNFT(undefined);
    setNFTs([]);
    setCollection(undefined);
    setOrder(undefined);
  };

  const value: INFTCheckoutValue = {
    NFT,
    setNFT,
    collection,
    setCollection,
    NFTs,
    setNFTs,
    order,
    setOrder,
    isOpen,
    setIsOpen,
    onClose,
    setOnClose,
    closeCheckout
  };

  return (
    <NFTCheckoutPopupContext.Provider value={value} {...props} />
  );
};

NFTCheckoutContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useNftCheckoutPopupContext = () => {
  const context = useContext(NFTCheckoutPopupContext);

  if (!context) {
    throw new Error('useNFTCheckoutPopup was used outside of its Provider');
  }

  return context;
};

export { NFTCheckoutContextProvider, useNftCheckoutPopupContext };
