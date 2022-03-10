import { FC, createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { ICollection, IERC721AssetType, INFT, IOrder, IUser } from '../../types';
import { GetCollectionApi, GetNFT2Api, GetHistoryApi, GetOrdersApi, GetUserApi, INFTHistory, GetMoreFromCollectionApi } from '../../api';
import { OrderAssetClass } from '../../enums';

export interface INFTPageContext {
  NFT: INFT;
  isLoading: boolean;
  isPolymorph: boolean;
  buyOrder?: IOrder;
  sellOrder?: IOrder;
  creator: IUser;
  owner: IUser;
  collection: ICollection;
  collectionAddress: string;
  refetchOffers: () => void;
  history: INFTHistory | undefined;
  offers: { orders: IOrder[]; total: number; } | undefined;
  moreFromCollection: INFT[] | undefined;
}

export const NFTPageContext = createContext<INFTPageContext>({} as INFTPageContext);

export function useNFTPageData(): INFTPageContext {
  return useContext(NFTPageContext);
}

const NFTPageProvider: FC = ({ children }) => {
  const { collectionAddress, tokenId } = useParams<{ collectionAddress: string; tokenId: string; }>();

  const { data: NFT, isLoading: isLoadingNFT } = useQuery(
    ['NFT', collectionAddress, tokenId],
    () => GetNFT2Api(collectionAddress, tokenId),
    {
      enabled: !!collectionAddress && !!tokenId,
      onSuccess: (NFT) => console.log('NFT', NFT) 
    },
  );

  const { data: moreFromCollection, isLoading: isMoreFromCollectionLoading } = useQuery(
    ['moreFromCollection', collectionAddress, tokenId],
    () => GetMoreFromCollectionApi(collectionAddress, tokenId),
    {
      enabled: !!collectionAddress && !!tokenId,
      staleTime: Infinity,
      onSuccess: (NFTs) => console.log('NFTs', NFTs) 
    },
  );

  const { data: history, refetch: refetchHistory } = useQuery(
    ['history', collectionAddress, tokenId],
    () => GetHistoryApi(collectionAddress, tokenId),
    { onSuccess: (history) => console.log('history', history) },
  );

  const { data: offers, refetch: refetchNFTOffers } = useQuery(
    ['offers', collectionAddress, tokenId],
    () => GetOrdersApi({
      side: 0, 
      tokenId: tokenId as unknown as number, 
      collection: collectionAddress 
    }),
    { onSuccess: (offers) => console.log('offers', offers) },
  );

  const { data: creator } = useQuery(
    ['user', NFT?._creatorAddress],
    () => GetUserApi(`${NFT?._creatorAddress}`),
    { enabled: !!NFT?.id, retry: false, },
  );

  const { data: owner } = useQuery(
    ['user', NFT?._ownerAddress],
    () => GetUserApi(`${NFT?._ownerAddress}`),
    { enabled: !!NFT?.id, retry: false, },
  );

  const { data: collection } = useQuery(
    ['collection', NFT?._collectionAddress],
    () => GetCollectionApi(`${NFT?._collectionAddress}`),
    { enabled: !!NFT?.id, retry: false, onSuccess: (collection) => console.log('collection', collection) },
  );

  const { data: buyOrder, isLoading: isLoadingBuyOrder } = useQuery<IOrder | undefined>(['NFT', collectionAddress, tokenId, 'buyOrder'], async () => {
    const { orders } = await GetOrdersApi({
      assetClass: OrderAssetClass.ERC721,
      collection: collectionAddress,
      tokenId: +tokenId,
      side: 0,
    });

    return orders.find((order) => {
      return !order.cancelledTxHash;
    });
  }, { enabled: !!NFT?.id });

  const { data: sellOrder, isLoading: isLoadingSellOrder } = useQuery<IOrder | undefined>(['NFT', collectionAddress, tokenId, 'sellOrder'], async () => {
    const { orders } = await GetOrdersApi({
      assetClass: OrderAssetClass.ERC721,
      collection: collectionAddress,
      tokenId: +tokenId,
      side: 1,
    });

    return orders.find((order) => {
      return !order.cancelledTxHash;
    });
  }, { enabled: !!NFT?.id });

  const refetchOffers = useCallback(() => {
    refetchHistory();
    refetchNFTOffers();
  }, []);

  const value: INFTPageContext = {
    buyOrder,
    sellOrder,
    collectionAddress,
    creator: creator as IUser,
    owner: owner as IUser,
    collection: collection as ICollection,
    NFT: NFT as INFT,
    isLoading: isLoadingNFT || isLoadingBuyOrder || isLoadingSellOrder,
    isPolymorph: NFT?._collectionAddress?.toUpperCase() === process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS?.toUpperCase(),
    refetchOffers,
    history,
    offers,
    moreFromCollection
  };

  return (
    <NFTPageContext.Provider value={value}>
      {children}
    </NFTPageContext.Provider>
  );
};

export default NFTPageProvider;
