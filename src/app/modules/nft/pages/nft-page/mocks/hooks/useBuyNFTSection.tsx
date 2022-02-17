import { useCallback, useState } from 'react';

export enum NFTBuyNFTSectionState {
  // BID_N_OFFER,
  // BUY_N_OFFER,
  // BUY,
  // BID,
  // PUT_ON_SALE,
  // LOWER_PRICE,
  // CHANGE_PRICE,

  BUYER_FIXED_LISTING_BUY,
  BUYER_FIXED_LISTING_BUY_N_OFFER,
  BUYER_AUCTION_BID,
  BUYER_AUCTION_BID_N_OFFER,
  OWNER_PUT_ON_SALE,
  OWNER_FIXED_LISTING_CHANGE_PRICE,
  OWNER_AUCTION_LOWER_PRICE,
}

export const useBuyNFTSection = () => {
  const [state, setState] = useState<NFTBuyNFTSectionState | null>(null);

  const handleNext = useCallback(() => {
    if (!state) {
      return setState(NFTBuyNFTSectionState.BUYER_FIXED_LISTING_BUY);
    }
    setState(state + 1 < (Object.keys(NFTBuyNFTSectionState).length / 2) ? state + 1 : 0);
  }, [state]);

  const handleHide = useCallback(() => {
    setState(null);
  }, [state]);

  const handleSetState = useCallback((newState: NFTBuyNFTSectionState) => {
    setState(newState);
  }, []);

  return {
    state,
    changeBuyNFTSection: handleNext,
    hideBuyNFTSection: handleHide,
    setState: handleSetState,
  };
};
