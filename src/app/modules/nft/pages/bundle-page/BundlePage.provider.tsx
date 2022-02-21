import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

import { INFT, IOrder, IUser } from '../../types';
import { GetNFTApi, GetOrderByHashApi } from '../../api';

export interface IBundlePageContext {
  isLoading: boolean;
  order: IOrder;
  NFTs: INFT[];
  creator: IUser;
  moreFromCollection?: INFT[];
}

const BundlePageContext = createContext<IBundlePageContext>({} as IBundlePageContext);

export const useBundlePage: () => IBundlePageContext = () => useContext(BundlePageContext);

export interface IBundlePageProviderProps {
  hash: string;
  children: React.ReactNode;
}

export const BundlePageProvider = ({ hash, children }: IBundlePageProviderProps) => {

  const { data: order, isLoading: isLoadingOrder } = useQuery<IOrder>(['order', hash], async () => {
    return await GetOrderByHashApi(hash);
  });

  const { data: NFTs, isLoading: isLoadingNFTs } = useQuery<INFT[]>(['order', hash, 'NFTs'], async () => {
    const NFTsPromises = [];

    switch (order?.make.assetType.assetClass) {
      case 'ERC721':
        NFTsPromises.push(GetNFTApi(order.make.assetType.contract as string, order.make.assetType.tokenId));
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

    return await Promise.all(NFTsPromises);
  }, { enabled: !!order?.id })

  const creator = NFTs ? NFTs[0].owner : {};
  const moreFromCollection = NFTs ? NFTs[0].moreFromCollection?.map((NFT) => {
    NFT.collection = NFTs[0].collection;
    return NFT;
  }) : [];

  const value: IBundlePageContext = {
    moreFromCollection,
    isLoading: isLoadingOrder || isLoadingNFTs,
    order: order || {} as IOrder,
    NFTs: NFTs || [],
    creator: creator as IUser,
  };

  return (
    <BundlePageContext.Provider value={value}>
      {children}
    </BundlePageContext.Provider>
  );
}
