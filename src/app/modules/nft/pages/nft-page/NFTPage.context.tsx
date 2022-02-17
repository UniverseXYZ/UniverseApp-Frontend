import { createContext, useContext } from 'react';

import { INft } from '../../types';

export interface INFTPageContext {
  NFT: INft;
  isPolymorph: boolean;
}

export const NFTPageContext = createContext<INFTPageContext>({} as INFTPageContext);

export const useNFTPageData: () => INFTPageContext = () => useContext(NFTPageContext);
