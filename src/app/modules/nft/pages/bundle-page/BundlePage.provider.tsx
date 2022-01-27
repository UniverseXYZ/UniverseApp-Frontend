import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { INFT, IOrder, IOrderBackend, IUser, NFTArtworkType } from '../../types';
import { GetNFTApi } from '../../api';
import { mapBackendOrder } from '../../helpers';

export interface IBundlePageContext {
  isLoading: boolean;
  order: IOrder;
  NFTs: INFT[];
  owner: IUser;
  moreFromCollection?: INFT[];
}

const BundlePageContext = createContext<IBundlePageContext>({} as IBundlePageContext);

export const useBundlePage: () => IBundlePageContext = () => useContext(BundlePageContext);

export interface IBundlePageProviderProps {
  hash: string;
  children: React.ReactNode;
}

export const BundlePageProvider = ({ hash, children }: IBundlePageProviderProps) => {

  const { data, isLoading } = useQuery<{ order: IOrder, NFTs: INFT[] }>(['bundle', hash], async () => {
    const orderResponse = await axios.get<IOrderBackend>(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}`);

    const order = mapBackendOrder(orderResponse.data);

    const NFTsPromises = [];

    switch (order.make.assetType.assetClass) {
      case 'ERC721':
        NFTsPromises.push(GetNFTApi(order.make.assetType.contract as string, order.make.assetType.tokenId as string));
        break;
      case 'ERC721_BUNDLE':
        for (let i = 0; i < (order.make.assetType.contracts?.length ?? 0); i++) {
          if (order.make.assetType.tokenIds?.length) {
            for (const tokenId of order.make.assetType.tokenIds[i]) {
              if (order.make.assetType.contracts?.length) {
                NFTsPromises.push(GetNFTApi(order.make.assetType.contracts[i], tokenId));
              }
            }
          }
        }
        break;
    }

    const NFTs = await Promise.all(NFTsPromises);

    return { order, NFTs };
  });

  const owner = data?.NFTs[0].owner as IUser;
  const moreFromCollection = data?.NFTs[0].moreFromCollection?.map((NFT) => {
    NFT.collection = data?.NFTs[0].collection;
    return NFT;
  });

  const value: IBundlePageContext = {
    isLoading,
    owner,
    moreFromCollection,
    order: data?.order as IOrder,
    NFTs: data?.NFTs as INFT[],
  };

  return (
    <BundlePageContext.Provider value={value}>
      {children}
    </BundlePageContext.Provider>
  );
}
