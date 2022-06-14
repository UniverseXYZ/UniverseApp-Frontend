import {
  Box,
  Button,
  Container,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce, useSearchParam } from 'react-use';

// Assets
import SearchIcon from '@assets/images/search-gray.svg';

// App
import { getArtistNFTsTotalApi, queryNFTsApi } from '@app/api';
import { SortBy, SortByNames, SortByOptions } from '@app/constants';
import { NFTCard } from '@app/modules/nft/components';
import {
  CollectionsFilter,
  NFTTypeFilter, PriceRangeFilter,
  SaleTypeFilter,
  useCollectionsFilter, useCollectionsFilterUserCollections,
  useNFTTypeFilter,
  usePriceRangeFilter,
  useSaleTypeFilter,
} from '@app/components/filters/shared';
import { FiltersStickyWrapper, Select } from '@app/components';
import { Filter, Filters, ToggleFiltersButton } from '@app/components/filters';
import { useInfiniteQuery, useQuery } from 'react-query';
import { nftKeys, userKeys } from '@app/utils/query-keys';
import { NFTs_PER_PAGE } from '@app/modules/account/pages/my-nfts-page/components/tab-wallet/constants';

import NoNftsFound from '../../../../../../../components/myNFTs/NoNftsFound';
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import * as styles from './ArtistNFTsTab.styles';

interface IArtistNFTsTabProps {
  artistAddress: string;
  onTotalLoad: (total: number) => void;
}

