import { FC, createContext, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { INFT } from '../../types';
import { getNftData } from '../../../../../utils/api/mintNFT';
import { GetNFTApi } from '../../api';

export interface INFTPageContext {
  NFT: INFT;
  isLoading: boolean;
  isPolymorph: boolean;
}

export const NFTPageContext = createContext<INFTPageContext>({} as INFTPageContext);

export function useNFTPageData(): INFTPageContext {
  return useContext(NFTPageContext);
}

const NFTPageProvider: FC = ({ children }) => {
  const { collectionAddress, tokenId } = useParams() as any;
  // TODO: change cache key getNftData --> nft / id
  const { isLoading, data, error } = useQuery(
    ['getNftData', collectionAddress, tokenId],
    () => GetNFTApi(collectionAddress, tokenId)
  );

  const value: INFTPageContext = {
    NFT: data as INFT,
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
