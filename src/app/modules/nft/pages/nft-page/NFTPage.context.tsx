import React, { FC, createContext, useContext, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { IOrder, INFT, IOrderAssetTypeSingleListing, IOrderAssetTypeERC20 } from '../../types';
import { IUser } from '../../../account/types';
import { ICollection } from '../../../collection/types/collection';
import { collectionKeys, nftKeys, orderKeys, userKeys } from '../../../../utils/query-keys';
import { useRouter } from 'next/router';
import {
  getArtistApi,
  GetCollectionApi,
  GetHistoryApi,
  GetMoreFromCollectionApi,
  GetOrdersApi,
  INFTTransfer, queryNFTsApi,
} from '@app/api';
import { polymorphOwner, queryPolymorphsGraph2 } from '@legacy/graphql/polymorphQueries';
import { Contract, providers, utils } from 'ethers';
import { lobsterOwner, queryLobstersGraph } from '@legacy/graphql/lobsterQueries';
import { useAuthStore } from '../../../../../stores/authStore';

export interface IMetadata {
  nextMorphPrice?: string;
  owner?: string;
  genomeString?: string;
}

export interface INFTPageContext {
  NFT: INFT;
  isAuthUserOwner: boolean;
  isLoading: boolean;
  isPolymorph: boolean;
  isLobster: boolean;
  order?: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;
  creator: IUser;
  owners: Array<{
    owner: IUser | null;
    order?: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;
    address: string;
    transactionHash?: string;
    value: number;
  }>;
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
  totalEditions: number;
  ownedEditions: number;
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
  const queryClient = useQueryClient();

  const { collectionAddress, tokenId } = router.query as {
    collectionAddress: string;
    tokenId: string;
  };

  const authUserAddress = useAuthStore(s => s.address);

  // NFT Data query
  const { data, isLoading: isLoadingNFT } = useQuery(
    nftKeys.nftInfo({collectionAddress, tokenId}),
    async () => {
      const { data } = await queryNFTsApi({
        page: 1,
        limit: 1,
        collection: collectionAddress,
        tokenIds: [tokenId],
      });

      if (!data.length) {
        throw new Error('404');
      }

      return data[0];
    },
    {
      enabled: !!collectionAddress && !!tokenId,
    },
  );

  const isPolymorph = data?.NFT._collectionAddress?.toLowerCase() === process?.env?.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS?.toLowerCase();
  const isLobster = data?.NFT._collectionAddress?.toLowerCase() === process?.env?.REACT_APP_LOBSTERS_CONTRACT_ADDRESS?.toLowerCase();

  // More from collection NFTs query
  const { data: moreFromCollection } = useQuery(
    ["moreFromCollection", collectionAddress, tokenId],
    async () => {
      const NFTs = await GetMoreFromCollectionApi(collectionAddress, tokenId);

      NFTs.forEach((NFT) => {
        // Set nft info in query cache in order to save requests
        queryClient.setQueryData(
          nftKeys.nftInfo({
            tokenId: NFT.tokenId,
            collectionAddress: NFT._collectionAddress || ""
          }),
          NFT
        );
      });

      return NFTs;
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
    userKeys.info(data?.NFT.creatorAddress || ""),
    () => getArtistApi(`${data?.NFT.creatorAddress}`),
    {
      enabled: !!data?.NFT.creatorAddress,
      retry: false,
    },
  );

  // NFT Owner Data Query
  const { data: owners } = useQuery(
    ['NFT', collectionAddress, tokenId, 'owners'],
    async () => {
      const owners = data?.owners ?? [];

      const requests = owners.map((owner) => getArtistApi(`${owner.address}`));
      const results = await Promise.allSettled(requests);

      return owners.map((owner, i) => ({
        ...owner,
        order: undefined, // FOR FUTURE
        owner: results[i].status === 'fulfilled'
          ? (results[i] as PromiseFulfilledResult<{ mappedArtist: IUser }>).value.mappedArtist
          : null,
      }));
    },
    {
      enabled: !!data?.owners,
      retry: false,
    },
  );


  // NFT Collection Data Query
  const { data: collection } = useQuery(
    collectionKeys.centralizedInfo(data?.NFT._collectionAddress || ""),
    () => GetCollectionApi(`${data?.NFT._collectionAddress}`),
    { 
      enabled: !!data?.NFT._collectionAddress,
      retry: false,
    },
  );

  const { data: polymorphMetadata } = useQuery(
    ["polymorph", tokenId, "metadata"],
    async () => {
      const response = await queryPolymorphsGraph2(polymorphOwner(tokenId));

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
      enabled: isPolymorph,
    }
  );

  const { data: lobsterMetadata } = useQuery(
    ["lobster", tokenId, "metadata"],
    async () => {
      const response = await queryLobstersGraph(lobsterOwner(tokenId));

      const metadata: IMetadata = {};

      if (response?.transferEntities?.length) {
        const lastEntity = response.transferEntities[response.transferEntities.length - 1];
        metadata.genomeString = lastEntity?.gene;
      }

      metadata.owner = response?.transferEntities[0]?.to;

      return metadata;
    },
    {
      enabled: isLobster,
    }
  );

  const isAuthUserOwner = useMemo(() => {
    if (!owners || !owners.length || !authUserAddress) {
      return false;
    }

    return owners.some(({ address }) => address.toLowerCase() === authUserAddress.toLowerCase());
  }, [owners, authUserAddress]);

  const totalEditions = useMemo(() => {
    if (!owners?.length) {
      return 0;
    }

    return owners.reduce((acc, { value }) => acc + value, 0);
  }, [owners]);

  const ownedEditions = useMemo(() => {
    if (!isAuthUserOwner || !owners) {
      return 0;
    }

    return owners.find(({ address }) => address.toLowerCase() === authUserAddress.toLowerCase())?.value ?? 0;
  }, [owners, isAuthUserOwner, authUserAddress]);

  //TODO: This can be reworked to invalidate the queries and they will be automatically refetched
  const refetchOffers = useCallback(() => {
    refetchHistory();
    refetchNFTOffers();
  }, []);

  const value: INFTPageContext = {
    order: data?.order,
    isAuthUserOwner,
    collectionAddress,
    isPolymorph,
    isLobster,
    creator: creator?.mappedArtist as IUser,
    owners: owners || [],
    collection: collection as ICollection,
    NFT: data?.NFT as INFT,
    isLoading: isLoadingNFT,
    refetchOffers,
    history,
    offers,
    moreFromCollection,
    metadata: polymorphMetadata || lobsterMetadata || null,
    totalEditions,
    ownedEditions,
  };

  return (
    <NFTPageContext.Provider value={value}>
      {children}
    </NFTPageContext.Provider>
  );
};
