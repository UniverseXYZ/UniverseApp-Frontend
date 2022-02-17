import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getNftData } from '../../../../../utils/api/mintNFT';

export interface IBundlePageContext {
  isLoading: boolean;
  order: any;
  NFTs: any[];
  owner: {
    about: string;
    address: string;
    createdAt: string;
    displayName: string;
    id: number;
    instagramUser: string;
    logoImageUrl: string;
    profileImageUrl: string;
    twitterUser: string;
    universePageUrl: string;
  };
  moreFromCollection: any[];
}

const BundlePageContext = createContext<IBundlePageContext>({} as IBundlePageContext);

export const useBundlePage: () => IBundlePageContext = () => useContext(BundlePageContext);

export interface IBundlePageProviderProps {
  hash: string;
  children: React.ReactNode;
}

export const BundlePageProvider = ({ hash, children }: IBundlePageProviderProps) => {

  const { data, isLoading } = useQuery(['bundle', hash], async () => {
    const order = (await axios.get(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}`)).data;

    const NFTsPromises = [];

    for (const contractIdx in order.make.assetType.contracts) {
      for (const tokenId of order.make.assetType.tokenIds[contractIdx]) {
        NFTsPromises.push(getNftData(order.make.assetType.contracts[contractIdx], tokenId));
      }
    }

    const NFTs = await Promise.all(NFTsPromises);

    return { order, NFTs };
    // return (await axios.get(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}`)).data;
  });

  const owner = data?.NFTs[0].owner;
  const moreFromCollection = data?.NFTs[0].moreFromCollection;

  const value: IBundlePageContext = {
    isLoading,
    owner,
    moreFromCollection,
    order: data?.order,
    NFTs: data?.NFTs as IBundlePageContext['NFTs'],
  };

  return (
    <BundlePageContext.Provider value={value}>
      {children}
    </BundlePageContext.Provider>
  );
}
