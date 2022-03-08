import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { utils } from 'ethers';
import React from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import { getUserNFTsApi, IGetUserNFTsProps } from '../../../../../../api';
import { NftItem, NFTItemContentWithPrice } from '../../../../../nft/components';
import { OrderAssetClass } from '../../../../../nft/enums';
import { Loading } from '../../../../../../components';
import { ICollectionFilterValue, ISearchBarValue, SearchFilters } from '../../../my-nfts-page/components/search-filters';
import { useFormik } from 'formik';
import { GetCollectionApi, GetUserCollectionsFromScraperApi } from '../../../../../nft/api';
import { ISearchBarDropdownCollection, IUserOwnedCollection } from '../../../../../nft/types';
import { useErrorContext } from '../../../../../../../contexts/ErrorContext';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { ORDERS_PER_PAGE } from '../../../../../marketplace/pages/browse-nfts-page/constants';

// TODO: WalletTab.tsx - reuse

const PER_PAGE = 8;

interface IArtistNFTsTabProps {
  artistAddress: string;
  onTotalLoad: (total: number) => void;
}

export const ArtistNFTsTab = ({ artistAddress, onTotalLoad }: IArtistNFTsTabProps) => {
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext() as any;

  const searchBarForm = useFormik<ISearchBarValue>({
    initialValues: {
      searchValue: '',
    },
    onSubmit: () => {},
  });

  const collectionFilterForm = useFormik<ICollectionFilterValue>({
    initialValues: {
      contractAddress: '',
    },
    onSubmit: () => {},
  });

  /**
   * Query for fetching user NFTs
   * - supports search by name
   * - supports search by collection address
   */
  const { data: NFTsPages, fetchNextPage, hasNextPage, isFetching, isLoading, isIdle } = useInfiniteQuery([
    'user',
    artistAddress,
    searchBarForm.values,
    collectionFilterForm.values,
    'NFTs'
  ], async ({ pageParam = 1 }) => {
      const query: IGetUserNFTsProps = {
        address: utils.getAddress(artistAddress),
        page: pageParam,
        size: PER_PAGE,
        search: searchBarForm.values.searchValue,
        tokenAddress: collectionFilterForm.values.contractAddress,
      };

      const NFTs = await getUserNFTsApi(query);
      return { total: NFTs.total, result: NFTs };
    },
    {
      enabled: !!artistAddress,
      retry: false,
      getNextPageParam: (lastPage, pages) => {
        return pages.length * ORDERS_PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
      },
      onError: ({ error, message }) => {
        setErrorTitle(error);
        setErrorBody(message);
        setShowError(true);
      },
    },
  );

    /**
   * Query for fetching user Collections
   * This query should only be executed once
   */
  const { data: UserCollections } = useQuery([
    'user-collections',
    artistAddress,
    'Collections'
  ], async () => {
      const userCollections = await GetUserCollectionsFromScraperApi(artistAddress);

      // The scraper doesn't return off chain info like (images, etc.) so we need to call the Universe Backend App for more info.

      // Fetch collection (off chain) data from the Universe API
      const getOffChainCollectionDataPromises = userCollections.map(async (c: IUserOwnedCollection) => {
        const result = {
          address: c.contractAddress,
          name: c.name,
          id: '',
          image: undefined,
        } as ISearchBarDropdownCollection;

        const { id, coverUrl } = await GetCollectionApi(c.contractAddress);
        result.id = id;
        result.image = coverUrl;

        return result;
      })

      const fullCollectionData = await Promise.all(getOffChainCollectionDataPromises);

      return { result: fullCollectionData };
    },
    {
      enabled: !!artistAddress,
      keepPreviousData: true,
      retry: false,
      onError: ({ error, message }) => {
        setErrorTitle(error);
        setErrorBody(message);
        setShowError(true);
      },
    },
  );

  return (
    <Box>
      <SearchFilters
        onChange={(value) => searchBarForm.setValues(value)}
        searchText={searchBarForm.values}
        setSearchCollectionAddress={(value) => collectionFilterForm.setValues(value)}
        allCollections={UserCollections?.result || []}
      />
      <SimpleGrid columns={4} spacing={'30px'}>
        {(NFTsPages?.pages ?? []).map((page) => {
          return page.result.data.map((NFT) => (
            <NftItem
              key={NFT.id}
              NFT={NFT}
              showBuyNowButton={false}
              collection={`${NFT._collectionAddress}`}
              renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken }) => (
                <NFTItemContentWithPrice
                  name={NFT.name}
                  collection={collection}
                  creator={creator || undefined}
                  owner={owner || undefined}
                  order={{
                    assetClass: OrderAssetClass.ERC721,
                    collectionAddress: `${NFT._collectionAddress}`,
                    tokenId: `${NFT.tokenId}`,
                  }}
                  bestOfferPrice={bestOfferPrice || 0}
                  bestOfferPriceToken={bestOfferPriceToken || undefined}
                  lastOfferPrice={lastOfferPrice || 0}
                  lastOfferPriceToken={lastOfferPriceToken || undefined}
                />
              )}
            />
          ))
        })}
      </SimpleGrid>
      {isFetching && <Loading mt={'10'} />}
      {!isFetching && hasNextPage && (
        <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextPage()}>Load more</Button>
      )}
    </Box>
  );
};
