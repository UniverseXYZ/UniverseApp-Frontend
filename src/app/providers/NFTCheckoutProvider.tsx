import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { INFT, IOrder } from '../modules/nft/types';

interface INFTCheckoutValue {
  NFT: INFT,
  setNFT: (nft: INFT) => void,
  NFTs: INFT[],
  setNFTs: (nfts: INFT[]) => void,
  order: IOrder,
  setOrder: (order: IOrder) => void,
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
  const [NFT, setNFT] = useState<INFT>({} as INFT);
  const [NFTs, setNFTs] = useState<INFT[]>([]);
  const [order, setOrder] = useState<IOrder>({} as IOrder);
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState<() => void>(() => {})

  const closeCheckout = () => {
    setIsOpen(false);
    setNFT({} as INFT);
    setNFTs([] as INFT[]);
    setOrder({} as IOrder);
  };

  const value: INFTCheckoutValue = {
    NFT,
    setNFT,
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
