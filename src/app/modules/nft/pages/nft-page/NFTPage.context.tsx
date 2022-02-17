import { FC, createContext, useContext } from 'react';

import { INft } from '../../types';
import {useQuery} from "react-query";
import {getNftData} from "../../../../../utils/api/mintNFT";
import {useParams} from "react-router-dom";

export interface INFTPageContext {
  NFT: INft;
  isLoading: boolean;
  isPolymorph: boolean;
}

export const NFTPageContext = createContext<INFTPageContext>({} as INFTPageContext);

export function useNFTPageData(): INFTPageContext {
  return useContext(NFTPageContext);
}

const NFTPageProvider: FC = ({ children }) => {
  // @ts-ignore
  const { collectionAddress, tokenId } = useParams();
  // @ts-ignore
  const { isLoading, data, error } = useQuery('getNftData', () => getNftData(collectionAddress, tokenId))

  const value: INFTPageContext = {
    NFT: data,
    isLoading,
    isPolymorph: false
  };

  return (
    <NFTPageContext.Provider value={value}>
      {children}
    </NFTPageContext.Provider>
  );
};

export default NFTPageProvider;
