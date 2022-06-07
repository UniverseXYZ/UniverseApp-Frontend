import { Box, Button, Center, Flex, Heading, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useIntersection, useMeasure, useSearchParam } from 'react-use';

// Assets
import OpenGraphImage from '@assets/images/open-graph/marketplace.png';
import ArrowDownIcon from '@assets/images/arrow-down.svg';

// Stores
import { useThemeStore } from 'src/stores/themeStore';

// App
import { SortBy, SortByNames, SortByOptions } from '@app/constants';
import { BackToTopButton, FiltersPopup, Icon, Loading, OpenGraph, Select } from '@app/components';
import {
  ClearAllButton,
  NFTTypeFilter,
  NFTTypeFilterDropdown,
  PriceRangeFilter,
  PriceRangeFilterDropdown,
  SaleTypeFilter,
  SaleTypeFilterDropdown,
  useNFTTypeFilter,
  usePriceRangeFilter,
  useSaleTypeFilter,
} from '@app/components/filters';
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

  const { form: saleTypeFilterForm } = useSaleTypeFilter();
  const { form: nftTypeFilterForm } = useNFTTypeFilter();
  const { form: priceRangeFilterForm } = usePriceRangeFilter();

  const {
    data: ordersResult,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery(
    orderKeys.browse({
      selectedAddress,
      saleFilter: saleTypeFilterForm.values,
      nftTypeFilter: nftTypeFilterForm.values,
      priceRangeFilter: priceRangeFilterForm.values,
      sorting: sortBy,
    }),
    ({ pageParam = 1 }) => getActiveListingsApi({
      page: pageParam,
      limit: ORDERS_PER_PAGE,
      sortBy,
      collection: selectedAddress || undefined,
      hasOffers: saleTypeFilterForm.values.hasOffers,
      buyNow: saleTypeFilterForm.values.buyNow,
      newest: saleTypeFilterForm.values.new,
      singleListing: nftTypeFilterForm.values.singleItem,
      bundleListing: nftTypeFilterForm.values.bundle,
      tokenTicker: priceRangeFilterForm.values.currency?.token ?? undefined,
      minPrice: priceRangeFilterForm.values.price[0],
      maxPrice: priceRangeFilterForm.values.price[1],
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
    saleTypeFilterForm.resetForm();
    nftTypeFilterForm.resetForm();
    priceRangeFilterForm.resetForm();
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

  const isFiltersDirty =
    saleTypeFilterForm.dirty ||
    nftTypeFilterForm.dirty ||
    priceRangeFilterForm.dirty;

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
        {/*TODO: use Filters component*/}
        <FiltersPopup
          mobileFilters={[
            {
              name: "Sale type",
              form: saleTypeFilterForm,
              icon: "filterSaleType",
              renderFilter: (props) => <SaleTypeFilter {...props} />,
            },
            {
              name: "NFT Type",
              form: nftTypeFilterForm,
              icon: "filterNftType",
              renderFilter: (props) => <NFTTypeFilter {...props} />,
            },
            {
              name: "Price range",
              form: priceRangeFilterForm,
              icon: "filterPriceRange",
              renderFilter: (props) => <PriceRangeFilter {...props} />,
            },
          ]}
        >
          {({ openMobileFilters }) => (
            <HStack spacing={'14px'} {...styles.FiltersWrapper}>
              <SaleTypeFilterDropdown
                value={saleTypeFilterForm.values}
                onSave={(value) => saleTypeFilterForm.setValues(value)}
                onClear={() => saleTypeFilterForm.resetForm()}
              />
              <NFTTypeFilterDropdown
                value={nftTypeFilterForm.values}
                onSave={(value) => nftTypeFilterForm.setValues(value)}
                onClear={() => nftTypeFilterForm.resetForm()}
              />
              <PriceRangeFilterDropdown
                value={priceRangeFilterForm.values}
                isDirty={priceRangeFilterForm.dirty}
                onSave={(value) => priceRangeFilterForm.setValues(value)}
                onClear={() => priceRangeFilterForm.resetForm()}
              />
              <Button
                variant={"dropdown"}
                rightIcon={<Image src={ArrowDownIcon} {...styles.MoreFiltersButtonArrow} />}
                {...styles.MoreFiltersButton}
                onClick={openMobileFilters}
              >
                More
              </Button>
              {isFiltersDirty && <ClearAllButton onClick={handleClear} />}
            </HStack>
          )}
        </FiltersPopup>
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
