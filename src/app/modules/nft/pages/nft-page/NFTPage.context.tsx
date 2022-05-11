import React, { FC, createContext, useContext, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { ICollection, INFT, IOrder, IUser } from '../../types';
import { collectionKeys, nftKeys, orderKeys, userKeys } from '../../../../utils/query-keys';
import { useRouter } from 'next/router';
import { GetActiveListingApi, getArtistApi, GetCollectionApi, GetHistoryApi, GetMoreFromCollectionApi, GetNFT2Api, GetOrdersApi, INFTHistory } from '@app/api';

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
  children: React.ReactNode;
}

export const NFTPageProvider: FC<INFTPageProviderProps> = ({ children }) => {
  const router = useRouter();
  // const { collectionAddress, tokenId } = useParams<{ collectionAddress: string; tokenId: string; }>();
  const { collectionAddress, tokenId } = router.query as { collectionAddress: string; tokenId: string; };
  const queryClient = useQueryClient();

  // NFT Data query
  const { data: NFT, isLoading: isLoadingNFT } = useQuery(
    nftKeys.nftInfo({collectionAddress, tokenId}),
    () => GetNFT2Api(collectionAddress, tokenId, false),
    {
      enabled: !!collectionAddress && !!tokenId,
    },
  );
  
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
    () => getArtistApi(`${NFT?._creatorAddress}`),
    {
      enabled: !!NFT?._creatorAddress,
      retry: false,
    },
  );

  // NFT Owner Data Query
  const { data: owner } = useQuery(
    userKeys.info(NFT?._ownerAddress || ""),
    () => getArtistApi(`${NFT?._ownerAddress}`),
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
    creator: creator?.mappedArtist as IUser,
    owner: owner?.mappedArtist as IUser,
    collection: collection as ICollection,
    NFT: NFT as INFT,
    isLoading: isLoadingNFT || isLoadingOrder,
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
