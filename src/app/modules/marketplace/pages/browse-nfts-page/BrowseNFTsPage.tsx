import { Box, Button, Center, Flex, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useIntersection, useMeasure, useSearchParam } from 'react-use';

// Assets
import OpenGraphImage from '@assets/images/open-graph/marketplace.png';

// Stores
import { useThemeStore } from 'src/stores/themeStore';

// App
import { SortBy, SortByNames, SortByOptions } from '@app/constants';
import { BackToTopButton, Icon, Loading, OpenGraph, Select } from '@app/components';
import { Filter, Filters } from '@app/components/filters';
import {
  SaleTypeFilter,
  useSaleTypeFilter,
  NFTTypeFilter,
  useNFTTypeFilter,
  PriceRangeFilter,
  usePriceRangeFilter,
} from '@app/components/filters/shared';
import { NFTCardSize, useNFTFluidGrid, useStaticHeader } from '@app/hooks';
import { orderKeys } from '@app/utils/query-keys';

import { NFTCard } from '../../../nft/components';
import { SearchBar } from '../../components';
import { ListingBanner, ToggleButton, ToggleButtonGroup } from './components';
import { OPEN_GRAPH_DESCRIPTION, OPEN_GRAPH_TITLE, ORDERS_PER_PAGE } from './constants';
import * as styles from './BrowseNFTsPage.styles';
import { getActiveListingsApi } from './helpers';

export const BrowseNFTsPage = () => {
  const setDarkMode = useThemeStore((s) => s.setDarkMode);

  const router = useRouter();

  const filtersRef = useRef(null);

  const intersection = useIntersection(filtersRef, {
    threshold: 1,
    root: null,
    rootMargin: "0px",
  });

  const [ref, { width: containerWidth }] = useMeasure<HTMLDivElement>();

  const NFTGrid = useNFTFluidGrid(containerWidth, 16);

  const collectionSearchParam = useSearchParam("collection");

  const [sortBy, setSortBy] = useState<SortBy>(SortBy.RecentlyListed);

  const [selectedAddress, setSelectedAddress] = useState(
    collectionSearchParam?.toString() || undefined
  );

  const saleTypeFilter = useSaleTypeFilter();
  const nftTypeFilter = useNFTTypeFilter();
  const priceRangeFilter = usePriceRangeFilter();

  const {
    data: ordersResult,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery(
    orderKeys.browse({
      selectedAddress,
      saleFilter: saleTypeFilter.form.values,
      nftTypeFilter: nftTypeFilter.form.values,
      priceRangeFilter: priceRangeFilter.form.values,
      sorting: sortBy,
    }),
    ({ pageParam = 1 }) => getActiveListingsApi({
      page: pageParam,
      limit: ORDERS_PER_PAGE,
      sortBy,
      collection: selectedAddress || undefined,
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
        return lastPage.data.length && lastPage.data.length >= ORDERS_PER_PAGE
          ? pages.length + 1
          : undefined;
      },
    }
  );

  useStaticHeader();

  const handleClear = useCallback(() => {
    saleTypeFilter.form.resetForm();
    nftTypeFilter.form.resetForm();
    priceRangeFilter.form.resetForm();
    setSelectedAddress(undefined);
  }, []);

  useEffect(() => {
    const queryParams = { ...router.query };

    if (selectedAddress) {
      queryParams.collection = selectedAddress;
    } else {
      delete queryParams.collection;
    }

    router.push(
      {
        pathname: router.pathname,
        query: queryParams,
      },
      undefined,
      { shallow: true }
    );
  }, [selectedAddress]);

  useEffect(() => setDarkMode(false), []);

  return (
    <Box layerStyle={"StoneBG"}>
      <OpenGraph
        title={OPEN_GRAPH_TITLE}
        description={OPEN_GRAPH_DESCRIPTION}
        image={OpenGraphImage}
      />

      <Flex {...styles.IntroSection}>
        <Text {...styles.WelcomeText}>Welcome to the</Text>
        <Heading as={"h1"} fontSize={"36px"} mb={'30px'}>
          Marketplace
          <Box as={'span'} {...styles.BetaBadge}>Beta</Box>
        </Heading>

        <Box {...styles.SearchBarWrapper}>
          <SearchBar
            value={selectedAddress}
            onChange={(address) => setSelectedAddress(address)}
            onClear={() => handleClear()}
          />
        </Box>
      </Flex>

      <Box
        ref={filtersRef}
        {...styles.FiltersStickyWrapper}
        bg={intersection?.intersectionRect.top === 0 ? "white" : "transparent"}
      >
        <Filters onClearAll={() => handleClear()}>
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
        </Filters>
        <HStack spacing={'14px'} w={['100%', null, 'fit-content']}>
          <Select
            label={"Sort by"}
            items={SortByOptions}
            value={sortBy}
            buttonProps={{
              justifyContent: "space-between",
              w: ["100%", null, "fit-content"],
            }}
            renderSelectedItem={(item: SortBy) => SortByNames[item]}
            renderItem={(item: SortBy) => SortByNames[item]}
            onSelect={(val) => setSortBy(val)}
          />
          <ToggleButtonGroup
            name={"nftSize"}
            value={NFTGrid.size}
            onChange={(val) => {
              NFTGrid.setSize(val as NFTCardSize)
            }}
          >
            <ToggleButton value={NFTCardSize.LG}>
              <Icon name={'mdGrid'} />
            </ToggleButton>
            <ToggleButton value={NFTCardSize.SM}>
              <Icon name={'smGrid'} />
            </ToggleButton>
          </ToggleButtonGroup>
        </HStack>
      </Box>

      <Box {...styles.ContentWrapper}>
        {!isFetching && !ordersResult?.pages[0].data.length ? (
          <Center py={'60px'}>No results found</Center>
        ) : (
          <SimpleGrid
            ref={ref}
            columns={NFTGrid.columns}
            spacing={`${NFTGrid.spacing}px`}
            mb={"40px"}
          >
            {(ordersResult?.pages ?? []).map((page) => {
              return page.data.map(({ order, NFT }) => (
                <NFTCard
                  key={`${NFT._collectionAddress}:${NFT.tokenId}`}
                  order={order}
                  NFT={NFT}
                  onTimerEnd={refetch}
                />
              ));
            })}
          </SimpleGrid>
        )}
        {isFetching && (
          <Center py={"20px"}>
            <Loading />
          </Center>
        )}
        {hasNextPage && !isFetching && (
          <Button
            isFullWidth
            variant={"outline"}
            mb={"20px"}
            onClick={() => fetchNextPage()}
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        )}

        <ListingBanner />
        <BackToTopButton />
      </Box>
    </Box>
  );
};