export const ArtistNFTsTab: React.FC<IArtistNFTsTabProps> = (props) => {
  const { artistAddress, onTotalLoad } = props;

  const router = useRouter();

  const initialCollection = useSearchParam("collection");

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>();

  const saleTypeFilter = useSaleTypeFilter();
  const nftTypeFilter= useNFTTypeFilter();
  const priceRangeFilter = usePriceRangeFilter();
  const collectionsFilter = useCollectionsFilter();

  const userCollections = useCollectionsFilterUserCollections({
    userAddress: artistAddress,
    onSuccess: (response) => {
      if (response && initialCollection) {
        collectionsFilter.form.setValues({
          collections: response.filter((collection) => collection.address === initialCollection),
        });
      }
    }
  });

  const dirtyFiltersAmount = useMemo(() => {
    return [
      saleTypeFilter,
      nftTypeFilter,
      priceRangeFilter,
      collectionsFilter,
    ].filter(filter => filter.form.dirty).length;
  }, [saleTypeFilter, nftTypeFilter, priceRangeFilter, collectionsFilter]);

  useDebounce(() => {
    setDebouncedSearch(search);
  }, 1000, [search]);

  useEffect(() => {
    const queryParams = {...router.query};

    // if collections loaded
    if (userCollections?.length) {
      if (collectionsFilter.form.values.collections?.length) {
        queryParams.collection = collectionsFilter.form.values.collections[0].address;
      } else {
        delete queryParams.collection;
      }

      router.push({
        pathname: router.pathname,
        query: queryParams,
      }, undefined, { shallow: true });
    }
  }, [collectionsFilter.form.values, userCollections]);

  const {
    data: NFTs,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    nftKeys.artistNFTs(artistAddress, {
      search: debouncedSearch,
      sorting: sortBy,
      saleFilter: saleTypeFilter.form.values,
      nftTypeFilter: nftTypeFilter.form.values,
      priceRangeFilter: priceRangeFilter.form.values,
      collectionsFilter: collectionsFilter.form.values,
    }),
    ({ pageParam = 1 }) => queryNFTsApi({
      page: pageParam,
      limit: NFTs_PER_PAGE,
      search: debouncedSearch,
      sortBy,
      artist: artistAddress,
      hasOffers: saleTypeFilter.form.values.hasOffers,
      buyNow: saleTypeFilter.form.values.buyNow,
      newest: saleTypeFilter.form.values.new,
      singleListing: nftTypeFilter.form.values.singleItem,
      bundleListing: nftTypeFilter.form.values.bundle,
      tokenTicker: priceRangeFilter.form.values.currency?.token ?? undefined,
      minPrice: priceRangeFilter.form.values.price[0],
      maxPrice: priceRangeFilter.form.values.price[1],
    }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.length && lastPage.data.length >= NFTs_PER_PAGE
          ? pages.length + 1
          : undefined;
      },
    }
  );

  const { data: NFTsTotal } = useQuery(
    userKeys.totalNFTs(artistAddress),
    () => getArtistNFTsTotalApi(artistAddress),
    {
      onSuccess: (total) => onTotalLoad(total),
    }
  );

  return (
    <Box>
      <FiltersStickyWrapper {...styles.FiltersWrapperStyle} p={['0px 20px', null, 0]}>
        <Container maxW={'1110px'} py={'20px !important'}>
          <Stack spacing={'12px'} direction={['column', null, 'row']}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <Image src={SearchIcon} />
              </InputLeftElement>
              <Input
                height={'48px'}
                pl={'50px'}
                placeholder={'Search for an NFT'}
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
            </InputGroup>
            <Box>
              <Select
                items={SortByOptions}
                label={!sortBy ? 'Sort by' : undefined}
                value={sortBy}
                buttonProps={{
                  height: '48px',
                  justifyContent: "space-between",
                  w: ['100%', null, '200px'],
                }}
                renderSelectedItem={(item: SortBy) => SortByNames[item]}
                renderItem={(item: SortBy) => SortByNames[item]}
                onSelect={(val) => setSortBy(val)}
              />
            </Box>
            <ToggleFiltersButton
              display={['none', null, 'flex']}
              dirtyAmount={dirtyFiltersAmount}
              onClick={() => setShowFilters(!showFilters)}
            />
          </Stack>
          <Filters show={showFilters} mt={'16px'}>
            <Filter filter={saleTypeFilter}>
              <SaleTypeFilter
                value={saleTypeFilter.form.values}
                onChange={(value) => saleTypeFilter.form.setValues(value)}
              />
            </Filter>
            <Filter filter={nftTypeFilter}>
              <NFTTypeFilter
                value={nftTypeFilter.form.values}
                onChange={(value) => nftTypeFilter.form.setValues(value)}
              />
            </Filter>
            <Filter filter={priceRangeFilter}>
              <PriceRangeFilter
                value={priceRangeFilter.form.values}
                onChange={(value) => priceRangeFilter.form.setValues(value)}
              />
            </Filter>
            <Filter filter={collectionsFilter}>
              <CollectionsFilter
                items={userCollections}
                value={collectionsFilter.form.values}
                onChange={(value) => collectionsFilter.form.setValues(value)}
              />
            </Filter>
          </Filters>
        </Container>
      </FiltersStickyWrapper>

      <Box padding={['0px 20px', null, 0]}>
        {(!isFetching && NFTs?.pages.length === 1 && !NFTs?.pages[0].data.length) ? (
          <NoNftsFound />
        ) : (
          <Box className="mynfts__page">
            <Box className="container mynfts__page__body">
              {/*First load*/}
              {(isFetching && !isFetchingNextPage && !NFTs?.pages.length) && (
                <SimpleGrid columns={[1, null, 2, 4]} spacing={'30px'}>
                  <NftCardSkeleton />
                  <NftCardSkeleton />
                  <NftCardSkeleton />
                  <NftCardSkeleton />
                </SimpleGrid>
              )}

              <SimpleGrid columns={[1, null, 2, 4]} spacing={'30px'}>
                {(NFTs?.pages ?? []).map((page) => {
                  return page.data.map(({ order, NFT }) => (
                    <NFTCard
                      key={`${NFT._collectionAddress}:${NFT.tokenId}`}
                      NFT={NFT}
                      order={order}
                    />
                  ));
                })}
              </SimpleGrid>

              {(hasNextPage && !isFetching) && (
                <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextPage()}>
                  Load more
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
