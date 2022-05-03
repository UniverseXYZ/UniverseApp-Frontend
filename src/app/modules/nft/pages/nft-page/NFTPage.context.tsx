import React, { FC, createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { ICollection, IERC721AssetType, INFT, IOrder, IUser } from '../../types';
import { GetCollectionApi, GetNFT2Api, GetHistoryApi, GetOrdersApi, GetUserApi, INFTHistory, GetMoreFromCollectionApi, GetActiveListingApi } from '../../api';
import { collectionKeys, nftKeys, orderKeys, userKeys } from '../../../../utils/query-keys';
import { useRouter } from 'next/router';

export interface INFTPageContext {
  NFT: INFT;
  isLoading: boolean;
  isPolymorph: boolean;
  order?: IOrder;
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

interface INFTPageProviderProps {
  NFT: INFT;
  children: React.ReactNode;
}

export const NFTPageProvider: FC<INFTPageProviderProps> = (props) => {
  const { NFT, children } = props;

  const router = useRouter();
  // const { collectionAddress, tokenId } = useParams<{ collectionAddress: string; tokenId: string; }>();
  const { collectionAddress, tokenId } = router.query as { collectionAddress: string; tokenId: string; };
  const queryClient = useQueryClient();

  // NFT Order Listing 
  const { data: order, isLoading: isLoadingOrder } = useQuery(
    orderKeys.listing({collectionAddress, tokenId}),
    async () => {
      const order = await GetActiveListingApi(collectionAddress, tokenId);
      return order || undefined
    },
    {
      enabled: !!tokenId && !!collectionAddress,
    });

  // More from collection NFTs query
  const { data: moreFromCollection, isLoading: isMoreFromCollectionLoading } = useQuery(
    ['moreFromCollection', collectionAddress, tokenId],
    async () => {
      const nfts = await GetMoreFromCollectionApi(collectionAddress, tokenId);

      nfts.forEach(nft => {
        // Set nft info in query cache in order to save requests
        queryClient.setQueryData(nftKeys.nftInfo({tokenId: nft.tokenId, collectionAddress: nft._collectionAddress || ""}), nft);
      });

      return nfts;
    },
    {
      enabled: !!collectionAddress && !!tokenId,
      staleTime: Infinity,
      onSuccess: (NFTs) => console.log('NFTs', NFTs) 
    },
  );

  // NFT Data History Query
  const { data: history, refetch: refetchHistory } = useQuery(
    orderKeys.history({collectionAddress, tokenId}),
    () => GetHistoryApi(collectionAddress, tokenId),
  );

  // NFT Offers Query
  const { data: offers, refetch: refetchNFTOffers } = useQuery(
    orderKeys.offers({tokenId, collectionAddress}),
    () => GetOrdersApi({
      side: 0,
      tokenIds: tokenId,
      collection: collectionAddress
    }),
  );
 
  // NFT Creator Data Query
  const { data: creator } = useQuery(
    userKeys.info(NFT?._creatorAddress || ""),
    () => GetUserApi(`${NFT?._creatorAddress}`),
    {
      enabled: !!NFT?._creatorAddress,
      retry: false,
    },
  );

  // NFT Owner Data Query
  const { data: owner } = useQuery(
    userKeys.info(NFT?._ownerAddress || ""),
    () => GetUserApi(`${NFT?._ownerAddress}`),
    {
      enabled: !!NFT?._ownerAddress, 
      retry: false,
    },
  );

  // NFT Collection Data Query
  const { data: collection } = useQuery(
    collectionKeys.centralizedInfo(NFT?._collectionAddress || ""),
    () => GetCollectionApi(`${NFT?._collectionAddress}`),
    { 
      enabled: !!NFT?._collectionAddress,
      retry: false,
    },
  );

  //TODO: This can be reworked to invalidate the queries and they will be automatically refetched
  const refetchOffers = useCallback(() => {
    refetchHistory();
    refetchNFTOffers();
  }, []);

  const value: INFTPageContext = {
    order,
    collectionAddress,
    creator: creator as IUser,
    owner: owner as IUser,
    collection: collection as ICollection,
    NFT: NFT as INFT,
    isLoading: isLoadingOrder,
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
