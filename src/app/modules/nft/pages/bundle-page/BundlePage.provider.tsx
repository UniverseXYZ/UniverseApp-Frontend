import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

import {
  INFT,
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
} from '../../types';
import { IUser } from '../../../account/types';
import { GetNFTApi, GetOrderByHashApi } from '../../../../api';

export interface IBundlePageContext {
  isLoading: boolean;
  order?: IOrder<IOrderAssetTypeBundleListing, IOrderAssetTypeERC20>;
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

export const BundlePageProvider: React.FC<IBundlePageProviderProps> = (props) => {
  const { hash, children } = props;

  const { data: order, isLoading: isLoadingOrder } = useQuery(
    ['order', hash],
    () => GetOrderByHashApi<IOrderAssetTypeBundleListing, IOrderAssetTypeERC20>(hash)
  );

  const { data: NFTs, isLoading: isLoadingNFTs } = useQuery<INFT[]>(
    ['order', hash, 'NFTs'],
    async () => {
      const NFTsPromises = [];

      if (!order) {
        return [];
      }

      for (let i = 0; i < (order.make.assetType.contracts?.length ?? 0); i++) {
        if (order.make.assetType.tokenIds?.length) {
          for (const tokenId of order.make.assetType.tokenIds[i]) {
            if (order.make.assetType.contracts?.length) {
              NFTsPromises.push(GetNFTApi(order.make.assetType.contracts[i], tokenId));
            }
          }
        }
      }

      return await Promise.all(NFTsPromises);
    },
    {
      enabled: !!order?.id
    }
  );

  const creator = NFTs && NFTs.length ? NFTs[0].owner : {};
  const moreFromCollection = NFTs && NFTs.length ? NFTs[0].moreFromCollection?.map((NFT) => {
    NFT.collection = NFTs[0].collection;
    return NFT;
  }) : [];

  const value: IBundlePageContext = {
    order,
    moreFromCollection,
    NFTs: NFTs || [],
    creator: creator as IUser,
    isLoading: isLoadingOrder || isLoadingNFTs,
  };

  return (
    <BundlePageContext.Provider value={value}>
      {children}
    </BundlePageContext.Provider>
  );
}
