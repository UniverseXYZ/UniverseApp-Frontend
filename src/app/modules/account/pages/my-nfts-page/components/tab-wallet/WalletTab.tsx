import {
  Button,
  SimpleGrid,
  Box,
  InputLeftElement,
  Image,
  Input,
  InputGroup,
  Container, Stack,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import { useInfiniteQuery, useQuery } from 'react-query';

// Assets
import SearchIcon from '@assets/images/search-gray.svg';

// Components
import { NFTCard } from '@app/modules/nft/components';
import NftCardSkeleton from 'src/components/skeletons/nftCardSkeleton/NftCardSkeleton';
import NoNftsFound from 'src/components/myNFTs/NoNftsFound';

// Stores
import { useAuthStore } from 'src/stores/authStore';

// Constants
import { getArtistNFTsTotalApi, queryNFTsApi } from '@app/api';
import { nftKeys, userKeys } from '@app/utils/query-keys';
import { SortBy, SortByNames, SortByOptions } from '@app/constants';
import { FiltersStickyWrapper, Select } from '@app/components';
import { Filter, Filters, ToggleFiltersButton } from '@app/components/filters';
import {
  SaleTypeFilter,
  useSaleTypeFilter,
  NFTTypeFilter,
  useNFTTypeFilter,
  PriceRangeFilter,
  usePriceRangeFilter,
  CollectionsFilter,
  useCollectionsFilter,
  useCollectionsFilterUserCollections,
} from '@app/components/filters/shared';

import { NFTs_PER_PAGE } from './constants';
import * as s from './WalletTab.styles';

interface IWalletTabProps {
  getTotalNfts: (total: number) => void;
}

export const WalletTab: React.FC<IWalletTabProps> = (props) => {
  const { getTotalNfts } = props;

  const address = useAuthStore(state => state.address);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>();

  const saleTypeFilter = useSaleTypeFilter();
  const nftTypeFilter= useNFTTypeFilter();
  const priceRangeFilter = usePriceRangeFilter();
  const collectionsFilter = useCollectionsFilter();

  const userCollections = useCollectionsFilterUserCollections({
    userAddress: address,
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

  const {
    data: NFTs,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    nftKeys.artistNFTs(address, {
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
      artist: address,
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
    userKeys.totalNFTs(address),
    () => getArtistNFTsTotalApi(address),
    {
      onSuccess: (total) => getTotalNfts(total),
    }
  );

  return (
    <>
      <FiltersStickyWrapper {...s.FiltersWrapper}>
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
    </>
  );
};
