import React, { FC, createContext, useContext, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { IOrder, INFT, IOrderAssetTypeSingleListing, IOrderAssetTypeERC20 } from '../../types';
import { IUser } from '../../../account/types';
import { ICollection } from '../../../collection/types/collection';
import { collectionKeys, nftKeys, orderKeys, userKeys } from '../../../../utils/query-keys';
import { useRouter } from 'next/router';
import {
  GetActiveListingApi,
  getArtistApi,
  GetCollectionApi,
  GetHistoryApi,
  GetMoreFromCollectionApi,
  GetNFTApi,
  GetOrdersApi,
  INFTTransfer,
} from '@app/api';
import { polymorphOwner, queryPolymorphsGraph2 } from '@legacy/graphql/polymorphQueries';
import { utils } from 'ethers';
import { lobsterOwner, queryLobstersGraph } from '@legacy/graphql/lobsterQueries';

export interface IMetadata {
  nextMorphPrice?: string;
  owner?: string;
  genomeString?: string;
}

export interface INFTPageContext {
  NFT: INFT;
  isLoading: boolean;
  isPolymorph: boolean;
  isLobster: boolean;
  order?: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;
  creator: IUser;
  owner: IUser;
  collection: ICollection;
  collectionAddress: string;
  refetchOffers: () => void;
  history?: Array<IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20> | INFTTransfer>;
  offers?: {
    orders: Array<IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>>;
    total: number;
  };
  moreFromCollection: INFT[] | undefined;
  metadata: IMetadata | null;
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
    () => GetNFTApi(collectionAddress, tokenId, false),
    {
      enabled: !!collectionAddress && !!tokenId,
    },
  );

  const isPolymorph = NFT?._collectionAddress?.toLowerCase() === process?.env?.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS?.toLowerCase();
  const isLobster = NFT?._collectionAddress?.toLowerCase() === process?.env?.REACT_APP_LOBSTERS_CONTRACT_ADDRESS?.toLowerCase();

  // NFT Order Listing 
  const { data: order, isLoading: isLoadingOrder } = useQuery(
    orderKeys.listing({collectionAddress, tokenId}),
    () => GetActiveListingApi(collectionAddress, tokenId),
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
    () => GetOrdersApi<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>({
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

  const { data: polymorphMetadata } = useQuery(
    ["polymorph", NFT?.tokenId, "metadata"],
    async () => {
      const response = await queryPolymorphsGraph2(polymorphOwner(NFT?.tokenId));

      const metadata: IMetadata = {};

      if (response?.tokenMorphedEntities?.length) {
        const lastEntity = response.tokenMorphedEntities[response.tokenMorphedEntities.length - 1];

        metadata.nextMorphPrice = utils.formatEther(lastEntity?.priceForGenomeChange);
        metadata.genomeString = lastEntity?.newGene;
      }

      metadata.owner = response?.transferEntities[0]?.to;

      return metadata;
    },
    {
      enabled: !!NFT && isPolymorph,
    }
  );

  const { data: lobsterMetadata } = useQuery(
    ["lobster", NFT?.tokenId, "metadata"],
    async () => {
      const response = await queryLobstersGraph(lobsterOwner(NFT?.tokenId));

      const metadata: IMetadata = {};

      if (response?.transferEntities?.length) {
        const lastEntity = response.transferEntities[response.transferEntities.length - 1];
        metadata.genomeString = lastEntity?.gene;
      }

      metadata.owner = response?.transferEntities[0]?.to;

      return metadata;
    },
    {
      enabled: !!NFT && isLobster,
    }
  );

  //TODO: This can be reworked to invalidate the queries and they will be automatically refetched
  const refetchOffers = useCallback(() => {
    refetchHistory();
    refetchNFTOffers();
  }, []);

  const value: INFTPageContext = {
    order,
    collectionAddress,
    isPolymorph,
    isLobster,
    creator: creator?.mappedArtist as IUser,
    owner: owner?.mappedArtist as IUser,
    collection: collection as ICollection,
    NFT: NFT as INFT,
    isLoading: isLoadingNFT || isLoadingOrder,
    refetchOffers,
    history,
    offers,
    moreFromCollection,
    metadata: polymorphMetadata || lobsterMetadata || null,
  };

  return (
    <NFTPageContext.Provider value={value}>
      {children}
    </NFTPageContext.Provider>
  );
};
