import { Button, SimpleGrid, Box } from '@chakra-ui/react';
import { utils } from 'ethers';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useFormik } from 'formik';

// Contexts
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { useErrorContext } from '../../../../../../../contexts/ErrorContext';

// Components
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import NoNftsFound from '../../../../../../../components/myNFTs/NoNftsFound';
import { NftItem, NFTItemContentWithPrice } from '../../../../../nft/components';
import { SearchFilters, ISearchBarValue, ICollectionFilterValue } from '../search-filters';

// Helpers
import { OrderAssetClass } from '../../../../../nft/enums';

// API Calls & Interfaces
import { getUserNFTsApi, IGetUserNFTsProps } from '../../../../../../api';
import { GetCollectionApi, GetUserCollectionsFromScraperApi } from '../../../../../nft/api';
import { IUserOwnedCollection, ISearchBarDropdownCollection } from '../../../../../nft/types';

// Constants
import { ORDERS_PER_PAGE } from '../../../../../marketplace/pages/browse-nfts-page/constants';
const PER_PAGE = 12;

export const WalletTab = () => {
  const { address } = useAuthContext();
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
    address,
    searchBarForm.values,
    collectionFilterForm.values,
    'NFTs'
  ], async ({ pageParam = 1 }) => {
      const query: IGetUserNFTsProps = {
        address: utils.getAddress(address),
        page: pageParam,
        size: PER_PAGE,
        search: searchBarForm.values.searchValue,
        tokenAddress: collectionFilterForm.values.contractAddress,
      };

      const NFTs = await getUserNFTsApi(query);
      return { total: NFTs.total, result: NFTs };
    },
    {
      enabled: !!address,
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
    address,
    'Collections'
  ], async () => {
      const userCollections = await GetUserCollectionsFromScraperApi(address);

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
      enabled: !!address,
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
    <>
      <Box>
        <SearchFilters
          onChange={(value) => searchBarForm.setValues(value)}
          searchText={searchBarForm.values}
          setSearchCollectionAddress={(value) => collectionFilterForm.setValues(value)}
          allCollections={UserCollections?.result || []}
        />
      </Box>

      {(isIdle || isLoading || isFetching) ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </SimpleGrid>
      ) : NFTsPages?.pages?.length && NFTsPages?.pages[0]?.result?.data.length ? (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
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

          {!isFetching && hasNextPage && (
            <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextPage()}>Load more</Button>
          )}
        </>
      ) : (
        <NoNftsFound />
      )}
    </>
  );
};
